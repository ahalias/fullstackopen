import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useContext } from 'react'
import notificationContext from './context'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(notificationContext)

  const anecdotePutMutation = useMutation(updateAnecdote , {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const result = useQuery('anecdotes', getAnecdotes, {retry: 1, refetchOnWindowFocus: false  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available</div>
  }

  const anecdotes = result.data



  const handleVote = (anecdote) => {
    anecdotePutMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    setTimeout(() => {
      notificationDispatch({type: "MESSAGE", payload: null})
    }, 5000)
    notificationDispatch({type: "MESSAGE", payload: `anecdote "${anecdote.content}" voted`})
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      {notification && <Notification />}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
