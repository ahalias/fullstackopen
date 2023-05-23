import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'



const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        deleteMessage(state, action) {
            return null

        }
    }
})




export const {setMessage, deleteMessage} = notificationSlice.actions


export const setNotification = (message, time) => {
    return async dispatch => {
        setTimeout(() => {
          dispatch(deleteMessage())
      }, time * 1000)
      dispatch(setMessage(message))
      }
    }


export default notificationSlice.reducer