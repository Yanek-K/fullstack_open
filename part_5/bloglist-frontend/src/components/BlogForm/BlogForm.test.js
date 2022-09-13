import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import axiosMock from 'axios'

jest.mock('axios')

test('<BlogForm /> submits the correct details when a blog is created', async () => {
  const createBlog = jest.fn();


  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('Save')



  fireEvent.change(title, {
    target: { value: 'The Way' }
  })
  fireEvent.change(author, {
    target: { value: 'John' }
  })
  fireEvent.change(url, {
    target: { value: 'www.john.com' }
  })

  axiosMock.post.mockResolvedValueOnce({ status: 201 })
  fireEvent.submit(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('The Way')
})