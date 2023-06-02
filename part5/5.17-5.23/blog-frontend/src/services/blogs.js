import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = blogId => {
  const config = {
    headers: { Authorization: token },
  }
  return axios
  .delete(`${baseUrl}/${blogId}`, config)
  .then(response => response.data)
}

const updateBlog = blog => {

  return axios
  .put(`${baseUrl}/${blog.id}`, blog)
  .then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, deleteBlog, updateBlog}
