import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Why from '../components/Why'
import How from '../components/How'
import FreeTrial from '../components/FreeTrial'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Why />
        <How />
        <FreeTrial />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default Home
