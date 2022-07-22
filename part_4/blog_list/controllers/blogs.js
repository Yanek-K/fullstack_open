const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/home', (request, response) => {
  response.send('<h2>You have made it this far<h2>');
});

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post('/', (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
