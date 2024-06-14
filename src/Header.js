import React from 'react'
import { FaToilet } from 'react-icons/fa';

const Header = ({ webTitle }) => {
  return (
    <header className="Header">
        <h1>{webTitle}</h1>
        <FaToilet/>
    </header>
  )
}

export default Header