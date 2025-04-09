import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import useGetUserInfo from "../../../hooks/useGetUserInfo";

const ExerciseDetails = ({ onBack, onLastSlideNext }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { injuryImages, user } = useGetUserInfo();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        prevArrow: <CustomPrevArrow currentSlide={currentSlide} onBack={onBack} />,
        nextArrow: <CustomNextArrow
            currentSlide={currentSlide}
            slideCount={injuryImages?.length}
            onLastSlideNext={onLastSlideNext}
        />,
    };

    const token = localStorage.getItem("user_token") || sessionStorage.getItem("user_token");

    return (
        <div className="exercise-details">
            <h2 className="title">Exercise</h2>
            {token ? (
                user?.level !== 0 ? (
                    <>
                        <div className="slider-container">
                            <Slider {...settings}>
                                {injuryImages?.map((injury, index) => (
                                    <div key={index} className="slide">
                                        <img src={injury?.image} alt={`Exercise step ${index + 1}`} className="exercise-image" />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="exercise-description-container">
                            <p className="exercise-description">
                                {injuryImages[currentSlide]?.description}
                            </p>
                        </div>
                    </>
                ) : (<h1 className="warning-msg">You need to rest for a week before starting your exercises</h1>)
            ) : (
                <h1 className="warning-msg">You are need to sign in first to view your exercises</h1>
            )}
        </div>
    );
};

const CustomPrevArrow = ({ onClick, currentSlide, onBack }) => (
    <div
        className="custom-arrow left"
        onClick={() => {
            if (currentSlide === 0) {
                onBack();
            } else {
                onClick();
            }
        }}
    >
        <ArrowLeftIcon />
    </div>
);

const CustomNextArrow = ({ onClick, currentSlide, slideCount, onLastSlideNext }) => (
    <div
        className="custom-arrow right"
        onClick={() => {
            if (currentSlide === slideCount - 1) {
                onLastSlideNext();
            } else {
                onClick();
            }
        }}
    >
        <ArrowRightIcon />
    </div>
);

export default ExerciseDetails;
