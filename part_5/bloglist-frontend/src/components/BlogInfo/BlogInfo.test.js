import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogInfo from './BlogInfo';

describe('<BlogInfo />', () => {
  test('clicking the like button twice, increases the likes by two', async () => {
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

    const userName = {
      name: 'Peter'
    }

    const mockHandler = jest.fn();
    render(
      <BlogInfo blog={blogPost} user={userName} increaseLikes={mockHandler} />
    )
    const user = userEvent.setup();
    const button = screen.getByText('Like')
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})