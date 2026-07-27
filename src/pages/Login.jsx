import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div style={{padding:40}}>
      <h1>Login page</h1>
      <p>This page is the full login route. You can also use the quick modal from the navbar.</p>
      <p>
        <Link to="/">Back home</Link>
      </p>
    </div>
  )
}

export default Login
