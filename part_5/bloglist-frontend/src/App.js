import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog/Blog';
import BlogForm from './components/BlogForm/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import Login from './components/Login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  // Get all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
  }, []);

  // Check if a user is logged in
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
      type: 'success',
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
      .catch(() => {
        setNotificationMessage({
          text: 'Title or Url Missing',
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
      })
      .catch(() => {
        setNotificationMessage({
          text: 'Something went wrong',
          type: 'error',
        });
      });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const deleteBlog = (blogToDelete) => {
    console.log(blogToDelete);
    if (
      window.confirm(
        `Delete ${blogToDelete.title} by ${blogToDelete.author}`
      ) === true
    ) {
      blogService
        .deleteBlog(blogToDelete.id)
        .then(() => {
          setNotificationMessage({
            text: `${blogToDelete.title} was successfully deleted`,
            type: 'success',
          });
          setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        })
        .catch(() => {
          setNotificationMessage({
            text: 'Hmm, something went wrong',
            type: 'error',
          });
        });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <Login handleLogin={handleLogin} username={username} password={password} notificationMessage={notificationMessage} setUsername={setUsername} setPassword={setPassword} />
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {notificationMessage !== null ? (
          <Notification notificationMessage={notificationMessage} />
        ) : null}
        <div>
          <p>{user.name} Logged In!</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable openLabel='New Blog' closeLabel='Cancel' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                increaseLikes={() => increaseLikes(blog.id)}
                deleteBlog={() => deleteBlog(blog)}
                user={user}
              />
            ))}
        </div>
      </div>
    );
  }
};

export default App;
