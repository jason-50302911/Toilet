import React from 'react'
import { FaToilet } from 'react-icons/fa';
import toiletImage from './images/toilet.png';

const Header = ({ webTitle }) => {
  return (
    <header className="Header">
        <h1>{webTitle}</h1>
        <img className="headerLogo" src={toiletImage}
              alt="logo" width="84" height="70" title="Logo"/>
    </header>
  )
}

export default Header