import React from 'react'

const Testimonial = ({quote, name, role}) => (
  <div className="test-card">
    <div className="stars">★★★★★</div>
    <p className="quote">{quote}</p>
    <div className="author">{name} <span className="muted">{role}</span></div>
  </div>
)

const Testimonials = () => {
  return (
    <section id="testimonials" className="test-section">
      <div className="section-inner">
        <div className="badge">Customer Stories</div>
        <h2>Loved by Flower Shop Owners</h2>

        <div className="test-grid">
          <Testimonial quote={'BloomWise caught a bacterial infection in my roses before it spread.'} name={'Sophie Laurent'} role={'Owner, Maison des Fleurs · Paris'} />
          <Testimonial quote={'The demand prediction is uncanny. Zero waste, maximum profit.'} name={'Marco Fontaine'} role={'Director, Bloom & Blossom Co. · London'} />
          <Testimonial quote={'From inventory to analytics, BloomWise handles everything.'} name={'Amara Osei'} role={'Founder, Petal & Stem Studio · Toronto'} />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
