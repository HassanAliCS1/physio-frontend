import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { assets } from '../../../assets/assets';
import CommonBtn from '../../../components/CommonBtn';

const SectionSix = () => {
  return (
    <div className='section-six-container'>
        <div className="s-six-text-container">
            <h2 className="s-six-header">All the cool <span className='bottum-line'>features</span></h2>
            <p className="list-text">
            Our app offers a complete solution for knee and shoulder MSK rehabilitation, 
            combining personalized rehab plans tailored to your recovery stage with real-time 
            progress tracking to monitor your improvements. Whether you're at home or on 
            the go, you can access expert-approved exercises designed to enhance strength, 
            flexibility, and mobility — no clinic visits required. Stay motivated with helpful 
            reminders and insights, ensuring you stay consistent on your journey to recovery. 
            It's everything you need to move better, all in one place.
            </p>
        </div>
        <div className="s-six-image-container">
            <div className="image-container">
                <img 
                    src={assets.sectionSixImage} 
                    alt="Section image" 
                    className="section-image" 
                />
            </div>
            <div className="section-cards">
                <div className="card">
                    <p className="tag tag-2">Popular</p>
                    <h4 className="card-header">Strengthening Phase — Rebuild Strength & Stability</h4>
                    <p 
                        className="card-text"
                    >
                         This phase introduces progressive resistance training and targeted strengthening exercises. 
                    </p>
                    <CommonBtn 
                        text="Begin Rehab" 
                        path="/" 
                        style={{ color: "rgb(37, 99, 235)", border: "2px solid rgb(37, 99, 235)", width: "100%", maxWidth: "200px" }} 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SectionSix