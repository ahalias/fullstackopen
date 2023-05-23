import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../services/requests"
import context from "../context"
import { useContext } from "react"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(context)
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      console.log(newAnecdote);
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
      setTimeout(() => {
        notificationDispatch({type: "MESSAGE", payload: null})
      }, 5000)
      notificationDispatch({type: "MESSAGE", payload: `New anecdote "${newAnecdote.content}" created`})
    },
    onError: (error) => {
      console.error('An error occurred while creating the anecdote:', error.message);
      setTimeout(() => {
        notificationDispatch({type: "ERROR", payload: null})
      }, 5000)
      notificationDispatch({type: "ERROR", payload: `Anecdote length must be at least 5`})

    },
  });


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    anecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
