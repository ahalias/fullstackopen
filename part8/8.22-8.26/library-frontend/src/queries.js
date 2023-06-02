import { gql } from '@apollo/client'



const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    genres
    author {
      name
      born
    }
    published
  }
`


const AUTHOR_DETAILS = gql`
fragment authorDetails on Author {
  name
  born
}
`


export const ALL_AUTHORS = gql`
query {
    allAuthors {
...authorDetails
    }
  }
  ${AUTHOR_DETAILS}
  `

  export const ALL_GENRES = gql`
  query {
    allGenres 
  }
  `


  export const ALL_BOOKS = gql`
  query {
    allBooks { 
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`


export const ALL_BOOKS_BY_GENRE = gql`
query AllBooks($genre: String!) {
  allBooks(genre: $genre) {
    ...bookDetails
  }
}
${BOOK_DETAILS}

`


export const USER_INFO = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

