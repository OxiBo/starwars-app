// NB - normally I would use some library like boot strap or MUI for handle collapsible menu but I wanted to demonstrate my skill to make it function from scratch
// TODO - map over links
// TODO - simplify responsive menu functioning
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as StarWarsLogo } from '../styles/images/star-wars.svg';
import Icon from './Icon';
// https://codesandbox.io/s/q89onw1kqq?file=/src/index.js:161-169
// import iconSet from '../selection.json';
// import { iconList } from 'react-icomoon';

/**
 * Hook that alerts clicks outside of the passed ref and closes menu on click
 */
function useOutsideAlerter(ref, setAnchor) {
  useEffect(() => {
    /**
     * close menu if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('[aria-controls="menu-button"]')
      ) {
        setAnchor(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setAnchor]);
}

export default function MainNavigation() {
  const [openMenu, setOpenMenu] = useState(false);
  // handle click outside menu to close menu
  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, setOpenMenu);

  // watch window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setOpenMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //   console.log(iconList(iconSet));
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleMenuLinkClick = () => {
    setOpenMenu(false);
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <StarWarsLogo />
        </NavLink>
      </div>
      <div className="navbar__menu">
        <button
          aria-controls="menu-button"
          className="navbar__menu-button"
          onClick={handleToggleMenu}
        >
          {openMenu ? (
            <Icon
              size={20}
              icon="cancel"
              className="navbar__menu-button-icon"
            />
          ) : (
            <Icon size={30} icon="menu" className="navbar__menu-button-icon" />
          )}
        </button>
      </div>
      <ul
        ref={menuRef}
        className={`navbar__list ${
          openMenu ? 'navbar__list-open' : 'navbar__list-close'
        }`}
      >
        <li onClick={handleMenuLinkClick} className="navbar__list-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar__list-item-link ${isActive ? 'active' : undefined}`
            }
          >
            Main
          </NavLink>
        </li>
        <li onClick={handleMenuLinkClick} className="navbar__list-item">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              `navbar__list-item-link ${isActive ? 'active' : undefined}`
            }
          >
            Characters
          </NavLink>
        </li>
        <li onClick={handleMenuLinkClick} className="navbar__list-item">
          <NavLink
            to="/films"
            className={({ isActive }) =>
              `navbar__list-item-link ${isActive ? 'active' : undefined}`
            }
          >
            All Films
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
