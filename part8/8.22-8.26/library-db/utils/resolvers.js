const { JWT_SECRET } = require('../utils/config')
const User = require('../models/User')
const Author = require('../models/Author')
const Book = require('../models/Book')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')


const pubsub = new PubSub()


const resolvers = {
    Query: {
      allGenres: async () => await Book.distinct('genres'),
        authorCount: async () => Author.collection.countDocuments(),
        me: (root, args, context) => context.currentUser,
        allAuthors: async (root, args) => Author.find({}).populate('books'),
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
        bookCount: async (root, args) => await Book.collection.countDocuments()
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({name: root.name}).populate('books')
            return author.books.length
        }
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
            bookAuthor.books = bookAuthor.books.concat(book)
            await bookAuthor.save()

            pubsub.publish('BOOK_ADDED', { bookAdded: book })


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

    },
    
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
}

module.exports = resolvers