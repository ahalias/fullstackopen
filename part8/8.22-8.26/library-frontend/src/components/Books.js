import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, ALL_GENRES } from "../queries"



const Books = (props) => {

  const result = useQuery(ALL_BOOKS)  
  const genresData =  useQuery(ALL_GENRES)  

  const [genre, setGenre] = useState(null)

  const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  const [allGenres, setAllGenres] = useState({});
  const [books, setBooks] = useState([])



  useEffect(() => {
    if (genresData.data) {
      setAllGenres(genresData.data.allGenres) 
    }
  }, [genresData.data]);

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (booksByGenre && booksByGenre.data &&  booksByGenre.data.allBooks) {
      setBooks(booksByGenre.data.allBooks);
    }
  }, [booksByGenre]);


  if (result.loading) {
    return (
      <div>Loading...</div>
    )
  }


  if (!props.show) {
    return null
  }


  const fetchBooksByQuery = (genretoShow) => {
    setGenre(genretoShow)
    console.log(booksByGenre)
  }



  return (
    <div>
      <h2>books</h2>
<p>by <b>genre</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" onClick={() => setBooks(result.data.allBooks)}>All Genres</button>

      {allGenres.map(genre => (
        <button key={genre} type="submit" onClick={() => fetchBooksByQuery(genre)}>
  {genre}
</button>
      ))}
      
    </div>
  )
}

export default Books
