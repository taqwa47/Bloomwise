import React from 'react'
import heroImg from '../assets/hero.png'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Scan, ArrowRight, Activity } from 'lucide-react'

const Hero = () => {
  const nav = useNavigate()

  return (
    <section id="hero" className="hero-section">
      {/* Left Content Side */}
      <div className="hero-content">
        <div className="eyebrow-badge">
          <Sparkles size={14} className="icon-spark" />
          <span>AI-Powered Flower Intelligence</span>
        </div>
        
        <h1 className="hero-title">
          Smart Flower Shop<br />Management<br />Powered by <span className="serif-italics">AI</span>
        </h1>
        
        <p className="lead-text">
          Manage your flower shop effortlessly with intelligent inventory management, flower disease detection, sales analytics, and AI-powered demand prediction.
        </p>
        
        <div className="hero-cta-group">
          <button className="btn-primary-diag" onClick={() => nav('/diagnosis')}>
            <Scan size={18} className="icon-btn-left" />
            <span>Try Free Diagnosis</span>
          </button>
          
          <button className="btn-outline-start" onClick={() => nav('/register')}>
            <span>Get Started</span>
            <ArrowRight size={18} className="icon-btn-right" />
          </button>
        </div>
        
        <ul className="features-list">
          <li>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-svg">
              <circle cx="9" cy="9" r="9" fill="#1C3A27" />
              <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>AI Powered</span>
          </li>
          <li>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-svg">
              <circle cx="9" cy="9" r="9" fill="#1C3A27" />
              <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>98% Detection Accuracy</span>
          </li>
          <li>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="check-svg">
              <circle cx="9" cy="9" r="9" fill="#1C3A27" />
              <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Built for Flower Shops</span>
          </li>
        </ul>
      </div>

      {/* Right Visual Side */}
      <div className="hero-visual">
        <div className="visual-outer-ring">
          {/* Radial Light Glow */}
          <div className="glow-effect"></div>
          
          {/* Circular Masked Bouquet */}
          <div className="circular-bouquet-wrap">
            <img src={heroImg} alt="Fresh flower bouquet" className="bouquet-img" />
            
            {/* AI Scanning Overlay Badge */}
            <div className="ai-scanning-badge">
              <span className="pulse-dot"></span>
              <span>AI Scanning...</span>
            </div>
          </div>

          {/* Widget 1: Health Score (Top Left) */}
          <div className="widget-card widget-health">
            <div className="widget-header">
              <Activity size={16} className="text-primary-green" />
              <span className="widget-label">Health Score</span>
            </div>
            <div className="widget-body">
              <span className="health-value">87</span>
              <span className="health-total">/100</span>
            </div>
            <div className="widget-footer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.5L4.5 7.5L9.5 2.5" stroke="#1C3A27" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 10C8.5 10 9.5 8 9.5 6" stroke="#1C3A27" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
              </svg>
              <span className="condition-status text-green">↑ Good condition</span>
            </div>
          </div>

          {/* Widget 2: Disease Detection (Top Right) */}
          <div className="widget-card widget-disease">
            <div className="widget-header">
              <span className="widget-title">Disease Detection</span>
            </div>
            <div className="progress-section">
              <div className="progress-info">
                <span className="label">Wilting</span>
                <span className="percent text-orange">23%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-fill fill-orange" style={{ width: '23%' }}></div>
              </div>
            </div>
            <div className="progress-section">
              <div className="progress-info">
                <span className="label">Healthy</span>
                <span className="percent text-green">77%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-fill fill-green" style={{ width: '77%' }}></div>
              </div>
            </div>
            {/* Background leaf SVG */}
            <svg className="watermark-leaf" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.1">
              <path d="M12 2C8 6 6 9.5 6 13C6 16.5 8.5 19 12 19C15.5 19 18 16.5 18 13C18 9.5 16 6 12 2Z" fill="#1C3A27" />
            </svg>
          </div>

          {/* Widget 3: Weekly Revenue (Bottom Left) */}
          <div className="widget-card widget-revenue">
            <div className="widget-header flex-between">
              <span className="widget-label">Weekly Revenue</span>
              <span className="revenue-increase">+12%</span>
            </div>
            <div className="widget-body">
              <span className="revenue-value">$4,820</span>
            </div>
            <div className="widget-chart">
              <div className="chart-bar" style={{ height: '30%' }}></div>
              <div className="chart-bar" style={{ height: '40%' }}></div>
              <div className="chart-bar" style={{ height: '25%' }}></div>
              <div className="chart-bar" style={{ height: '45%' }}></div>
              <div className="chart-bar" style={{ height: '35%' }}></div>
              <div className="chart-bar active" style={{ height: '65%' }}></div>
              <div className="chart-bar" style={{ height: '30%' }}></div>
            </div>
          </div>

          {/* Widget 4: Low Stock Alert (Bottom Right) */}
          <div className="widget-card widget-stock">
            <div className="alert-content-wrapper">
              <div className="alert-icon-container">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" fill="#FFF2EC" stroke="#F07E48" strokeWidth="1.5" />
                  <path d="M10 6V11" stroke="#F07E48" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="10" cy="14" r="1" fill="#F07E48" />
                </svg>
              </div>
              <div className="alert-details">
                <span className="alert-title">Low Stock Alert</span>
                <span className="alert-desc">Red Roses: 12 left</span>
                <a href="#reorder" className="reorder-link">Reorder now →</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero

