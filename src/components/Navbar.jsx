import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const nav = useNavigate()

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
          <button className="login" onClick={() => nav('/login')}>Login</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
