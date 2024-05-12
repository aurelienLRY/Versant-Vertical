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
        <h1>Occitanie Evasion</h1>
      </div>

    <nav className='header_nav' data-testid="header_nav">
      {isAuthenticated && <NavLink to="/dashboard" className="nav_link">Dashboard</NavLink>}
      {isAuthenticated && <NavLink to="/dashboard/customer-session" className="nav_link">Les réservations</NavLink>}
      {isAuthenticated && <NavLink to="/dashboard/sessions" className="nav_link">Sessions</NavLink>}
      {isAuthenticated && <NavLink to="/dashboard/activities" className="nav_link">Mes activités</NavLink>}
      {isAuthenticated && <NavLink to="/dashboard/spot" className="nav_link">Mes lieux</NavLink>}

    </nav>
        
    </header>
  )
}

export default Header