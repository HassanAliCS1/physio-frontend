import React from 'react'
import CommonBtn from '../../../components/CommonBtn'
import { assets } from '../../../assets/assets'

const BootomRibbon = () => {
  return (
    <div className='bottom-ribbon-container'>
      <div className="br-details-container">
        <h3 
          className="detail-header"
        >
          Join a world of better health
        </h3>
        <p 
          className="text"
        >
          Take control of your recovery and experience a healthier, more active life. 
          Our app empowers you with tailored rehabilitation programs, expert-guided exercises, 
          and real-time progress tracking — all designed to help you move better and feel stronger. 
        </p>
        <CommonBtn
          text="Sign Up Now"
          path="/signup"
          style={{ color: "rgb(255, 255, 255)", backgroundColor: "rgb(255, 94, 21)" }}
        />
      </div>
      <div className="background-image-container">
        <img 
          src={assets.cardsRound1} 
          alt="background image" 
          className='bg-image' 
        />
        <img 
          src={assets.cardsRound} 
          alt="background image" 
          className='bg-image' 
        />
      </div>
      
    </div>
  )
}

export default BootomRibbon