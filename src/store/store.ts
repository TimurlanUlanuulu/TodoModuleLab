import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "../store/columnSlice"
const store = configureStore({
    reducer: {
        columnStore: columnReducer,
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

