import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

import './index.css';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();
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
      setUser(user);
      blogService.setToken(user.token);

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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      })
      .then(() => {
        setNotificationMessage({
          text: `${blogObject.title} by ${blogObject.author} succesfully added to the blog`,
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

  const increaseLikes = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = {
      ...blog,
      likes: (blog.likes += 1),
      user: blog.user,
    };

    blogService
      .update(changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
        console.log(returnedBlog);
      })
      .catch((error) => {
        setNotificationMessage({
          text: 'Something went wrong',
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
        <p>{user.name} Logged In!</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={() => increaseLikes(blog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
