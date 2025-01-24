import React, { useState } from 'react';
import "./Play.css";
import Navbar from '../shared/Navbar';

const Play = () => {
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState('');

  const handleMove = () => {
    setMoves([...moves, currentMove]);
    setCurrentMove('');
  };

  return (
    <div className="play-container">
      <Navbar></Navbar>

      <div className="left-col">
        <div className='left-col-cont'>
          <p>stuff</p>
          <button>resign</button>
        </div>
      </div>

      <div className="right-col">
        <div className='opp-col'>
          <div>
            <img
                  src="https://via.placeholder.com/100" // Replace with user avatar
                  alt="Profile Avatar"
                  className="profile-avatar"
              />
              <h3>#:##</h3>
          </div>
        </div>
        <div className='game-col'>
          <div className='game'>
            game
          </div>
          <div className='game-button-group'>
            <button>button 1</button>
            <button>button 2</button>
          </div>
        </div>
        <div className='user-col'>
          <div>
            <img
                src="https://via.placeholder.com/100" // Replace with user avatar
                alt="Profile Avatar"
                className="profile-avatar"
            />
            <h3>#:##</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
