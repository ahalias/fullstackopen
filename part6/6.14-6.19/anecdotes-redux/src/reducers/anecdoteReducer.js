import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)



export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)




const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
const content = action.payload
state.push(asObject(content))
    },
      voteForAnecdote(state, action) {
        const id = action.payload
        return state.map(item => item.id !== id ? item : {...item, votes: item.votes + 1}).sort((a, b) => b.votes - a.votes)
      },
      setAnecdotes(state, action) {
        return action.payload.sort((a, b) => b.votes - a.votes)
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      }
  }
})

export const { createAnecdote, voteForAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions


export const initialData = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
  }

  export const addAnecdote = (content) => {
    return async dispatch => {
      const anecdote = await anecdoteService.postAnecdote(content)
      dispatch(appendAnecdote(anecdote))
    }
  }

  export const addVote = (id, anecdotes) => {
    return async dispatch => {
      const anecdote = await anecdoteService.putAnecdote(id, anecdotes)
      dispatch(voteForAnecdote(id))
    }
  }



export default anecdoteSlice.reducer