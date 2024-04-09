import React from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <header data-testid="header" className='header'>
     <div className="header_logo">
        <img src="https://" alt="logo" />
      </div>

    <nav className='header_nav' data-testid="header_nav">
        <NavLink to="/" className="nav_link">Home</NavLink>
        {isAuthenticated && <NavLink to="/dashboard" className="nav_link">Dashboard</NavLink>}

      
    </nav>
        
    </header>
  )
}

export default Header