import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import config from "../../../app.config";

const postApi = `${config.apiBase}/posts`;

const getPosts = createAsyncThunk("getPosts", async (_, { getState, rejectWithValue }) => {
    const { nextPage: pageNo } = getState().postsReducer;

    const response = await fetch(`${postApi}/?_page=${pageNo}`);

    const data = await response.json();

    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText || response.status;

        return rejectWithValue(error);
    }
    return data;
});

export const postsSlice = createSlice({
    name: "posts", // used by reducer to define types. types are prepended with this text.

    initialState: {
        foundPosts: [],
        foundPostsError: false,
        nextPage: 1,
        postDetails: {},
    },

    reducers: {
        getPost: (state, action) => {
            const { postId, pageNo } = action.payload;
            const { foundPosts } = state;
            state.postDetails = foundPosts[pageNo].find((post) => post.id === postId);
        },
    },

    extraReducers: {
        [getPosts.fulfilled]: (state, action) => ({
            foundPosts: [...state.foundPosts, action.payload],
            nextPage: state.nextPage + 1,
            foundPostsError: false,
        }),

        [getPosts.rejected]: (state, action) => ({
            ...state,
            foundPostsError: action.payload,
        }),
    },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = { ...postsSlice.actions, getPosts };
