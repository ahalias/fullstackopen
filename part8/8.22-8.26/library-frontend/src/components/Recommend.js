import { useQuery, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS_BY_GENRE, USER_INFO } from "../queries"


const Recommend = ({show}) => {

    const [favGenre, setFavGenre] = useState(null)
    const [books, setBooks] = useState("")
    

    const [getBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE)

    const user = useQuery(USER_INFO)


      useEffect(() => {
        if (user.data) {
            const genreToShow = user.data.me.favoriteGenre
            setFavGenre(genreToShow)
            getBooks({ variables: { genre: favGenre}})
        }
    }, [getBooks, favGenre, user.data])

    useEffect(() => {
        if (result.data) {
            console.log(result)
            const booksToShow = result.data.allBooks
            setBooks(booksToShow)
        }
    }, [result, user.data])

    
    


    if (!show) {
        return null
    } else if (user.loading || result.loading) {
        return (
            <div>Loading...</div>
        )
    }






    return(
<table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books && books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}


export default Recommend