const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper.js')


describe('total likes', () => {

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})



test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
        {
          id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        }
    ]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
})

})

describe('blog stats', () => {
    test('get blogs with most likes', () => {
        
          const result = listHelper.favoriteBlog(blogs)
          expect(result).toEqual({
            id: '5a422aa71b54a676234d17f9',
            title: 'Introduction to Algorithms',
            author: 'Thomas H. Cormen',
            url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
            likes: 12,
          })
    })

    test('get writer with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({"author": "Thomas H. Cormen", "blogs": 2})
    })

    test('get writer with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({"author": "Thomas H. Cormen", "likes": 22})
    })

})


module.exports = blogs