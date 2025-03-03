import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import permissions from '../../API/permissions.json';
import icons from '../../utils/navIcons.js';

import IconWrapper from '../IconWrapper/IconWrapper.jsx';

import logo from '../../Assets/svg/logo.svg';
import profile from '../../Assets/svg/profile.svg'
import burgerOpen from '../../Assets/svg/burgerMenu.svg';
import burgerClose from '../../Assets/svg/burgerMenuClose.svg';


const BurgerIcon = ({ isOpen, onClick }) => {
  return (
    <div className="burgerIconContainer" onClick={onClick}>
      <img
        src={burgerOpen}
        alt="Закрытое меню"
        className={`burgerImg ${isOpen ? 'fadeOut' : 'fadeIn'}`}
        style={{ transform: 'scale(1.1)' }}
      />
      <img
        src={burgerClose}
        alt="Открытое меню"
        className={`burgerImg ${isOpen ? 'fadeIn' : 'fadeOut'}`}
      />
    </div>
  );
};

const Header = ({ windowWidth }) => {
  const userType = 'admin';
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const availableLinks = useMemo(() => {
    const links = permissions[userType]?.links || [];

    return windowWidth >= 577
        ? links.filter(link => link.key !== 'profile') // Исключаем профиль
        : links; // Оставляем как есть

  }, [userType, windowWidth]);

  const headerRef = useRef(null);
  const navRef = useRef(null);

  const renderLink = (link) => {
    const isActive = location.pathname === `/${link.key}`;
    const iconKey = isActive ? `${link.key}Color` : link.key;
    const iconSrc = icons[iconKey] || icons[link.key] || '';

    return (
      <Link
        key={link.key}
        to={`/${link.key}`}
        className={`navLink ${isActive ? 'active' : ''}`}
        aria-label={link.name}
      >
        <img
          src={iconSrc}
          alt={`${link.name} иконка`}
          className="navIcon"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span>{link.name}</span>
      </Link>
    );
  };

  const toggleMenu = () => {
    if (!isAnimated) setIsAnimated(true);
    setOpen(!open);
  };

  // Устанавливаем начальное положение под header
  useEffect(() => {
    if (headerRef.current && navRef.current && isAnimated) {
      const headerHeight = headerRef.current.offsetHeight;
      if (!open) {
        navRef.current.style.top = `${headerHeight}px`; // Скрываем под header
      }
    }
  }, [open, isAnimated]);

  // Обработка клика вне header
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <div className="headerContainer">
      <div className={`header ${open ? 'open' : ''}`} ref={headerRef}>
        <Link to="/dashboard" className="logoLink">
          <img src={logo} alt="Логотип FastPay в хедере" className="logo" />
        </Link>
        {windowWidth >= 1750 && (
          <nav className="links">{availableLinks.map(renderLink)}</nav>
        )}
        <div className="rightSideHeader">
          {windowWidth > 576 && (
            <Link className="profileInfoHeader" to='/profile'>
              <p className={location.pathname === '/profile' ? 'active' : ''}>Профиль</p>
              <IconWrapper height='36px'>
                <img src={profile} alt="Иконка профиля в хедере" />
              </IconWrapper>
            </Link>
          )}
          {windowWidth < 1750 && (
            <BurgerIcon isOpen={open} onClick={toggleMenu} />
          )}
        </div>
      </div>
        <div
          className="overlay"
          onClick={() => setOpen(false)}
          style={{pointerEvents: open ? '' : 'none', background: open ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.0)'}}
        />
      <div
        className={`navContainerMobile ${isAnimated ? (open ? 'toShow' : 'toHide') : ''}`}
        ref={navRef}
        style={{ top: isAnimated ? undefined : `${headerRef.current?.offsetHeight || 80}px`, display: isAnimated ? undefined : 'none' }}
      >
        <nav className="links">
          {availableLinks.map(renderLink)}
        </nav>
      </div>
    </div>
  );
};

export default Header;