import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../mutations"


const LoginForm = ({show, token, setToken, setPage}) => {

    

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, result] = useMutation(LOGIN)


    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
      }


    const handleLogin = (event) => {
        event.preventDefault()
        login({variables: {username, password}})
        setUsername("")
        setPassword("")
        setPage('authors')
    }


    return (
<form onSubmit={handleLogin}>
    <input
    type="text"
    value={username}
    onChange={({target}) => setUsername(target.value)} />
    <br />
    <input 
    type="password"
    value={password}
    onChange={({target}) => setPassword(target.value)} />
    <button type="submit">login</button>
</form>
    )
}


export default LoginForm