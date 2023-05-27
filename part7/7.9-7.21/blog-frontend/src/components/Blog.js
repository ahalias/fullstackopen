import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveBlogs, addNewBlog, deleteBlog, addLike } from '../reducers/blogReducer'
import { showMessage } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import userContext from "../context"
import { useNavigate } from 'react-router-dom'
import commentService from '../services/comments'
import { TextField, Button } from '@mui/material'
import { useQuery } from 'react-query'



const Blog = () => {

  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const id = useParams().id
  const [,blogs] = useContext(userContext)
  const navigate = useNavigate()



  const handleBlogDelete = (blogId) => {
    if (window.confirm("Do you really want to delete blog?")) {
    dispatch(deleteBlog(blogId))
      dispatch(showMessage("Blog deleted successfully", 5))
      navigate('/')
  }
  }

  const handleLikeUp = ({blog, likes}) => {
    const blogUpdate = {...blog, user: blog.user.id, likes: likes}
    dispatch(addLike(blogUpdate))
    }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


const [likes, setLikes] = useState(0)
const [comments, setComments] = useState([])
const [comment, setComment] = useState([])


const blog = blogs.find(blog => blog.id === id)

useEffect(() =>{
  commentService
  .getComments(blog.id)
  .then(response => {
    setComments(response)
  })
  
}, [blog.id])


useEffect(() =>{
  setLikes(blog.likes)
}, [blog.likes])


const handleCommentChange = (event) => {
  setComment(event.target.value)
}

const handleCommentSubmit = async (event) => {
  event.preventDefault()
  const response = await commentService.postComment({id: blog.id, comment})
  setComments(oldComments => [...oldComments, response])
  setComment('')
} 


  return (
  <div style={blogStyle} className="blogEntity" id="blogEntity">
    <h2>{blog.title} {blog.author}</h2>
    <p>{blog.url}</p>
    <p id="likes">likes {likes} <Button variant="contained" color="primary" onClick={() => { 
    setLikes(prevLikes => prevLikes + 1);
    handleLikeUp({blog, likes: likes + 1}) 
      }} id="likebutton">like</Button></p>
    <p>added by {blog.user && blog.user.username}</p>
    {  blog.user && user && (user.username === blog.user.username || blog.user === user.id) && < Button variant="contained" color="primary" onClick={() => handleBlogDelete(blog.id)} id="deleteblog">delete</Button> }
<h3>Comments:</h3>

<form onSubmit={handleCommentSubmit}>
<div>
    <TextField 
    label="comment"
    type="text"
    value={comment}
    name="comment"
    id="comment"
    onChange={handleCommentChange}
  />
</div>
<Button variant="contained" color="primary" type="submit" id="login-button">add comment</Button>
</form>

<ul>
{comments.map(comment => (
<li key={comment.id}>
  {comment.body}
  </li>


))}
</ul>
  </div>  
)
  }

export default Blog