import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const CommonBtn = ({ text, path, style, icon }) => {
  return (
    <div className='common-btn-container'>
      <NavLink to={path}>
        <Button
          className='common-btn'
          style={style}
        >
          {
            icon ? 
              <div className="icon">{icon}</div> 
              : <></>
          }
          {text}
        </Button>
      </NavLink>
    </div>
  )
}

export default CommonBtn