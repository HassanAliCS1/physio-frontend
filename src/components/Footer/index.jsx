import { AccessibilityRounded } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-inner-container">
            <div className="logo-container">
                <h2 className="logo">Physiotherapy</h2>
            </div>
            <div className="footer-links-wrapper">
                <div className="links-wrapper">
                    <h4 className="links-header">Resources</h4>
                    <ul className="list">
                        <li className='link'><Link to="/" >Help center</Link></li>
                        <li className='link'><Link to="/" >Blog</Link></li>
                        <li className='link'><Link to="/" >FAQs</Link></li>
                    </ul>
                </div>
                <div className="links-wrapper">
                    <h4 className="links-header">Support</h4>
                    <ul className="list">
                        <li className='link'><Link to="/" >Contact us</Link></li>
                        <li className='link'><Link to="/" >Developers</Link></li>
                        <li className='link'><Link to="/" >Documentation</Link></li>
                    </ul>
                </div>
                <div className="links-wrapper">
                    <h4 className="links-header">Company</h4>
                    <ul className="list">
                        <li className='link'><Link to="/" >About</Link></li>
                        <li className='link'><Link to="/" >Press</Link></li>
                        <li className='link'><Link to="/" >Events</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-bottum-container">
            <p className="footer-text">&copy; {new Date().getFullYear()} Physiotherapy. All rights reserved.</p>
            <div className="bottum-links">
                <ul>
                    <li>
                        <Link to="/">Terms</Link>
                    </li>
                    <li>
                        <Link to="/">Privacy</Link>
                    </li>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                </ul>
                <Link to="/" className='footer-access'><AccessibilityRounded className='icon' /></Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer