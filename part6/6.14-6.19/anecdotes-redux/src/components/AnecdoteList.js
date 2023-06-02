import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { deleteMessage, setMessage } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = () => {
    const dispatch = useDispatch()


    const anecdotes = useSelector(state => {
        console.log(state)
        const filter = state.filter.toLowerCase().trim();
        if (filter === "") {
            return state.anecdotes
        }
        return state.anecdotes.filter(item => item.content.toLowerCase().includes(filter))
    })
  
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(addVote(id, anecdotes))
      dispatch(setNotification(`you voted for "${anecdotes.find(anecdote => anecdote.id === id).content}"`, 5))
    }

return (
<div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
</div>

    )
}

export default AnecdoteList