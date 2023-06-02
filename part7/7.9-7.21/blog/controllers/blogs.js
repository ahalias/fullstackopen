const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comments')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1}).populate('comments', {body: 1, id: 1})
        response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {

    if (!request.token) {
      return response.status(401).json({ error: 'token not valid' })

    }
  
  const user = request.user

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
        response.status(201).json(savedBlog)
  })

  blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('comments', { body: 1});
    response.json(blog)
  })


  blogRouter.put('/:id', async (request, response) => {

    const blog = {
      title: request.body.title, 
      author: request.body.author,
      url: request.body.url,
      user: request.body.user,
      likes: request.body.likes
    } 
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(blog)
  })

  blogRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
      return response.status(401).json({ error: 'token not valid' })

    }
  const user = request.user

    const blog = await Blog.findById(request.params.id);
    if (user && blog && user._id.toString() === blog.user.toString()) {
     await Blog.findByIdAndDelete(request.params.id)
     response.status(204).send()
    } else {
      response.status(401).json({"error": "only author allowed to delete blog"})
    }
  })

  blogRouter.get('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('comments', { body: 1});
    response.json(blog.comments)
  })

  blogRouter.post('/:id/comments', async (request, response) => {
    const commentNew = new Comment({blog: request.body.id, body: request.body.body})
    const comment = await commentNew.save()
    const blog = await Blog.findById(request.params.id)
    blog.comments = await blog.comments.concat(comment._id)
    await blog.save()
    response.json(comment)
  })

  module.exports = blogRouter