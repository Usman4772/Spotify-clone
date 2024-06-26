import { configureStore } from "@reduxjs/toolkit";
import allSongsSliceReducer from "../Slices/allSongsSlice";
export const store =configureStore({
    reducer:{
        allSongs:allSongsSliceReducer
    }
})