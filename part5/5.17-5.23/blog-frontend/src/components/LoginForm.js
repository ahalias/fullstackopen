import PropTypes from 'prop-types'



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
            username
              <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={handleLoginChange}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>      
      )
    
}



  export default LoginForm