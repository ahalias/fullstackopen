import { gql } from '@apollo/client'



export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres,
  ) {
    title
    author
    published
  }
}
`;


export const CHANGE_BIRTH_YEAR  = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $born,
    )
    {
        name
        born
        bookCount
    }
}
`