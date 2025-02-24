import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import permissions from '../../API/permissions.json'
import icons from '../../utils/navIcons.js';

import logo from '../../Assets/svg/logo.svg'

const userType = 'office'

export default function Header() {
    const location = useLocation();
    const availableLinks = permissions[userType]?.links || []

  return (
    <div className='header'>
        <Link to={'/'} className='logoLink'>
            <img src={logo} alt="Логотип FastPay в хедере" className='logo'/>
        </Link>
        <nav className="links">
            {availableLinks.map((link) => {
                const isActive = location.pathname === `/${link.key}`; // Проверяем, активна ли страница
                const iconKey = isActive ? `${link.key}Color` : link.key; // Выбираем цветную или базовую иконку
            return (
                <Link key={link.key} to={`/${link.key}`} className={`navLink ${isActive ? 'active' : ''}`}>
                    <img 
                        src={icons[iconKey] || icons[link.key]} 
                        alt={`${link.name} иконка`} 
                        className="navIcon" 
                    />
                    <span>{link.name}</span>
                </Link>
            )})}
        </nav>
        <div className="profileInfoHeader">
            <p>{'user_name'}</p>
            {/* <img src={''} alt="Фотография профиля" /> */}
            <div className="plug"></div>
        </div>
    </div>
  )
}
