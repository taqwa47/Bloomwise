import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ onClose }) => {
  const nav = useNavigate()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="login-header">
          <div className="logo-circle">🌿</div>
          <div className="brand-title">BloomWise</div>
          <h2>Welcome back 🌷</h2>
          <p className="muted">Sign in to your BloomWise account</p>
        </div>

        <div className="login-body">
          <label>Email Address</label>
          <input placeholder="hello@yourshop.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="forgot">Forgot password?</div>

          <button className="sign-button" onClick={() => { onClose(); nav('/login') }}>Sign In to BloomWise</button>

          <div className="or-sep">or</div>

          <button className="google-button">Continue with Google</button>

          <div className="signup-line">Don't have an account? <span onClick={() => { onClose(); nav('/register') }} className="linkish">Sign up free</span></div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
