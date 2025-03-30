import conf from '../conf/conf'
// conf gives us access to Appwrite configuration variables (appwriteUrl,
// appwriteProjectId) that we set in .env. This keeps things dynamic and 
// environment-safe (no hardcoding URLs or IDs directly).
import {Client, Account, ID} from "appwrite"

export class AuthService{  //export keyword make this class available for other files.
    Client = new Client()
    account;

    constructor(){//A constructor is a special method inside a class that automatically runs when you create a new instance(new AuthService()) of that class. It's like a welcome party 🎉 that sets up everything for your object. everthing we want to give to newly created object so we written all that in constructor.
        this.Client   //"this" refers to the new object being created. for assigning property etc to it.
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.Client)  //ye hogya kaam. jaise hi new object banega ye initialise ho gya uska account.

    }

    async createAccount({email, password, name}){ //signup
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //call another function (login). we want user get logged in as soon as after creating account.
                return this.login({email, password});
                //Defines default properties that belong to every instance unless overridden.
            }
            else{
                return userAccount;//returns session object. all details of user. can  be stored in local and used.
            }
        } catch (error) {
            console.log(" Appwrite AuthService :: createAccount :: error", error);
            return { success: false, message: error.message };          
        }
    }

    async login({email, password}){ //login
        try {
            return await this.account.createEmailPasswordSession(email, password);
            //Defines default properties that belong to every instance unless overridden.
        } catch (error) {
            console.log(" Appwrite AuthService :: login :: error", error);
        }
    }

    async getCurrentUser(){//to check user is login or not

        try {
            return await this.account.get();
        } catch (error) {
            //another way of giving error.
            console.log(" Appwrite AuthService :: getCurrentUser :: error", error);
        } 
        return null; //for extra safty

    }

    async logout(){
        try {
            await this.account.deleteSessions();
            //if you want to just delete current session. just use deleteSession('current') instead.
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}
const authService = new AuthService(); // this new keyword makes a new instance of that class and assigns that instance( an object ) to the variable.
export default authService;


// Ease of Use: This way, you can directly call authService.login(...) or authService.logout() in other files. No need to new it again and again.
// ab jo bhi code hmne likha vo object ke direct dot se access hai hame so it would be very easy to use them.