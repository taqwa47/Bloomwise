import React from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ onClose }) => {
  const nav = useNavigate()

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="login-header">
          <div className="login-logo-row">
            <div className="logo-circle">
              <svg width="20" height="20" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12C20 12 16.5 15.5 15.5 20.5C15 22.5 15.5 24 17 24.5C18 24.8 19.5 24.5 21 23C23.5 20.5 25 16 25 13.5C25 12.5 24.5 12 24 12Z" fill="#FAF9F5" />
                <path d="M15.5 20.5C14.5 21.5 12 23 11 23.5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18.5 17.5C20.5 15.5 22.5 14.5 24 14" stroke="#486D58" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <span className="brand-title">BloomWise</span>
          </div>
          <h2>Welcome back 🌹</h2>
          <p className="muted">Sign in to your BloomWise account</p>
        </div>

        <div className="login-body">
          <label>Email Address</label>
          <input placeholder="hello@yourshop.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="forgot">Forgot password?</div>

          <button className="sign-button" onClick={() => { onClose(); nav('/dashboard') }}>Sign In to BloomWise</button>

          <div className="or-sep"><span>or</span></div>

          <button className="google-button">
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="signup-line">Don't have an account? <span onClick={() => { onClose(); nav('/register') }} className="linkish">Sign up free</span></div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LoginModal
