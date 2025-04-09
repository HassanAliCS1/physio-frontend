import React, { useEffect, useState } from 'react'
import SignUpButton from '../SignUpButton';
import LoginButton from '../LoginButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from '@mui/icons-material/Logout';
import CommonBtn from '../CommonBtn';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const HeaderBar = () => {
  const [logout, setLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const { user, loading } = useGetUserInfo();
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  
  const handlePopUp = () => {
    setLogout(!logout);
  }

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("user_token");
    sessionStorage.removeItem("user_token");
    localStorage.removeItem("user_email");
    localStorage.setItem("remember_me", false);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("user_token") || sessionStorage.getItem("user_token");

    if (token) {
      setIsLogged(true);
    }
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <header className='header-wrapper'>
      <div className="header-container">
        <NavLink to='/'>
          <div className="logo-container">
            <img
              className='header-logo'
              src="/logo.svg" alt="logo"
            />
            <h2 className="logo-text">Physiotherapy Online</h2>
          </div>
        </NavLink>
        <div className="login-container">
          {!isLogged ? (
            <div className="menu-icons">
              <MenuIcon
                className="menu-icon"
                onClick={() => setOpen(!open)}
              />
            </div>
          ) : (
            <></>
          )}
          {!isLogged ? (
            <div className={`menu ${open ? 'open' : ''}`}>
              <div className="close-btn">
                <CloseIcon
                  className="close-icon"
                  onClick={() => setOpen(!open)}
                />
              </div>
              <LoginButton text="Log in" path="/sign-in" />
              <SignUpButton text="Sign Up Now" path="/signup" />
            </div>
          ) : (
            <div className="user-container">
              <div
                onClick={handlePopUp}
                className="user-icon"
              >
                <Avatar className="user-avatar">
                  {getInitials(user?.first_name, user?.last_name)}
                </Avatar>
                <KeyboardArrowDownIcon className="dropdown-icon" />
              </div>
              <div className={`log-out-section ${!logout ? 'hide' : ''}`}>
                <div className="user">
                  <Avatar className="user-avatar">
                    {getInitials(user?.first_name, user?.last_name)}
                  </Avatar>
                  <span className="user-name">{user?.first_name} {user?.last_name}</span>
                </div>
                <div  className="dashboard-link" onClick={handleDashboard}>
                <Typography className='dashboard-text'>Go to Dashboard</Typography>
                </div>
                <div onClick={() => handleLogout()}>
                  <CommonBtn 
                    text="Log out"
                    style={{
                      width: "176px",
                      border: "2px solid tomato",
                      backgroundColor: "rgb(255, 94, 21)",
                      color: "rgb(255, 255, 255)"
                    }}
                    icon={<LogoutIcon />}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderBar