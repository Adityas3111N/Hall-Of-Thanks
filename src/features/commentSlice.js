import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from '../appwrite/commentsService.js';

// Async Actions
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await commentService.getComments(postId);

            if (!response) {
                console.error("Error: API did not return documents");
                return rejectWithValue("No documents found");
            }

            //there was a bug that got me for hours. i was checking respomse.documents
            //but it was an array and not an object. so i was getting undefined.
            return response 
        } catch (error) {
            console.error("Error fetching comments:", error);
            return rejectWithValue(error.message);
        }
    }
);


export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ postId, userId, content, userName }) => {
        const response = await commentService.createComment({postId, userId, content, userName});
        if (!response) {
            throw new Error("Failed to create comment.");
        }
        return response;
    }
);

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (commentId) => {
        await commentService.deleteComment(commentId);
        return commentId;
    }
);

const initialState = {
    comments: [],
    loading: false,
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload?[...action.payload]:[];
                //i will later check that if pushing works or not initially there
                //were some bugs which got resolved when i provided the values by spread operator.
            })
            .addCase(addComment.fulfilled, (state, action) => {
                if (action.payload) {
                    state.comments = [...state.comments, action.payload];
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.$id !== action.payload);
            });
    },
});

export default commentSlice.reducer;
