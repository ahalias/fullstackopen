import { useState } from 'react'



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
      title: <input
        value={title}
        type="text"
        name="title"
        placeholder='blog title'
        id="blogtitle"
        onChange={handleTitleChange}
      />
      <br />
      author: <input
        value={author}
        type="text"
        name="author"
        placeholder='blog author'
        id="blogauthor"
        onChange={handleAuthorChange}
      />
      <br />
      url: <input
        value={url}
        type="text"
        name="url"
        placeholder='blog url'
        id="blogurl"
        onChange={handleUrlChange}
      />
      <br />
      <button type="submit">create</button>
    </form>  
    </div>
  ) }


  export default BlogForm