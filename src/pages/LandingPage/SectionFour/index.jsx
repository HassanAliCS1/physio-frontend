import React from 'react'
import { assets } from '../../../assets/assets'

const SectionFour = () => {
  return (
    <div className='section-4-container'>
        <div className="details-container">
            <div className="detail-box">
                <img src={assets.heartCircle} alt="heart circle" />
                <p className="number">195</p>
                <p className="number-text">User countries</p>
            </div>
            <div className="detail-box">
                <img src={assets.diamend} alt="heart circle" />
                <p className="number">200+</p>
                <p className="number-text">Valued physicians </p>
            </div>
            <div className="detail-box">
                <img src={assets.cap} alt="heart circle" />
                <p className="number">17M</p>
                <p className="number-text">Happy users</p>
            </div>
        </div>
    </div>
  )
}

export default SectionFour