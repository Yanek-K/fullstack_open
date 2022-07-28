const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialPosts[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialPosts[1]);
  await blogObject.save();
});

describe('When there is initially some posts saved', () => {
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
});

describe('Addition of a new post', () => {
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
});

describe('Viewing a specific post', () => {
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

  test('it allows the likes of a post to be updated', async () => {
    const postsAtStart = await helper.blogsInDb();
    const postToUpdate = postsAtStart[0];

    const updatedPost = await api
      .put(`/api/blogs/${postToUpdate.id}`)
      .send({ ...postToUpdate, likes: 201 })
      .expect(200);

    expect(updatedPost.body.likes).toEqual(201);
  });

  test('It fails with a statuscode 404 if post does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();

    console.log(validNonExistingId);

    await api.get(`/api/notes/${validNonExistingId}`).expect(404);
  });
});

describe('When there is initially one user in the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('It allows creation of a new user', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'peterpan',
      name: 'Peter Pan',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
