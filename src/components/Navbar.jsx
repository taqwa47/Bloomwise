import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
        <div className="brand">
          <div className="logo">🌿</div>
          <div className="title">BloomWise</div>
        </div>

        <nav className="nav-links">
          <button onClick={() => scrollTo('hero')}>Home</button>
          <button onClick={() => scrollTo('why')}>Why BloomWise</button>
          <button onClick={() => scrollTo('how')}>How It Works</button>
          <button onClick={() => scrollTo('testimonials')}>Testimonials</button>
        </nav>

        <div className="nav-actions">
          <button className="try-free" onClick={() => nav('/diagnosis')}>Try Free</button>
          <button className="login" onClick={() => setOpenLogin(true)}>Login</button>
        </div>
      </div>

      {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
    </header>
  )
}

export default Navbar
