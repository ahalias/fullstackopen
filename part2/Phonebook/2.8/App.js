import { useState } from 'react'

const Person = ({person}) => <p>{person.name} {person.number}</p>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: ''}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')

  const addNameHandler = (event) => {
    event.preventDefault()
  
    if (persons.find((person) => newName === person.name)) {
      setNewName("")
      setNewNumber("")
      return alert(`${newName} already exists`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
    }
    

  const changeNameHandler = (event) => setNewName(event.target.value)
  const changeNumberHandler = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameHandler}>
        <div>
          name: <input value={newName} onChange={changeNameHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumberHandler}/>
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
