const express = require('express')
const morgan = require('morgan');

const app = express()
app.use(express.json())
app.use(morgan('tiny'));


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    if (request.body.name.trim().length === 0 || request.body.number.trim().length === 0 || persons.find((person) => person.name === request.body.name)) {
        return response.status(400).json({error: 'name must be unique'})
    }
    const getRandomId = () =>  Math.floor(Math.random() * 100000000)
    const person = {
        "id": getRandomId(),
        "name": request.body.name,
        "number": request.body.number
    }
    persons.push(person)
    response.json(person)
  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
