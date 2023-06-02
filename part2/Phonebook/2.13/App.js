import  { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import noteService from './services/notes'
import axios from 'axios'


const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = ({filter, handler}) => <div>filter shown with: <input value={filter} onChange={handler}/></div>

const Persons = ({filteredEntries}) => filteredEntries.map((person) => <Person key={person.name} person={person} /> )



const App = () => {
  const [persons, setPersons] = useState([
    {}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [getNames, setGetNames] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  useEffect(() => {
    noteService
    .getDB()
    .then((data) => {
      setPersons(data)
      setPersonsToShow(data)
    })
  }, [])


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
      noteService
      .addToDB(newPerson)
      .then((data) => {
        setPersons(persons.concat(data))
        setPersonsToShow(personsToShow.concat(data))
      })
      
      setNewName("")
      setNewNumber("")
    }
    }
    

  const changeNameHandler = (event) => setNewName(event.target.value)
  const changeNumberHandler = (event) => setNewNumber(event.target.value)
  const getNamesHandler = (event) => {
    setGetNames(event.target.value)
    const filteredPersons =  persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersonsToShow(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={getNames} handler={getNamesHandler}/>

      <h2>Add a new</h2>
      <PersonForm onsubmit={addNameHandler} nameValue={newName} nameOnChange={changeNameHandler} numberValue={newNumber} numberOnchange={changeNumberHandler}/>
      
      <h2>Numbers</h2>
      <Persons filteredEntries={personsToShow}/>
    </div>
  )
}

export default App
