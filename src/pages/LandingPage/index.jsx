import React from 'react'
import HeroSection from './HeroSection'
import HeaderBar from '../../components/HeaderBar'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import SectionFour from './SectionFour'
import ImageSlider from './ImageSlider'
import SectionSix from './SectionSix'
import BottomRibbon from './BottomRibbon'
import Footer from '../../components/Footer'
import { Grid } from '@mui/material'

const LandingPage = () => {
  return (
    <div className='landing-page-wrapper'>
      <Grid className="header">
        <HeaderBar />
      </Grid>
      <div className="landing-page">
        <div className="landing-page-wrapper">
            <HeroSection />
            <SectionTwo />
            <SectionThree />
        </div>
      </div>
      <SectionFour />
      <div className="landing-page">
        <ImageSlider />
        <SectionSix />
      </div>
      <BottomRibbon />
      <Footer />
    </div>
  )
}

export default LandingPage