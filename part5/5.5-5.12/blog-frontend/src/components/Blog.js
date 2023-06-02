import { useState } from 'react'


const Blog = ({blog, user, handleBlogDelete, handleLikeUp}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const [fullblog, setFullBlog] = useState(false)

const hideWhenVisible = { display: fullblog ? 'none' : '' }
const showWhenVisible = { display: fullblog ? '' : 'none' }

const toggleVisibility = () => {
  setFullBlog(!fullblog)
}




  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <div style={hideWhenVisible}>
    <button onClick={toggleVisibility}>show</button>
    </div>
    <div style={showWhenVisible}>
    <button onClick={toggleVisibility}>hide</button>
    <p>{blog.url}</p>
    <p>likes {blog.likes} <button onClick={() => { handleLikeUp(blog) }}>like</button></p>
    <p>{blog.user && blog.user.username}</p>
    {  blog.user && user && user.username === blog.user.username && < button onClick={() => handleBlogDelete(blog.id)} >delete</button> }

    </div>
  </div>  
)
  }

export default Blog