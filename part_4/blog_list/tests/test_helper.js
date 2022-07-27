const Blog = require('../models/blog');

const initialPosts = [
  {
    title: 'Blog 1',
    author: 'Me',
    url: 'https://www.blogforme-atme.com',
    likes: 4,
  },
  {
    title: 'Blog 2',
    author: 'You',
    url: 'https://www.blogforyou.com',
    likes: 200,
  },
];

const nonExistingId = async () => {
  const note = new Blog({
    title: 'Blog 2',
    author: 'You',
    url: 'https://www.blogforyou.com',
    likes: 200,
  });
};
