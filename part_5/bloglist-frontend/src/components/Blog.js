import { useEffect, useState } from 'react';
import BlogInfo from './BlogInfo';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
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
      <Togglable buttonLabel='View More'>
        <BlogInfo blog={blog} />
      </Togglable>
    </div>
  );
};

export default Blog;
