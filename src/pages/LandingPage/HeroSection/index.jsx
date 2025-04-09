import React from 'react'
import CommonBtn from '../../../components/CommonBtn'
import { assets } from '../../../assets/assets'

const HeroSection = () => {
  return (
    <div className='hero-section'>
      <div className="hero-text-container">
        <h1 className="hero-text"><span className='bottum-line'>Rehab</span> Worldwide</h1>
        <div className='paragraph-wrapper'>
          <p
            className="hero-subtext"
          >
            Personalized physiotherapy at your fingertips. Our tailored recovery programs for 
            knee and shoulder injuries adapt to your unique needs, helping you regain strength, 
            flexibility, and confidence. Whether you're recovering from a sports injury or 
            managing chronic pain, we provide expert-guided exercises—all sourced from and 
            aligned with NHS guidelines—along with progress tracking to support your journey 
            every step of the way.
          </p>
          <p
            className="hero-subtext"
          >
            Start your recovery today — because every move matters.
          </p>
        </div>
        <CommonBtn
          text="Sign Up Now"
          path="/signup"
          style={{ color: "rgb(255, 255, 255)", backgroundColor: "rgb(255, 94, 21)" }}
        />
      </div>
      <div className="hero-image-container">
        <img
          src={assets.heroImage}
          alt="Hero image"
          className='hero-image'
        />
      </div>
    </div>
  )
}

export default HeroSection