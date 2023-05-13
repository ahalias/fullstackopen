import  { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import noteService from './services/notes'
import './index.css'




const Person = ({person, deleteEntry}) => {
  return (
<p>{person.name} {person.number} <Button text="delete" id={person.id} name={person.name} deleteEntry={deleteEntry}/></p>
  )
}

const Filter = ({filter, handler}) => <div>filter shown with: <input value={filter} onChange={handler}/></div>

const Persons = ({filteredEntries, deleteEntry}) => filteredEntries.map((person) => <Person key={person.name} person={person} deleteEntry={deleteEntry} /> )

const Button = ({text, id, name, deleteEntry}) => <button type="submit" onClick={() => deleteEntry({id, name})}>{text}</button>

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
<div className='message'>{message}</div>
)
  }


const App = () => {
  const [persons, setPersons] = useState([
    {}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [getNames, setGetNames] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [message, setMessage] = useState(null)


  const displayMessage = ({user, action}) => {
    setMessage(`${user} ${action}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
  }

  

  useEffect(() => {
    noteService
    .getDB()
    .then((data) => {
      setPersons(data)
      setPersonsToShow(data)
    })
  }, [])

  const deleteEntry = ({id, name}) => {
    noteService
    .deleteFromDB({id, name})
    .then((data) => {
      if (!data.message) {
        setPersons(persons.filter(person => person.id !== id))
      setPersonsToShow(personsToShow.filter(person => person.id !== id))
      displayMessage({user: name, action: "info deleted succesfully"})
      }
      })
      .catch((error) => {
        displayMessage({user: name, action: "info has already been deleted"})
      })
  }


  const addNameHandler = (event) => {
    event.preventDefault()
    const personToChange = persons.find((person) => newName === person.name)

    if (personToChange) {
      if (window.confirm(`Do you really want to update the number of ${newName}?`)) {
        const changedPerson = {...personToChange, number: newNumber}
        noteService
    .updateDB(changedPerson)
      .then((data) => {
        setPersons(persons.map(person => person.id !== personToChange.id ? person : data))
        setPersonsToShow(personsToShow.map(person => person.id !== personToChange.id ? person : data))
        displayMessage({user: changedPerson.name, action: "info changed succesfully"})
      })
      setNewName("")
      setNewNumber("")
      } else {
        setNewName("")
      setNewNumber("")
        return Promise.resolve()
      }
      
      
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
        displayMessage({user: newPerson.name, action: "info added succesfully"})
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
      <Notification message={message}/>
        <Filter filter={getNames} handler={getNamesHandler}/>

      <h2>Add a new</h2>
      <PersonForm onsubmit={addNameHandler} nameValue={newName} nameOnChange={changeNameHandler} numberValue={newNumber} numberOnchange={changeNumberHandler}/>
      
      <h2>Numbers</h2>
      <Persons filteredEntries={personsToShow} deleteEntry={deleteEntry}/>
    </div>
  )
}

export default App