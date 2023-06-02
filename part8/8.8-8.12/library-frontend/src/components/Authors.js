import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { CHANGE_BIRTH_YEAR } from '../mutations'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'
import Select from 'react-select';




const Authors = (props) => {
const [name, setName] = useState('')
const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(CHANGE_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  if (result.loading) {
    return <div>loading...</div>
  }


  if (!props.show) {
    return null
  }




  const submitNewBirthYear = async (event) => {
    event.preventDefault()
    await editAuthor({variables: {name, born: parseInt(born)} })
    setName('')
    setBorn('')
  }


  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
      <form onSubmit={submitNewBirthYear}>
      <Select options={authors.map((a) => ({
              value: a.name,
              label: a.name,
      })
      )}
      onChange={({value}) => setName(value)}
      />
        <div>
          born
          <input
          type="number"
          value={born}
          onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
        </form>
        </div>
    </div>
  )
}

export default Authors
