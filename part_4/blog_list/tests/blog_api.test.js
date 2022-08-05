const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const User = require('../models/user');
const api = supertest(app);

let token;
beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('salasana', 10);
  const user = new User({
    username: 'root',
    name: 'Master',
    passwordHash,
  });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  await Blog.deleteMany({});
  blogs = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user.id })
  );
  await Blog.insertMany(helper.initialBlogs);
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

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('it returns a specific note from the database', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((res) => res.title);
    expect(titles).toContain('First class tests');
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
      user: '62e9f2f603cc68790db400e7',
    };

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const postsAtEnd = await helper.blogsInDb();
    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = postsAtEnd.map((post) => post.title);
    expect(contents).toContain('Blog 4');
  });

  test('blog post without title is not added', async () => {
    const newPost = {
      url: 'http://www.georgiau/blogs/untitled2',
      author: 'Us',
      likes: '',
    };

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    const postsAtEnd = await helper.blogsInDb();

    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blog post without url is not added', async () => {
    const newPost = {
      title: 'Blog for them',
      author: 'Us',
      likes: '',
    };

    await api
      .post('/api/blogs')
      .send(newPost)
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    const postsAtEnd = await helper.blogsInDb();

    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('adding a blog fails if a token is not provided', async () => {
    const newPost = {
      title: 'This is it',
      author: 'Lisa Dias',
      likes: '12',
    };
    await api.post('/api/blogs').send(newPost).expect(401);
    const postsAtEnd = await helper.blogsInDb();
    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length);
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

  // This should not be working - a user can only delete a post that they have created
  test('it allows a single blog to be deleted by user who created it', async () => {
    const newBlog = {
      title: 'Full Stack',
      author: 'StackMaster',
      url: 'https://www.stack.com/',
      likes: 1,
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`);

    await api.get(`/api/blogs/${result.body.id}`);
    await api
      .delete(`/api/blogs/${result.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const postsAtEnd = await helper.blogsInDb();

    expect(postsAtEnd).toHaveLength(helper.initialBlogs.length);

    const contents = postsAtEnd.map((resp) => resp.title);

    expect(contents).not.toContain(newBlog.title);
  });

  // Should not be working - need to add code to put request
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

    await api.get(`/api/notes/${validNonExistingId}`).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
