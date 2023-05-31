import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allPersons: allBooks.concat(addedBook),
        }
      })
    }
  })




  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')

  }




  if (!token) {
    return (
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

      </div>
      

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />



    </div>
      
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {token && <button onClick={() => setPage('recommend')}>recommend</button> }

        <button type="submit" onClick={logout}>logout</button>

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />

      {token && <Recommend show={page === 'recommend'} />  }

    </div>
  )
}

export default App
