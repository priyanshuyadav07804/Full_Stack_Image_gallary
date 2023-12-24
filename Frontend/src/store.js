import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './feature/modal/modalSlice'
import itemReducer from './feature/Item/ItemSlice'

export const store = configureStore({
    reducer:{
        modal:modalReducer,
        item:itemReducer
    }
})

