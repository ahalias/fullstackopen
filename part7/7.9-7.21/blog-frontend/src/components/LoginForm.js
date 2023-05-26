import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'



const LoginForm = ({handleLogin, username, password, handleLoginChange, handlePasswordChange}) => {

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleLoginChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }


        return (
        <form onSubmit={handleLogin}>

          <div>
              <TextField 
              label="username"
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={handleLoginChange}
            />
          </div>
          <div>
              <TextField
              label="password"
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <Button variant="contained" color="primary" type="submit" id="login-button">login</Button>
        </form>      
      )
    
}



  export default LoginForm