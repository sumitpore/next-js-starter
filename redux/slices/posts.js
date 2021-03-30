import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseApiUrl = "https://jsonplaceholder.typicode.com/posts";

const getPosts = createAsyncThunk("getPosts", async (page = 1, { getState }) => {
    const pageNo = page || getState("posts").page;
    const response = await fetch(`${baseApiUrl}/?_page=${pageNo}`);

    const data = await response.json();

    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
});

export const postsSlice = createSlice({
    name: "posts",

    initialState: {
        foundPosts: [],
        foundPostsError: false,
        nextPage: 1,
    },

    reducers: {},

    extraReducers: {
        [getPosts.fulfilled]: (state, action) => ({
            foundPosts: [...state.foundPosts, ...action.payload],
            nextPage: state.page + 1,
            foundPostsError: false,
        }),

        [getPosts.rejected]: (state, action) => ({
            ...state,
            foundPostsError: action.payload.message,
        }),
    },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = { ...postsSlice.actions, getPosts };
