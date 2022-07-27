const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialPosts[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialPosts[1]);
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

  expect(response.body).toHaveLength(helper.initialPosts.length);
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

  const postsAtEnd = await helper.blogsInDb();
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1);

  const contents = postsAtEnd.map((post) => post.title);
  expect(contents).toContain('Blog 4');
});

test('blog post without title is not added', async () => {
  const newPost = {
    url: 'http://www.georgiau/blogs/untitled2',
    author: 'Us',
    likes: '',
  };

  await api.post('/api/blogs').send(newPost).expect(400);

  const postsAtEnd = await helper.blogsInDb();

  expect(postsAtEnd).toHaveLength(helper.initialPosts.length);
});

test('blog post without url is not added', async () => {
  const newPost = {
    title: 'Blog for them',
    author: 'Us',
    likes: '',
  };

  await api.post('/api/blogs').send(newPost).expect(400);

  const postsAtEnd = await helper.blogsInDb();

  expect(postsAtEnd).toHaveLength(helper.initialPosts.length);
});

test('it allows a single blog to be retrieved', async () => {
  const postsAtStart = await helper.blogsInDb();
  const postToFind = postsAtStart[0];

  const resultPost = await api
    .get(`/api/blogs/${postToFind.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedPost = JSON.parse(JSON.stringify(postToFind));
  expect(resultPost.body).toEqual(processedPost);
});

test('it allows a single blog to be deleted', async () => {
  const postsAtStart = await helper.blogsInDb();
  const postToDelete = postsAtStart[0];

  await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

  const postsAtEnd = await helper.blogsInDb();

  expect(postsAtEnd).toHaveLength(helper.initialPosts.length - 1);

  const contents = postsAtEnd.map((resp) => resp.title);

  expect(contents).not.toContain(postToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
