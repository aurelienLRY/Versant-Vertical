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
      {isAuthenticated && <NavLink to="/dashboard" className="nav_link">Mon espace</NavLink>}
        <NavLink to="/" className="nav_link">Accueil</NavLink>
        <NavLink to="/activities" className="nav_link">Activités</NavLink>
        <NavLink to="/book" className="nav_link">Réserver</NavLink>
        <NavLink to="/contact" className="nav_link">contact</NavLink>
        

      
    </nav>
        
    </header>
  )
}

export default Header