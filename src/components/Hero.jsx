import React from 'react'
import heroImg from '../assets/hero.png'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const nav = useNavigate()

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="eyebrow">AI-Powered Flower Intelligence</div>
        <h1>Smart Flower Shop Management
          <br />Powered by AI</h1>
        <p className="lead">Manage your flower shop effortlessly with intelligent inventory management, flower disease detection, sales analytics, and AI-powered demand prediction.</p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => nav('/diagnosis')}>Try Free Diagnosis</button>
          <button className="btn-outline" onClick={() => nav('/register')}>Get Started →</button>
        </div>
        <ul className="features-row">
          <li>AI Powered</li>
          <li>98% Detection Accuracy</li>
          <li>Built for Flower Shops</li>
        </ul>
      </div>
      <div className="hero-visual">
        <div className="image-wrap">
          <img src={heroImg} alt="flowers" />
        </div>
      </div>
    </section>
  )
}

export default Hero
