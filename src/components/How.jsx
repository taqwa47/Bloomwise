import React from 'react'

const Step = ({num, title, text}) => (
  <div className="how-step">
    <div className="step-num">{num}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
)

const How = () => {
  return (
    <section id="how" className="how-section">
      <div className="section-inner">
        <div className="badge small">AI Process</div>
        <h2>How It Works</h2>
        <p className="section-lead">From a simple photo to a complete diagnosis in under 10 seconds.</p>

        <div className="how-grid">
          <Step num={1} title="Upload Flower Image" text="Take a clear photo and upload it to BloomWise from any device." />
          <Step num={2} title="AI Analysis" text="Our computer vision model analyzes every detail in real time." />
          <Step num={3} title="Disease Detection" text="The AI identifies wilting, discoloration, and disease markers." />
          <Step num={4} title="Treatment Recommendation" text="Receive personalized care advice and treatment protocols." />
        </div>
      </div>
    </section>
  )
}

export default How
