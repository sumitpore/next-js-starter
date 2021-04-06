import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchPosts from "../../../lib/fetchPosts";

const getPosts = createAsyncThunk("getPosts", async (_, { getState, rejectWithValue }) => {
    const pageNo = getState().postsReducer.nextPage;

    // eslint-disable-next-line no-return-await
    return await fetchPosts({ pageNo, failureReturnCallback: (error) => rejectWithValue(error) });
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
