import { useState, useEffect, useContext } from 'react'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import { showMessage } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from './reducers/userReducer'
import { Route, Routes, useMatch, Link } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import { useParams } from 'react-router-dom'
import { retrieveBlogs } from './reducers/blogReducer'
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
import userContext from './context'
import styled from 'styled-components'



const Nav = styled.nav`
padding: 10px 10px 10px 5px;
margin: 10px 10px 10px 5px;
background: aqua;
`

const menuElement = {
  padding: 2,
  margin: 2,
  }


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(store => store.notification)
  const user = useSelector(store => store.user)
const blogs = useSelector(store => store.blogs)

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(addUser(user))
    blogService.setToken(user.token)
  }
}, [dispatch])


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
      dispatch(addUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showMessage('Wrong username or password', 5))
      setUsername('')
      setPassword('')
    }
  }

  const handleLoginChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)




  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())

  }







  if (user === null) {
    return (
      <div>
        { notification }
      < LoginForm  handleLogin={handleLogin} username={username} password={password} handleLoginChange={handleLoginChange} handlePasswordChange={handlePasswordChange}/>
      </div>
    )
  }

  return (

<Container>      
  <div className="message">
      { notification &&  
            <Alert severity="success">
            {notification}
            </Alert>
 }
      </div >
      <h2>blogs</h2>
      <p>{user.username} logged in <Button variant="contained" color="primary" onClick={logout}>logout</Button></p>
      <Nav>
<Link style={menuElement} to="/">blogs</Link>
<Link style={menuElement} to="/users">users</Link>
</Nav>
      <Routes>
      <Route path="/users/:id" element={<User/>}/> 
      <Route path="/blogs/:id" element={<Blog/>}/> 

      <Route path="/users" element={<Users/>} />
      <Route path="/" element={<Blogs/>} />
    </Routes>
    </Container>
  )
}


export default App