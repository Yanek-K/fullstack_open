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

test('it returns blog posts as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('it returns all notes from the database', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialPosts.length);
});

test('it returns a specific note from the database', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((res) => res.title);
  expect(titles).toContain('Blog 2');
});

test('it uses a parameter named "id" for the unique identifier', async () => {
  const response = await api.get('/api/blogs');

  const identifier = response.body.map((res) => res.id);
  expect(identifier).toBeDefined();
});

test('it allows a valid note to be added', async () => {
  const newPost = {
    title: 'Blog 4',
    author: 'Him',
    url: 'https://www.blogforhim.com',
    likes: 32,
  };

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map((res) => res.title);

  expect(response.body).toHaveLength(initialPosts.length + 1);
  expect(contents).toContain('Blog 4');
});

test('blog post without title is not added', async () => {
  const newPost = {
    url: 'http://www.georgiau/blogs/untitled2',
    author: 'Us',
    likes: '',
  };

  await api.post('/api/blogs').send(newPost).expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialPosts.length);
});

test('blog post without url is not added', async () => {
  const newPost = {
    title: 'Blog for them',
    author: 'Us',
    likes: '',
  };

  await api.post('/api/blogs').send(newPost).expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialPosts.length);
});

afterAll(() => {
  mongoose.connection.close();
});
