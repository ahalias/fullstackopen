import axios from 'axios'
const baseUrl = '/api/blogs'


const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}

const postComment = async (comment, id) => {
    
    const newObj = {
        body: comment.comment,
        blog: comment.id
    }
    const response = await axios.post(`${baseUrl}/${comment.id}/comments`, newObj)
    return response.data
}

export default { getComments, postComment }