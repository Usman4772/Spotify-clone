import { createSlice } from "@reduxjs/toolkit";
let initialState={
    songs:[]
}
const allSongsSlice=createSlice({
    name:"allSongs",
    initialState,
    reducers:{
        setAllSongs:(state,action)=>{
            console.log(state.songs)
state.songs=action.payload
        }
    }
})


export const {setAllSongs}=allSongsSlice.actions
export default allSongsSlice.reducer