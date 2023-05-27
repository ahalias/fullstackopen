import { useQuery } from "react-query"
import { useContext } from "react"
import userContext from "../context"


const Users = () => {
    
const [users,] = useContext(userContext)


    return (
        <div>

<table>

<thead><tr><th></th><th>Blogs created</th></tr></thead>
<tbody>
{users && users.map(user => 
    
    <tr key={user.id}><td>
<div><a href={`/users/${user.id}`}>{user.username}</a></div>
</td>
<td>{user.blogs.length}</td>
</tr>
    )}
    </tbody>
    </table>



</div>
    )
}


export default Users