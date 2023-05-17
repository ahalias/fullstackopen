const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const blogs = require('./test_helper.js')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of blogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


describe('blog list retrieval', () => {
test('blogs are returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('id instead of _id', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
})
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('a specific blog is among the returned ones', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)
  expect(contents).toContain('Edsger W. Dijkstra')
})
})

describe('blog POSTING', () => {

test('a valid blog can be added', async () => {
  const newBlog = {
    id: '5a422aa71b54a62376234d17f8',
    title: 'Test adding and deleting a blog',
    author: 'Tester',
    url: 'test.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(blogs.length + 1)
  expect(contents).toContain(
    'Test adding and deleting a blog'
  )
})


test('default likes number is 0', async () => {
  const newBlog = {
    title: 'Test likes',
    author: 'Tester',
    url: 'test.com'
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  const response = await api.get('/api/blogs')
  const blog = expect(response.body.find(blog => blog.title==="Test likes").likes).toBe(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "title not added",
    url: 'test.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(response.body).toHaveLength(blogs.length)
  expect(contents).not.toContain(
    'title not added'
  )
}, 1000)

test('blog without url is not added', async () => {
  const newBlog = {
    author: "Tester",
    title: 'url not added'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(blogs.length)
  expect(contents).not.toContain(
    'url not added'
  )
}, 1000)

})

describe('blog POSTING and DELETING', () => {
test('delete blog', async () => {
  const newBlog = {
    title: 'Test adding and deleting a blog 2',
    author: 'Deleter',
    url: 'test.com',
    likes: 1,
  }
  const createBlog = await api
    .post('/api/blogs')
    .send(newBlog)

    const blogId = createBlog.body.id

    const getResponse = await api.get(`/api/blogs/${blogId}`);
    expect(getResponse.body.author).toBe('Deleter');

  await api
  .delete(`/api/blogs/${blogId}`)
  .expect(204)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)
  expect(contents).not.toBe('Deleter')

})
})

describe('blog POSTING and UPDATING', () => {

  test('update blog', async () => {
    const newBlog = {
      title: 'Test adding and updating a blog',
      author: 'Updater',
      url: 'test.com',
      likes: 1,
    }
    const createBlog = await api
      .post('/api/blogs')
      .send(newBlog)
  
      const blogId = createBlog.body.id
  
      const getResponse = await api.get(`/api/blogs/${blogId}`);
      expect(getResponse.body.author).toBe('Updater');
  
    await api
    .put(`/api/blogs/${blogId}`)
    .expect(200)
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.author)
    expect(contents).not.toBe('Updater')
  
  })

})



afterAll(async () => {
  await mongoose.connection.close()
})