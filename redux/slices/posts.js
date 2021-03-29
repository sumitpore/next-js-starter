import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseApiUrl = "https://jsonplaceholder.typicode.com/posts";

const getPosts = createAsyncThunk("getPosts", async (page = 1, { getState }) => {
    page = page || getState("posts")["page"];
    let response = await fetch(`${baseApiUrl}/?_page=${page}`);

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
        page: 1,
    },

    reducers: {},

    extraReducers: {
        [getPosts.fulfilled]: (state, action) => {
            return {
                foundPosts: [...state.foundPosts, ...action.payload],
                page: state.page + 1,
                foundPostsError: false,
            };
        },

        [getPosts.rejected]: (state, action) => {
            return {
                ...state,
                foundPostsError: action.payload.message,
            };
        },
    },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = { ...postsSlice.actions, getPosts };
