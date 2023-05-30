import { gql } from '@apollo/client'




export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `

  export const ALL_GENRES = gql`
  query {
    allGenres 
  }
  `




  export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title 
      genres
      author {
        name
        born
      }
      published 

    }
  }
`


export const ALL_BOOKS_BY_GENRE = gql`
query AllBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    genres
    author {
      name
      born
    }
    published
  }
}
`


export const USER_INFO = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

