import conf from '../conf/conf';
import { Client, ID, Databases, Query } from "appwrite";

export class CommentService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createComment({ postId, userId, content, userName }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                { postId, userId, content, userName }
            );
            return response;
        } catch (error) {
            console.error("🔥 Error creating comment:", error.message);
            throw new Error("Failed to create comment. Please try again.");
        }
    }

    async getComments(postId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                [
                    Query.equal("postId", postId),
                    Query.orderDesc("$createdAt") // ✅ Sorting latest first
                ]
            );
            return response.documents;
        } catch (error) {
            console.error("🔥 Error fetching comments:", error.message);
            throw new Error("Failed to fetch comments.");
        }
    }

    async deleteComment(commentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId
            );
            return true;
        } catch (error) {
            console.error("🔥 Error deleting comment:", error.message);
            throw new Error("Failed to delete comment.");
        }
    }
}

const commentService = new CommentService();
export default commentService;
