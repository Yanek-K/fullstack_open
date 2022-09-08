import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog'

test('renders a blog title and author only', () => {
  const blogPost = {
    title: 'Blog 2',
    author: 'Peter Pan',
    url: 'www.peterspan.com',
    likes: 0,
    user: {
      name: 'Peter',
      username: 'root'
    },
  }

  const user = {
    name: 'Peter'
  }

  render(<Blog blog={blogPost} user={user} />)


  const element = screen.getByText('Peter Pan')
  expect(element).toBeDefined();

})
