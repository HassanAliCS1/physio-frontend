import React from 'react'
import { assets } from '../../../assets/assets'

const SectionThree = () => {
    return (
        <div className='section-two-container section-three'>
            <div className="s-two-image-container">
                <div className="image-container">
                    <img
                        src={assets.sectionThreeImage}
                        alt="Section image"
                        className="section-image"
                    />
                </div>
            </div>
            <div className="s-two-text-container">
                <h2 
                    className="s-two-header"
                >
                    Trusted by <span className='plane'>
                    <img src={assets.plane} alt="plane" />
                    Everyone, </span>Recommended by Experts.
                </h2>
                <p 
                    className="list-text"
                >
                    Whether you're an athlete, a busy professional, or someone recovering 
                    from an everyday injury, our app is designed for all. Backed by expert 
                    physiotherapists, our personalized recovery programs ensure you receive 
                    the right care at the right time — helping you get back to doing what 
                    you love, faster and stronger. Would you like any adjustments to 
                    fit the tone of your app better?
                </p>
            </div>
        </div>
    )
}

export default SectionThree