import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog'

describe('It renders the correct info by default', () => {
  let container;
  beforeEach(() => {

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
    container = render(<Blog blog={blogPost} user={user} />).container
  })

  test('it renders a blog title', () => {
    const title = screen.getByText('Blog 2');
    expect(title).toBeDefined();
  })

  test('it renders a blog author', () => {
    const author = screen.getByText('Peter Pan')
    expect(author).toBeDefined();
  })

  test('it hides the url and likes by default', () => {
    const url = container.querySelector('.togglableContent')
    expect(url).toHaveStyle('display: none')
  })
})
