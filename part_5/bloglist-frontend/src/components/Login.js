import React from 'react'
import Notification from './Notification'

const Login = ({ handleLogin, username, password, notificationMessage, setUsername, setPassword }) => {

  return (
    <div>
      <h2>Login to the Blog</h2>
      {notificationMessage !== null ? (
        <Notification notificationMessage={notificationMessage} />
      ) : null}

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login