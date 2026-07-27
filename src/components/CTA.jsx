import React from 'react'
import { useNavigate } from 'react-router-dom'

const CTA = () => {
  const nav = useNavigate()
  return (
    <section className="cta-section">
      <div className="section-inner cta-inner">
        <h2>Ready to Transform Your Flower Shop?</h2>
        <p className="section-lead">Join 250+ flower shops already using BloomWise to manage smarter and grow faster.</p>
        <button className="btn-cta" onClick={() => nav('/register')}>Start Using BloomWise →</button>
      </div>
    </section>
  )
}

export default CTA
