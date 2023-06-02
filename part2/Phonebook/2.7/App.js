import { useState } from 'react'

const Person = ({person}) => <p>{person.name}</p>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNameHandler = (event) => {
    event.preventDefault()
  
    if (persons.find((person) => newName === person.name)) {
      setNewName("")
      return alert(`${newName} already exists`)
    } else {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
    }
    }
    

  const changeNameHandler = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameHandler}>
        <div>
          name: <input value={newName} onChange={changeNameHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person} /> )}
    </div>
  )
}

export default App
