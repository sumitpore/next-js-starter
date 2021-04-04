import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";

import { postsReducer } from "./slices/examples/posts";

const preloadedState = {};
let store;

const configureStoreOptions = {
    reducer: { postsReducer },
    preloadedState,
};

const initializeStore = (state) => {
    let _store =
        store ??
        configureStore({
            ...configureStoreOptions,
            preloadedState: { ...configureStoreOptions.preloadedState, ...state },
        });

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (state && store) {
        _store = configureStore({
            ...configureStoreOptions,
            preloadedState: { ...store.getState(), ...state },
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export default function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState]);
}
