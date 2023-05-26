import { useState } from 'react'
import { TextField, Button } from '@mui/material'


const BlogForm = ({createNewBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = ({ target }) => setTitle(target.value)
    const handleAuthorChange = ({ target }) => setAuthor(target.value)
    const handleUrlChange = ({ target }) => setUrl(target.value)

    const handleBlogSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
          title: title,
          author: author,
          url: url
        }
    
          createNewBlog(newBlog)
          setTitle('')
          setAuthor('')
          setUrl('')
      }

    return (
    <div>
    <form onSubmit={handleBlogSubmit}>
      <div>
    <TextField
        value={title}
        label="title"
        type="text"
        name="title"
        placeholder='blog title'
        id="blogtitle"
        onChange={handleTitleChange}
      />
      </div>
      <div>
      <TextField
        value={author}
        label="author"

        type="text"
        name="author"
        placeholder='blog author'
        id="blogauthor"
        onChange={handleAuthorChange}
      />
      </div>
      <div>
      <TextField
        value={url}
        label="url"
        type="text"
        name="url"
        placeholder='blog url'
        id="blogurl"
        onChange={handleUrlChange}
      />
      </div>
      <Button variant="contained" color="primary" type="submit">create</Button>
    </form>  
    </div>
  ) }


  export default BlogForm