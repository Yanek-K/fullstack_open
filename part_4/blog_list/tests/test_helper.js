const Blog = require('../models/blog');
const User = require('../models/user');

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
  const blog = new Blog({
    title: 'Blog 2',
    author: 'You',
    url: 'https://www.blogforyou.com',
    likes: 200,
  });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const posts = await Blog.find({});
  return posts.map((post) => post.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initialPosts, nonExistingId, blogsInDb, usersInDb };
