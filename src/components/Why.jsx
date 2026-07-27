import React from 'react'

const FeatureCard = ({title, children}) => (
  <div className="feature-card">
    <div className="icon-placeholder"></div>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
)

const Why = () => {
  return (
    <section id="why" className="why-section">
      <div className="section-inner">
        <div className="badge">Platform Capabilities</div>
        <h2>Why BloomWise?</h2>
        <p className="section-lead">Everything your flower shop needs, powered by advanced artificial intelligence.</p>

        <div className="features-grid">
          <FeatureCard title="AI Flower Diagnosis">Detect flower diseases and wilting from uploaded images with 98% accuracy.</FeatureCard>
          <FeatureCard title="Inventory Management">Track flower stock in real-time and receive intelligent low-stock alerts.</FeatureCard>
          <FeatureCard title="Sales Analytics">Monitor business performance with interactive charts and granular insights.</FeatureCard>
          <FeatureCard title="Demand Prediction">Predict seasonal demand using AI-powered forecasting to minimize waste.</FeatureCard>
        </div>
      </div>
    </section>
  )
}

export default Why
