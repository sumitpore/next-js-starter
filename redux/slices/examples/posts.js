import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { POST_API } from "../../../constants/apis";

const getPosts = createAsyncThunk("getPosts", async (_, { getState, rejectWithValue }) => {
    const pageNo = getState().postsReducer.nextPage;

    const response = await fetch(`${POST_API}/?_page=${pageNo}`);

    const data = await response.json();

    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText || response.status;

        return rejectWithValue(error);
    }
    return data;
});

const defaultState = {
    foundPosts: [],
    foundPostsError: false,
    nextPage: 1,
    postDetails: {},
};

const postsSlice = createSlice({
    name: "posts", // used by reducer to define types. types are prepended with this text.

    initialState: defaultState,

    reducers: {
        getPost: (state, action) => {
            const { postId, pageNo } = action.payload;
            const { foundPosts } = state;
            state.postDetails = foundPosts[pageNo].find((post) => post.id === postId);
        },
    },

    extraReducers: {
        [getPosts.rejected]: (state, action) => {
            state.foundPostsError = action.payload;
        },

        [getPosts.fulfilled]: (state, action) => ({
            foundPosts: [...state.foundPosts, action.payload],
            nextPage: state.nextPage + 1,
            foundPostsError: false,
        }),
    },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = { ...postsSlice.actions, getPosts };
export const initialState = defaultState;
