import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { assets } from '../../../assets/assets';
import CommonBtn from '../../../components/CommonBtn';

const SectionTwo = () => {
  return (
    <div className='section-two-container'>
        <div className="s-two-text-container">
            <h2 className="s-two-header">An <span className='bottum-line'>all-in-one</span> app that makes it easier</h2>
            <ul className="section-lists">
                <li 
                    className="section-list"
                >
                    <CheckIcon />
                    <span className='list-text'>
                    Personalized Recovery Plans: Tailored physiotherapy programs for knee and shoulder injuries based on your specific needs.
                    </span>
                </li>
                <li 
                    className="section-list"
                >
                    <CheckIcon />
                    <span className='list-text'>
                    Expert-Designed Exercises: Guided routines crafted to improve mobility, strength, and flexibility.
                    </span>
                </li>
                <li 
                    className="section-list"
                >
                    <CheckIcon />
                    <span className='list-text'>
                    Progress Tracking & Insights: Monitor your recovery journey with real-time feedback and personalized recommendations.
                    </span>
                </li>
            </ul>
        </div>
        <div className="s-two-image-container">
            <div className="image-container">
                <img 
                    src={assets.sectionTwoImage} 
                    alt="Section image" 
                    className="section-image" 
                />
            </div>
            <div className="section-cards">
                <div className="card">
                    <p className="tag tag-1">Featured</p>
                    <h4 className="card-header">Acute Phase — Reduce Pain & Inflammation</h4>
                    <p 
                        className="card-text"
                    >
                        In the early stages of injury, the focus is on managing pain and minimizing swelling.
                    </p>
                    <CommonBtn 
                        text="Begin Rehab" 
                        path="/" 
                        style={{ color: "rgb(37, 99, 235)", border: "2px solid rgb(37, 99, 235)", width: "100%", maxWidth: "200px" }} 
                    />
                </div>
                <div className="card">
                    <p className="tag tag-2">Popular</p>
                    <h4 className="card-header">Strengthening Phase — Rebuild Strength & Stability</h4>
                    <p 
                        className="card-text"
                    >
                       Once pain and swelling decrease, it’s time to rebuild muscle strength and improve joint stability
                    </p>
                    <CommonBtn 
                        text="Begin Rehab" 
                        path="/" 
                        style={{ color: "rgb(37, 99, 235)", border: "2px solid rgb(37, 99, 235)", width: "100%", maxWidth: "200px" }} 
                    />
                </div>
                <div className="card">
                    <p className="tag tag-3">New</p>
                    <h4 className="card-header">Functional Phase — Restore Performance & Prevent Reinjury</h4>
                    <p 
                        className="card-text"
                    >
                        In the final stage, the focus is on returning to daily activities, sports, or work. 
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

export default SectionTwo