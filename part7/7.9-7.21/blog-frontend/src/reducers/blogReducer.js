import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { showMessage } from "./notificationReducer"
import { useQuery, useQueryClient, useMutation } from "react-query"


const blogSlice = createSlice({
name: 'blogs',
initialState: [],
reducers: {
getAllBlogs(state, action) {
    return action.payload.sort((a, b) => b.likes - a.likes)
},
addBlog(state, action) {
    state.push(action.payload)
},
removeBlog(state, action) {
    return state.filter(blog => blog.id !== action.payload) 
},
likeBlog(state, action) {
    return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
},
},
})


export const retrieveBlogs = () => {
    return async dispatch => {
        blogService
        .getAll()
        .then(blogs => {
            console.log(blogs)
            dispatch(getAllBlogs(blogs))
        })
    }
}

export const addNewBlog = (newBlog) => {
    return async dispatch => {
        blogService.create(newBlog)
        .then(response => {
            dispatch(addBlog(response))
        })
        .catch(error => {
            dispatch(showMessage(error.message, 5))
          })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        blogService
        .deleteBlog(id)
        .then(response => {
            dispatch(removeBlog(id))
        })
        .catch(error => dispatch(showMessage("Only author can delete blog", 5)))

    }
}

export const addLike = blogUpdate => {
    return async dispatch => {
        blogService
        .updateBlog(blogUpdate)
        .then(response => {
            console.log(response)
            dispatch(likeBlog(response))
        })
        .catch(error => {
            dispatch(showMessage(error, 5))
          })
    }

}


export const { getAllBlogs, addBlog, removeBlog, likeBlog } = blogSlice.actions
export default blogSlice.reducer