import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";



const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
    deleteNotification(state, action) {
            return null
    },
},
})

export const showMessage = (message, time) => {
    return async dispatch => {
        console.log(message)
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(deleteNotification(message))
        }, time * 1000)
    }
  }

export const { addNotification, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;