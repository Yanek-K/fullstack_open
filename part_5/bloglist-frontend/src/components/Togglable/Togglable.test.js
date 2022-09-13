import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable openLabel='View More' closeLabel='Hide'>
        <div className='testDiv'>
          togglable content
        </div>
      </Togglable>
    ).container
  })


  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View More');
    await user.click(button)

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none')

  })

})