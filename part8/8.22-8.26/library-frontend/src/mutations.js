import { gql } from '@apollo/client'



export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`



export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres,
  ) {
    title
    genres
    author {
      name
      born
    }
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