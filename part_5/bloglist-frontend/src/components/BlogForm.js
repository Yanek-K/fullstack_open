import { useState, useEffect } from 'react';
import React from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newUrl, setNewUrl] = useState();
  const [newLikes, setNewLikes] = useState();

  const handleNewTitle = (e) => setNewTitle(e.target.value);
  const handleNewAuthor = (e) => setNewAuthor(e.target.value);
  const handleNewUrl = (e) => setNewUrl(e.target.value);
  const handleNewLikes = (e) => setNewLikes(e.target.value);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    });
    setNewTitle('');
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
          Author
          <input value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>
          Url
          <input value={newUrl} onChange={handleNewUrl} />
        </div>
        <div>
          Likes
          <input value={newLikes} onChange={handleNewLikes} />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
