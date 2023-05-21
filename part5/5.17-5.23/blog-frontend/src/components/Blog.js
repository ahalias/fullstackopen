import { useState, useEffect } from 'react'


const Blog = ({blog, user, handleBlogDelete, handleLikeUp}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const [fullblog, setFullBlog] = useState(false)

const hideWhenVisible = { display: fullblog ? 'none' : 'block' }
const showWhenVisible = { display: fullblog ? 'block' : 'none' }
const [likes, setLikes] = useState(0)

const toggleVisibility = () => {
  setFullBlog(!fullblog)
}

useEffect(() =>{
  setLikes(blog.likes)
}, [blog.likes])

  return (
  <div style={blogStyle} class="blogEntity" id="blogEntity">
    {blog.title} {blog.author}
    <div style={hideWhenVisible} id="blogShort">
    <button onClick={toggleVisibility} id="showbutton">show</button>
    </div>
    <div style={showWhenVisible} id="blogLong">
    <button onClick={toggleVisibility}>hide</button>
    <p>{blog.url}</p>
    <p id="likes">likes {likes} <button onClick={() => { 
    setLikes(prevLikes => prevLikes + 1);
    handleLikeUp({blog, likes: likes + 1}) 
      }} id="likebutton">like</button></p>
    <p>{blog.user && blog.user.username}</p>
    {  blog.user && user && user.username === blog.user.username && < button onClick={() => handleBlogDelete(blog.id)} id="deleteblog">delete</button> }

    </div>
  </div>  
)
  }

export default Blog