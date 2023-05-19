import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const Button = ({text, onClick}) => {
    return (
      <button type="submit" onClick={onClick}>{text}</button>
      )
  }


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const showMessage = message => {
    setTimeout(() => {
      setMessage('')}, 5000)
      setMessage(message)
  }

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
      showMessage('Wrong username or password')
    }
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

      blogService.create(newBlog).then(response => {
        setBlogs([...blogs, {title: newBlog.title, author: newBlog.author}])
        showMessage(`A new blog ${title} by ${author} is added`)

      }).catch(error => showMessage(error.message))
      setTitle('')
      setAuthor('')
      setUrl('')
  }
  

  const blogForm = () => (
    <div>
    <form onSubmit={handleBlogSubmit}>
      title: <input
        value={title}
        type="text"
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author: <input
        value={author}
        type="text"
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url: <input
        value={url}
        type="text"
        name="url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">create</button>
    </form>  
    </div>
  )


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      {loginForm()}
      </div>
    )
  }

  return (
    <div>
      { message }
      <h2>blogs</h2>
      <p>{user.username} logged in <Button text='logout' onClick={logout}/></p>
      <p>{blogForm()}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App