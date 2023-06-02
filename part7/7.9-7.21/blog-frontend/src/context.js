import { createContext } from "react";
import { useQuery } from "react-query";
import userService from './services/users';
import blogService from './services/blogs'



const userContext = createContext()

export const ContextProvider = (props) => {
const blogResponse = useQuery('blogs', blogService.getAll, {retry:10})

    

    const usersResponse = useQuery('users', userService.getAll, {retry:10})
    if (usersResponse.isLoading) {
        return <div>Loading...</div>;
      }
    
      if (usersResponse.isError) {
        return <div>Error occurred while fetching users.</div>;
      }
    const users = usersResponse.data.sort((a, b) => b.blogs.length - a.blogs.length)


    if (blogResponse.isLoading) {
        return <div>Loading...</div>;
      }
    
      if (blogResponse.isError) {
        return <div>Error occurred while fetching users.</div>;
      }
    const blogs = blogResponse.data


    return (
<userContext.Provider value={[users, blogs]} >
    { props.children }
</userContext.Provider>
    )



}

export default userContext