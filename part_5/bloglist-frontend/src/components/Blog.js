import { useEffect, useState } from 'react';
import BlogInfo from './BlogInfo';
import Togglable from './Togglable';

const Blog = ({ blog, increaseLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    marginBottom: 5,
    marginTop: 10,
  };
  return (
    <div style={blogStyle}>
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
