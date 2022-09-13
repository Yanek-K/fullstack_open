import React from 'react';

const BlogInfo = ({ blog, increaseLikes, deleteBlog, user }) => {
  const userCanDelete = () => {
    return user.name === blog.user.username;
  };

  return (
    <div>
      Url: {blog.url}
      <br />
      Likes: {blog.likes} <button onClick={increaseLikes}>Like</button>
      <br />
      Submitted By: {blog.user.username}
      <br />
      {userCanDelete() ? <button onClick={deleteBlog}>Delete Blog</button> : ''}
    </div>
  );
};

export default BlogInfo;
