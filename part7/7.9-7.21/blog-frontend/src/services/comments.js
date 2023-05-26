import axios from 'axios'
const baseUrl = '/api/blogs'


const getComments = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}/comments`)
    return request.data
}

const postComment = async (comment, id) => {
    const request = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return request.data
}

export default { getComments, postComment }