import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     item : [],
}

const itemSlice = createSlice({
    name:"item",
    initialState,
    reducers : {
        addItem : (state,action)=>{
            state.item = action.payload
        }
    }
})

export const{addItem} = itemSlice.actions

export default itemSlice.reducer