import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/profileService"; // Ensure this has getProfile, updateProfile, and createProfile

// Fetch Profile
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (userId, { rejectWithValue }) => {
    try {
        const profile = await appwriteService.getProfile(userId);
        if (!profile) {
            const newProfile = await appwriteService.createProfile(userId, {}); // Empty profile on first-time fetch
            return newProfile;
        }
        return profile;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update Profile
export const updateProfile = createAsyncThunk("profile/updateProfile", async ({ userId, data }, { rejectWithValue }) => {
    try {
        const updatedProfile = await appwriteService.updateProfile(userId, data);
        return updatedProfile;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: null,
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profileData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profileData = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profileData = action.payload;
            });
    },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
