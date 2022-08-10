import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newUrl, setNewUrl] = useState();
  const [newLikes, setNewLikes] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      setPassword('');
    } catch (error) {
      setNotificationMessage({
        text: 'Wrong Username or Password',
        type: 'error',
      });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setNotificationMessage({
      text: 'Succesfully Logged Out',
      type: 'Success',
    });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleNewTitle = (e) => setNewTitle(e.target.value);
  const handleNewAuthor = (e) => setNewAuthor(e.target.value);
  const handleNewUrl = (e) => setNewUrl(e.target.value);
  const handleNewLikes = (e) => setNewLikes(e.target.value);

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .then(() => {
        setNotificationMessage({
          text: `${newTitle} by ${newAuthor} succesfully added to the blog`,
          type: 'success',
        });
      })
      .catch((error) => {
        setNotificationMessage({
          text: `Title or Url Missing`,
          type: 'error',
        });
      });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to the Blog</h2>
        {notificationMessage !== null ? (
          <Notification notificationMessage={notificationMessage} />
        ) : null}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {notificationMessage !== null ? (
        <Notification notificationMessage={notificationMessage} />
      ) : null}
      <div>
        <p>{username} Logged In!</p>
        <form onSubmit={addBlog}>
          <div>
            Title
            <input value={newTitle} onChange={handleNewTitle} />
          </div>
          <div>
            Author
            <input value={newAuthor} onChange={handleNewAuthor} />
          </div>
          <div>
            Url
            <input value={newUrl} onChange={handleNewUrl} />
          </div>
          <div>
            Likes
            <input value={newLikes} onChange={handleNewLikes} />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
