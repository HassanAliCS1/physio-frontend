import React from 'react';
import CustomButton from '../../../components/CustomButton';
import { Grid } from '@mui/material';

const Exercise = ({ onStart }) => {
    return (
        <div className="exercise-container">
            <h2 className="title">Exercise</h2>
            <div className='description-container'>
                <p className="description">
                Welcome! Before starting your exercise, please make sure you're in a safe and 
                comfortable space. These routines are designed for individuals aged 18 to 30 
                who are able-bodied. If you have any health conditions that affect your ability 
                to exercise, please consult your doctor before proceeding. 
                
                <br></br>
                <br></br>
                Move at your own pace 
                and listen to your body — if anything feels painful or uncomfortable, stop 
                immediately. These exercises are here to support your recovery, so stay 
                consistent and stay positive. Let’s get started on your journey to feeling 
                stronger and healthier!
                </p>
                <Grid xs={12} className='button-wrapper'>
                    <CustomButton 
                    type="submit" 
                    className="create-button" 
                    onClick={onStart}
                    width="120px"
                    >
                    start
                    </CustomButton>
                </Grid>
            </div>
        </div>
    )
}

export default Exercise;