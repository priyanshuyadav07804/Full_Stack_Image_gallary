import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageUrl : [],
    isOpen : false,
    deleteIsOpen : false
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openModal : (state,action)=>{
            state.isOpen = true
            state.imageUrl = action.payload
        },
        closeModal : (state)=>{
            state.isOpen = false
        },
        openDeleteModal:(state)=>{
            state.deleteIsOpen = true
        },
        closeDeleteModal : (state)=>{
            state.deleteIsOpen = state.initialState
        }

    }

})

export const {openModal,closeModal} = modalSlice.actions

export default modalSlice.reducer