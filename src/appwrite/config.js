//iska naam config pta nhi kyu rkha sir ne lekin kaam hua hai create post, delete, update, list, preview, upload,etc.
//aur over smart banne ke chakkar me appwrite folder me jitni bhi files banai 
//unme class banai. aur ek constructor banaya jo ki sare naye instances ko initialise karega according to constructor.
//sare async function honge(naye database me appwrite ke default function jaise(createDocument) use karenge) vo bhi try catch wale kyuki kuch na kuch kaam ho raha hai aur usme error aane ka bhi chance hai aur der se hone ka bhi
//almost sbke try me retur await krna hi padega aur according to appwrite docs hme parameters and function me values deni padegi. like sbme databseid aur collection id manga hai to conf se nikal ke de denge.
import conf from '../conf/conf'
import {Client, ID, Databases, Query, Storage} from "appwrite"

export class StorageService{
    client = new Client(); //krna hi tha client to banana hi padega ek bar.
    databases;
    bucket;

    constructor(){
        this.client //ek bar bane hue client ko har object me use karega.
        .setEndpoint(conf.appwriteUrl)//usko secret variable ka use krke access dega.
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);//nayadatabase aur storage bucket banayega.(for this.client)
        this.bucket = new Storage(this.client); // these both can be done seperately. but for now let them be together.
    }

    async createPost({title, content, status, slug, featuredimage, userid} ){
        try {
            return await this.databases.createDocument(//incase kabhi baas change krna pada to mongodb me store krna hoga to mongodb me store kr denge. uper ka wrapper same rahega user utni hi values pass karega.
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//slug as id of document.
                {// the data which is to be post.
                    title,
                    content, 
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("appwrite :: StorageService ::createPost :: error", error);
            return false;
        }
    }
    //slug is passed first bcz its the documentid and helps in recognising the document to update. (slug - how-to-make-roti32144)
    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument( //function by appwrite
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//slug as id of document.
                {//the data which is to be updated.
                    title,
                    content, 
                    featuredimage,
                    status,
                }

            )
        } catch (error) {
            console.log("appwrite :: StorageService ::updatePost :: error", error);
            return false;
        }
    }

    async deletePost(slug){//document id only
       try {
            await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
        )
        return true
       } catch (error) {
        console.log("appwrite :: StorageService ::deletePost :: error", error);
        return false //tells that can't be deleted.
       }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug //document id
            )
        } catch (error) {
            console.log("appwrite :: StorageService ::getPost :: error", error);
            return false
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){//you can pass multiple queries in the array.
        try {
           return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries //it's an array holding all the queries.
           )
        } catch (error) {
            console.log("appwrite :: StorageService ::getPosts :: error", error);
            return false;
        }
    }

    //file upload services. later this will be done in seperate file.
    //log aksar yha pe ye galti krte hai ki file upload krte samay file ka keval naam de dete hai jabki hame puri file deni padegi.

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),  //have to give unique id while uploading file.
                file
            )
        } catch (error) {
            console.log("appwrite :: StorageService ::uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite :: StorageService ::deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){  //this gives very fast responce so no async await.
      try {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
      } catch (error) {
        console.log("appwrite :: StorageService ::getFilePreview :: error", error);
        return false;
      }
    }
}

const storageService = new StorageService() //created object of that class
export default storageService; //and only exported the object.