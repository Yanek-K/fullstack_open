import PropTypes from 'prop-types';
import BlogInfo from '../BlogInfo';
import Togglable from '../Togglable';

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  return (
    <div className='blogStyle'>
      Title: {blog.title}
      <br />
      Author: {blog.author}
      <Togglable openLabel='View More' closeLabel='Hide'>
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
