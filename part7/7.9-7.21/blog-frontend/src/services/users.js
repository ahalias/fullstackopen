import axios from "axios";


const baseUrl ='/api/users'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const userServise = { getAll }
export default userServise