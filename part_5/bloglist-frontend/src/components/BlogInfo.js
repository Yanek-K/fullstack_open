import React from 'react';

const BlogInfo = ({ blog }) => {
  return (
    <div>
      Url: {blog.url}
      <br />
      Likes: {blog.likes}
      <br />
      Submitted By: {blog.user.username}
    </div>
  );
};

export default BlogInfo;
