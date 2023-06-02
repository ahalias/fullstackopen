import { useDispatch } from 'react-redux'
import { deleteMessage, setMessage } from '../reducers/notificationReducer'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(addAnecdote(content))
    dispatch(setNotification(`"${content}" added`, 5))

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