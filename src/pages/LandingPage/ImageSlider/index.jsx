import React, { useRef } from 'react'
import { content } from '../../../assets/assets';
import { ArrowRightAltOutlined } from '@mui/icons-material';

const ImageSlider = () => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -450, behavior: 'smooth' });
        }
    };
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

  return (
    <div className='image-slider'>
        <div className="slider-header">
            <h3>What everyone says</h3>
            <div className="arrow-btn top-btn">
                <div 
                    onClick={scrollLeft}
                    className="scroll-button left"
                > 
                    <ArrowRightAltOutlined className='arrow-icon arrow-left' />
                </div>
                <div 
                    onClick={scrollRight}
                    className="scroll-button right"
                > 
                    <ArrowRightAltOutlined className='arrow-icon' />
                </div>
            </div>
        </div>

        <div className="slider-wrapper">
            <div
                ref={sliderRef}
                className="slider-container"
            >
                {content.map((item, index) => (
                    <div key={index} className="card">
                        <img src={item} alt='image' className="card-image" />
                    </div>
                ))}
            </div>
        </div>
        <div className="slider-header bottum-btn">
            <div className="arrow-btn">
                <div 
                    onClick={scrollLeft}
                    className="scroll-button left"
                > 
                    <ArrowRightAltOutlined className='arrow-icon arrow-left' />
                </div>
                <div 
                    onClick={scrollRight}
                    className="scroll-button right"
                > 
                    <ArrowRightAltOutlined className='arrow-icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImageSlider