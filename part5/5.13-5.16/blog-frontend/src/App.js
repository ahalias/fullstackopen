import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './services/toggle'





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()



  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      showMessage('Wrong username or password')
      setUsername('')
      setPassword('')
    }
  }

  const handleLoginChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)




  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const showMessage = message => {
    setTimeout(() => {
      setMessage('')}, 5000)
      setMessage(message)
  }

  const createNewBlog = (newBlog) => {
    blogService.create(newBlog).then(response => {
      setBlogs([...blogs, {...response, user: {...response.user, username: user.username}}])
      showMessage(`A new blog ${newBlog.title} by ${newBlog.author} is added`)
    }).catch(error => showMessage(error.message))
    blogFormRef.current.toggleVisibility()

  }


  const handleBlogDelete = (blogId) => {
    if (window.confirm("Do you really want to delete blog?")) {
    blogService.deleteBlog(blogId).then(response => {
      setBlogs(blogs.filter(blog => blog.id !== blogId))
      showMessage("Blog deleted successfully")
    }).catch(error => showMessage("Only author can delete blog"))
  }
  }

  const handleLikeUp = ({blog, likes}) => {
    const blogUpdate = {...blog, user: blog.user.id, likes: likes}
    blogService.updateBlog(blogUpdate)
    .then(response => {
const updatedBlogs = blogs.map(blogItem =>
        blogItem.id === response.id ? response : blogItem
      );
      setBlogs(updatedBlogs);
    })
    .catch(error => {
      showMessage(error)
    })
    }


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes )
      setBlogs( blogs )
    }
    )  
  }, [])


  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  if (user === null) {
    return (
      <div>
        { message }
      < LoginForm  handleLogin={handleLogin} username={username} password={password} handleLoginChange={handleLoginChange} handlePasswordChange={handlePasswordChange}/>
      </div>
    )
  }

  return (
    <div>
      { message }
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={logout}>logout</button></p>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
      < BlogForm createNewBlog={createNewBlog}/>
      </Togglable>

      {blogs.map(blog =>
      <>
        <Blog key={blog.id} blog={blog} user={user} handleBlogDelete={handleBlogDelete} handleLikeUp={handleLikeUp} />
      </>
      )}
    </div>
  )
}


export default App