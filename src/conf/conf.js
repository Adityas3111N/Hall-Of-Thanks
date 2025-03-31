const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwriteProfileCollectionId: String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
}

export default conf;

// This code is like a wrapper to safely access .env variables in a structured
//  and reusable way. bcz we always need these variables in string form.


// While working on the project, if you think, "Where are my Appwrite settings?"
// You’ll instinctively know to check conf.js because the name makes it obvious.

// "conf" is a shorthand for configuration, which perfectly describes what this file does:
// It configures your app by pulling environment variables and organizing them in one place.