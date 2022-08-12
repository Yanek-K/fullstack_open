import React from 'react';

const BlogInfo = ({ blog, increaseLikes }) => {
  return (
    <div>
      Url: {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={increaseLikes}>Like</button>
      <br />
      Submitted By: {blog.user.username}
    </div>
  );
};

export default BlogInfo;
