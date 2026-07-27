import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div style={{padding:40}}>
      <h1>Login (placeholder)</h1>
      <p>This is a placeholder login page.</p>
      <p>
        <Link to="/">Back home</Link>
      </p>
    </div>
  )
}

export default Login
