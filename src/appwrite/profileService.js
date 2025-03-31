import { Client, ID, Databases, Query } from "appwrite";
import conf from "../conf/conf";

export class ProfileService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async getProfile(userId) {
        try {
            if (!userId) throw new Error("Invalid user ID provided.");
    
            // Query the collection to find the profile where userId matches
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [
                    Query.equal("userId", userId) // Search for userId in the collection
                ]
            );
    
            if (response.documents.length > 0) {
                return response.documents[0]; // Return the first matched profile
            } else {
                console.warn("⚠️ Profile not found for user:", userId);
                return null;
            }
        } catch (error) {
            console.error("🔥 Error fetching profile:", error.message);
            return null;
        }
    }
    

    async createProfile({ userId, fullName, gender, bio, dream, status, linkedin, instagram, snapchat, github }) {
        try {
            console.log("Creating profile...");

            const profile = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                ID.unique(),
                {
                    userId,
                    fullName: fullName || "",
                    gender: gender || "",
                    bio: bio || "Do what you love or love what you do.",
                    dream: dream || "A happy life with happy family.",
                    status: status || "Living in reality.",
                    linkedin: linkedin || "",
                    instagram: instagram || "",
                    snapchat: snapchat || "",
                    github: github || "",
                }
            );
            console.log("Creating profile...");

            return profile;
        } catch (error) {
            console.error("🔥 Error creating profile:", error.message);
            throw new Error("Failed to create profile.");
        }
    }

    async updateProfile(userId, data) {
        try {
            // Ensure data is not undefined
            if (!data || typeof data !== "object") {
                throw new Error("Invalid data provided for update.");
            }
    
            // 1️⃣ Find the document with the given userId
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                [Query.equal("userId", userId)]
            );
            console.log("🔍 Existing Profile Response:", response);
    
            if (response.documents.length === 0) {
                throw new Error("Profile not found.");
            }
    
            const documentId = response.documents[0].$id; // ✅ Get actual document ID
            console.log(response.documents[0]);
            // 2️⃣ Remove system fields safely
            const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...cleanData } = data || {};
            console.log("🔍 Clean Data Before Update:", cleanData);

            // 3️⃣ Update profile only if there's valid data
            if (Object.keys(cleanData).length === 0) {
                throw new Error("No valid fields to update.");
            }
    
            const updatedProfile = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                documentId,
                cleanData
            );
    
            return updatedProfile;
        } catch (error) {
            console.error("🔥 Error updating profile:", error.message);
            throw new Error("Failed to update profile.");
        }
    }
    
}

const profileService = new ProfileService();
export default profileService;
