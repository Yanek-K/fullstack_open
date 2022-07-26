const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialPosts[0]);
  await blogObject.save();
  blogObject = new Blog(initialPosts[1]);
  await blogObject.save();
});

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialPosts.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((res) => res.title);
  expect(titles).toContain('Blog 2');
});

afterAll(() => {
  mongoose.connection.close();
});
