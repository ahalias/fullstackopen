import BlogForm from '../components/BlogForm'
import Togglable from '../services/toggle'
import Blog from '../components/Blog'
import { retrieveBlogs, addNewBlog, deleteBlog, addLike } from '../reducers/blogReducer'
import { useQuery } from 'react-query'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../reducers/notificationReducer'
import { 
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button,
    Alert
  } from '@mui/material'



const Blogs = () => {

  const blogFormRef = useRef()
    const dispatch = useDispatch()
    const notification = useSelector(store => store.notification)
    const blogs = useSelector(store => store.blogs)
    const user = useSelector(store => store.user)
  

  
    const createNewBlog =  (newBlog) => {
       dispatch(addNewBlog(newBlog))
        dispatch(showMessage(`A new blog ${newBlog.title} by ${newBlog.author} is added`, 5))
        blogFormRef.current.toggleVisibility()

    }
  

    useEffect(() => {
        dispatch(retrieveBlogs())
      }, [dispatch])
  
  
  
    return (
      <div>
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
        < BlogForm createNewBlog={createNewBlog}/>
        </Togglable>
  <div id="bloglist">
  <TableContainer component={Paper}>
  <Table>
  <TableBody>
        {
        blogs.map(blog =>
        <TableRow key={blog.id}>
         <TableCell>
          <div><a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a></div>
          </TableCell>
          </TableRow>
        )}</TableBody>
        </Table>
        </TableContainer>
        </div>
        </div>
    )
  }


  export default Blogs