import PropTypes from 'prop-types';
import BlogInfo from '../BlogInfo/BlogInfo';
import Togglable from '../Togglable/Togglable';

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  return (
    <div className='blogStyle'>
      <ul>
        <li>
          <p>Title:&ensp;</p>
          <p>{blog.title}</p>
        </li>
        <li>
          <p>Author:&ensp;</p>
          <p>{blog.author}</p>
        </li>
      </ul>

      <Togglable openLabel='View More' closeLabel='Hide' >
        <BlogInfo

          blog={blog}
          increaseLikes={increaseLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // increaseLikes: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
