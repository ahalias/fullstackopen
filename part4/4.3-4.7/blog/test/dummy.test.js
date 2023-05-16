const listHelper = require('../utils/list_helper')



describe('total likes', () => {

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})



test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
})

})

describe('blog stats', () => {
    const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'Introduction to Algorithms',
          author: 'Thomas H. Cormen',
          url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17fa',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
          likes: 7,
          __v: 0
        },
        {
            _id: '5a422aa71b5424a676234d17f9',
            title: 'Introduction to Algorithms 2',
            author: 'Thomas H. Cormen',
            url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition/2',
            likes: 10,
            __v: 0
          }
      ];
    test('get blogs with most likes', () => {
        
          const result = listHelper.favoriteBlog(blogs)
          expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f9',
            title: 'Introduction to Algorithms',
            author: 'Thomas H. Cormen',
            url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
            likes: 12,
            __v: 0
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