const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

require('dotenv').config();

const api = supertest(app);

describe('When there is initially one user in the DB and want to create a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('it allows creation of a new user', async () => {
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

  test('it does not allow an invalid username (less than 3 characters)', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Ap',
      name: 'Ap',
      password: 'salainen',
    };

    try {
      await api.post('/api/users').send(newUser);
    } catch (e) {
      expect(e.message)
        .toEqual(
          'User validation failed: username: Path `username` (`z`) is shorter than the minimum allowed length (3).'
        )
        .expect(400);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('it does not allow a blank username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: '',
      name: 'Ap',
      password: 'salainen',
    };

    try {
      await api.post('/api/users').send(newUser);
    } catch (e) {
      expect(e.message)
        .toEqual(
          'User validation failed: username: Path `username` is required.'
        )
        .expect(400);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('it does not allow a non-unique username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'salainen',
    };

    try {
      await api.post('/api/users').send(newUser);
    } catch (e) {
      expect(e.message).toEqual('Username already exists').expect(422);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('it does not allow an invalid password (less than 3 characters)', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Apple',
      name: 'Apple',
      password: 'sa',
    };

    try {
      await api.post('/api/users').send(newUser);
    } catch (e) {
      expect(e.message)
        .toEqual('Password must contain at least 3 characters')
        .expect(400);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('it does not allow a blank password', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Apple',
      name: 'Apple',
      password: '',
    };

    try {
      await api.post('/api/users').send(newUser);
    } catch (e) {
      expect(e.message)
        .toEqual('Password must contain at least 3 characters')
        .expect(400);
    }

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
