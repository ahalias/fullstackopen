const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')



const { MONGODB_URI, JWT_SECRET } = require('./utils/config')
const User = require('./models/User')


const typeDefs = `

type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }
  
  type Token {
    value: String!
  }
  

type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    allBooks (author: String, genre: String): [Book!]!
    bookCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
        username: String!
        favoriteGenre: String
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
`
const resolvers = {
    Query: {
        authorCount: async () => Author.collection.countDocuments(),
        me: (root, args, context) => context.currentUser,
        allAuthors: async (root, args) => Author.find({}),
        findAuthor: async (root, args) => Author.findOne({name: args.name}),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({name: args.author})
                return Book.find({ author: author._id, genres: { $in: [args.genre] } }).populate('author');
            } else if (args.author) {
                const author = await Author.findOne({name: args.author})
                return Book.find({ author: author._id }).populate('author');
            } else if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } }).populate('author');
            } else {
                return Book.find({}).populate('author');
            }
        },
        bookCount: async (root, args) => Book.collection.countDocuments()
    },
    Author: {
        bookCount: async (root) => await Book.countDocuments({author: root._id})
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                  }
                })
              }

            if (args.author.length < 4) {
                throw new GraphQLError('Invalid author name length, at least 4 symbols required ', {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                    },
                  });
            } else if (args.title.length < 5) {
                throw new GraphQLError('Invalid book title length, at least 5 symbols required ', {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                    },
                  }); 
            }
            let bookAuthor = await Author.findOne({name: args.author})
            if (!bookAuthor) {
                bookAuthor = new Author({name: args.author}) 
                await bookAuthor.save()
            }
            const book = new Book ({...args, author: bookAuthor._id})
            await book.save()
            return book.populate("author")
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                  }
                })
              }
            const author = await Author.findOne({name: args.name})
            if (!author) {
                return null
            }
            author.born = args.setBornTo
            await author.save()
            return author

        },
        createUser: async (root, args) => {
            const user = new User({...args})
            return user.save()
            .catch(error => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                      code: 'BAD_USER_INPUT'
                    }
                    })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({username: args.username})
            if ( !user || args.password !== 'secret' ) {
                throw new GraphQLError('wrong credentials', {
                  extensions: {
                    code: 'BAD_USER_INPUT'
                  }
                })        
              }
              const userForToken = {
                username: user.username,
                id: user._id,
              }

              return { value: jwt.sign(userForToken, JWT_SECRET) }

          
        }

    }

}



const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
          )
          const currentUser = await User
            .findById(decodedToken.id)
          return { currentUser }
        }
      },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })



console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


