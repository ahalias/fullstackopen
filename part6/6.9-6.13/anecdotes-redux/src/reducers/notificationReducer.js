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
export default notificationSlice.reducer