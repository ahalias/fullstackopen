import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const updateDB = (person) => {
  return axios
  .put(`${baseUrl}/${person.id}`, person)
  .then((response) => response.data)
}

const getDB = () => {
  return axios
  .get(baseUrl)
  .then((response) => response.data)
}

const addToDB = (person) => {
  return axios
  .post(baseUrl, person)
  .then((response) => response.data)
}

const deleteFromDB = ({id, name}) => {
    if (window.confirm(`Do you really want to remove ${name}?`)) {
        return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log("error"))
      } else {
        return Promise.resolve({ message: "Deletion cancelled" })
      }
    
}

export default { updateDB, getDB, addToDB, deleteFromDB }
