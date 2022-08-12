import BlogInfo from './BlogInfo';
import Togglable from './Togglable';
import '../index.css';

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

export default Blog;
