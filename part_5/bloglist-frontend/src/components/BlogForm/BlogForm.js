import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLikes, setNewLikes] = useState('');

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
    setNewAuthor('');
    setNewUrl('');
    setNewLikes('');

  };

  return (
    <div>
      <form onSubmit={addBlog} defaultValue={''}>
        <div>
          <input value={newTitle} onChange={handleNewTitle} placeholder='Title' />
        </div>
        <div>
          <input value={newAuthor} onChange={handleNewAuthor} placeholder='Author' />
        </div>
        <div>
          <input value={newUrl} onChange={handleNewUrl} placeholder='Url' />
        </div>
        <div>
          <input value={newLikes} onChange={handleNewLikes} placeholder='Likes' />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
