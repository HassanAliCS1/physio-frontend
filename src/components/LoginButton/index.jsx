import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginButton = ({ text, path }) => {
  return (
    <div className='login-btn-container'>
        <NavLink to={path}>
            <Button
                className='login-btn'
            >
                {text}
            </Button>
        </NavLink>
    </div>
  )
}

export default LoginButton