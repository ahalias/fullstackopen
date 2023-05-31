import { useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK } from '../mutations'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_GENRE, ALL_GENRES, BOOK_ADDED } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()



  const [ addBook ] = useMutation(ADD_BOOK, {

    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook)
        };
      });
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.addBook.author)
        };
      });
      cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
        const genres = response.data.addBook.genres;
      
        const updatedGenres = [...new Set(allGenres.concat(...genres))];
      
        return {
          allGenres: updatedGenres
        };
      });

    },

})



  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await addBook({  variables: { title, author, published: parseInt(published), genres } })


    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook