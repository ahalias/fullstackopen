import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { deleteMessage, setMessage } from '../reducers/notificationReducer'


const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
    setTimeout(() => {
        dispatch(deleteMessage())
    }, 5000)
    dispatch(setMessage(`"${content}" added`))

}



  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
    </div>
  )


}



  export default NewAnecdoteForm