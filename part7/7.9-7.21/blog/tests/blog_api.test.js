const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require('./test_helper.js')
const bcrypt = require('bcrypt')
const User = require('../models/User')



describe('User testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    for (let user of helper.users) {
      newUser = new User(user)
      await newUser.save()
    }
  })


  test('creation fails with a missing username', async () => {

    const newUser = {
      name: "missingusernametest",
      password: "password",
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    response = await api.get('/api/users')

    const contents = response.body.map(r => r.name)
  expect(contents).not.toContain(newUser.name)

  })
  test('creation fails with a missing password', async () => {

    const newUser = {
      username: "missingpasswordtest",
      name: "missingpasswordtest",
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    response = await api.get('/api/users')

    const contents = response.body.map(r => r.name)
  expect(contents).not.toContain(newUser.name)

  })


  test('creation succeeds with a fresh username', async () => {

    const newUser = {
      username: 'Andrei',
      name: 'New',
      password: "newpassword",
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.users.length + 1)

    const usernames = response.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'Andrei',
      name: 'Superuser',
      password: "qwerty",
    }

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      let response = await api.get('/api/users')
      expect(response.body).toHaveLength(helper.users.length + 1)

    result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    expect(result.body.error).toContain('expected `username` to be unique')

    response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.users.length + 1)
  })
})




describe('blog testing', () => {


beforeEach(async () => {
  await User.deleteMany({})
  const newUser = {
    username: 'Andrei',
    name: 'Superuser',
    password: "qwerty",
  }

  let result = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api
  .post('/api/login')
  .send({username: "Andrei", password: "qwerty"})
  .expect(200)

  const userLogged = await User.findOne({username: response.body.username})
  const token = response.body.token
  
  await Blog.deleteMany({})
  for (let blog of helper.blogs) {
    let blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: userLogged._id
    })
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

  expect(response.body).toHaveLength(helper.blogs.length)
})

test('a specific blog is among the returned ones', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)
  expect(contents).toContain('Edsger W. Dijkstra')
})
})

describe('blog POSTING', () => {


test('blog with no valid token not added', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token

  const newBlog = {
    title: 'Test adding and deleting a blog',
    author: 'Tester',
    url: 'test.com',
    user: user._id,
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.blogs.length)
  expect(contents).not.toContain(newBlog.title)


})

test('a valid blog can be added', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token

  const newBlog = {
    title: 'Test adding and deleting a blog',
    author: 'Tester',
    url: 'test.com',
    user: user._id,
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.blogs.length + 1)
  expect(contents).toContain(newBlog.title)
})


test('default likes number is 0', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token
  const newBlog = {
    title: 'Test likes',
    author: 'Tester',
    url: 'test.com',
    user: user._id
  }
  await api
  .post('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .send(newBlog)
  .expect(201)
  const response = await api.get('/api/blogs')
  const blog = expect(response.body.find(blog => blog.title===newBlog.title).likes).toBe(0)
})

test('blog without title is not added', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token
  const newBlog = {
    author: "title not added",
    url: 'test.com',
    user: user._id
  }

  await api
    .post('/api/blogs')
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(response.body).toHaveLength(helper.blogs.length)
  expect(contents).not.toContain(newBlog.author)
}, 1000)

test('blog without url is not added', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token
  const newBlog = {
    author: "Tester",
    title: 'url not added',
    user: user._id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.blogs.length)
  expect(contents).not.toContain(newBlog.title)
}, 1000)

})

describe('blog POSTING and DELETING', () => {

test('delete blog', async () => {
  const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token
  const newBlog = {
    title: 'Test adding and deleting a blog 2',
    author: 'Deleter',
    url: 'test.com',
    user: user._id,
    likes: 1,
  }
  const createBlog = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

    const blogId = createBlog.body.id

    const getResponse = await api.get(`/api/blogs/${blogId}`);
    expect(getResponse.body.author).toBe(newBlog.author);

  await api
  .delete(`/api/blogs/${blogId}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(204)
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)
  expect(contents).not.toBe(newBlog.author)

})
})

describe('blog POSTING and UPDATING', () => {
  

  test('update blog', async () => {
    const authUser = await helper.loginUser()

  const user = await User.findOne({username: authUser.body.username})
  const token = authUser.body.token

    const newBlog = {
      title: 'Test adding and updating a blog',
      author: 'Updater',
      url: 'test.com',
      likes: 1,
    }
    const createBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
  
      const blogId = createBlog.body.id
  
      const getResponse = await api.get(`/api/blogs/${blogId}`);
      expect(getResponse.body.author).toBe(newBlog.author);
  
      const newBlogPut = {
        title: 'Test adding and updating a blog',
        author: 'Updated',
        user: user._id,
        url: 'test.com',
        likes: 1,
      }
    await api
    .put(`/api/blogs/${blogId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.author)
    expect(contents).not.toBe(newBlogPut.author)
  
  })

})

})





afterAll(async () => {
  await mongoose.connection.close()
})