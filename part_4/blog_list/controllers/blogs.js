const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

require('dotenv').config();

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id);
  if (post) {
    response.json(post);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
  });

  const savedPost = await blog.save();
  user.blogs = user.blogs.concat(savedPost._id);
  await user.save();
  response.status(201).json(savedPost);
});

blogRouter.delete('/:id', async (request, response) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(request.decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: 'Permission to delete this blog denied' });
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedPost) => {
      response.json(updatedPost);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
