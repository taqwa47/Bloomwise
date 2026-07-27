import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import LoginModal from './LoginModal'

const Navbar = () => {
  const nav = useNavigate()
  const [openLogin, setOpenLogin] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="bw-nav">
      <div className="nav-inner">
        <div className="brand" onClick={() => nav('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-container">
            <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="#1C3A27" />
              <path d="M24 12C20 12 16.5 15.5 15.5 20.5C15 22.5 15.5 24 17 24.5C18 24.8 19.5 24.5 21 23C23.5 20.5 25 16 25 13.5C25 12.5 24.5 12 24 12Z" fill="#FAF9F5" />
              <path d="M15.5 20.5C14.5 21.5 12 23 11 23.5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M18.5 17.5C20.5 15.5 22.5 14.5 24 14" stroke="#1C3A27" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <div className="title">BloomWise</div>
        </div>

        <nav className="nav-links">
          <button onClick={() => scrollTo('hero')}>Home</button>
          <button onClick={() => scrollTo('why')}>Why BloomWise</button>
          <button onClick={() => scrollTo('how')}>How It Works</button>
          <button onClick={() => scrollTo('testimonials')}>Testimonials</button>
        </nav>

        <div className="nav-actions">
          <button className="try-free-btn" onClick={() => nav('/diagnosis')}>
            <Zap size={14} fill="currentColor" className="icon-bolt" />
            <span>Try Free</span>
          </button>
          <button className="login-btn" onClick={() => setOpenLogin(true)}>Login</button>
        </div>
      </div>

      {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
    </header>
  )
}

export default Navbar


