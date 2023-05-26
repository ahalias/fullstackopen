import { useContext } from "react"
import userContext from "../context"
import { useParams } from "react-router-dom"


const User = () => {

    const id = useParams().id
    const [users,] = useContext(userContext)

    const user = users.find(pers => pers.id===id)


    return (
        <div>
            <h2>{user.name}</h2>
            <h2>{user.username}</h2>
            <h4>Added blogs</h4>
            {user.blogs.length > 0 
            ? user.blogs.map(blog => <div key={blog.id}>{blog.title}</div>) 
            : <p>no blogs added</p>}

        </div>
    )
}


export default User