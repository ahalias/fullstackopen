const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
  })

  blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  })

  blogRouter.put('/:id', async (request, response) => {
    const blog = {
      title: request.body.title, 
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(blog)
  })

  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send()
  })

  module.exports = blogRouter