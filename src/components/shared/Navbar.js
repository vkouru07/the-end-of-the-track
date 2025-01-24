import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='backdrop'>
        <h1>THE END OF THE TRACK</h1>
        <Link to="/">homme</Link>
        <Link to="/profile">profile</Link>
        <Link to="/play">play</Link>
      </div>
      <div className='user-cont'>
        <Link className='username'>username</Link>
        <img
            src="https://via.placeholder.com/100" // Replace with user avatar
            alt="Profile Avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;
