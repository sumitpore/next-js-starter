import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "./slices/examples/posts";

export default configureStore({
    reducer: { postsReducer },
});
