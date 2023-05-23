
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initialData } from './reducers/anecdoteReducer'


import NewAnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialData())
      }, [dispatch])



  return (
    <div>
      { notification !== null && < Notification /> }
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList/>
      <NewAnecdoteForm />
    </div>
  )
}

export default App