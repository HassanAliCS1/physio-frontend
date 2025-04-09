import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const SignUpButton = ({ text, path }) => {
  return (
    <div className='signup-btn-container'>
      <NavLink to={path}>
        <Button
          className='signup-btn'
        >
          {text}
        </Button>
      </NavLink>
    </div>
  )
}

export default SignUpButton