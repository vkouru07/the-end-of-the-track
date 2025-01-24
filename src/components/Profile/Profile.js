import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Profile.css";
import Navbar from "../shared/Navbar"; 
import PlaySelection from "../shared/PlaySelection";

const ProfilePage = () => {
  const [playSelectionVisible, setPlaySelectionVisible] = useState(false);
  const hidePlaySelection = () => setPlaySelectionVisible(false);
  // TODO
  const  handlePlay = () => {
    setPlaySelectionVisible (true);
    // alert ("not implemented");
  }
  const handleDeleteAccount = () => {
    alert ("not implemented");
  }
  const handleStats = () => {
    alert ("not implemented");
  }
  const handleSettings = () => {
    alert ("not implemented");
  }

  return (
    <div className="profile-page">
      <Navbar></Navbar>

      <div className="left-column">
        <img
            src="https://via.placeholder.com/100" // Replace with user avatar
            alt="Profile Avatar"
            className="profile-avatar"
        />
        <ul className="profile-links">
          <li>
            <Link onClick={handleStats}>stats/history</Link>
          </li>
          <br></br>
          <li>
            <Link onClick={handleSettings}>settings</Link>
          </li>
          <li>
            <button onClick={handleDeleteAccount}>delete account</button>
          </li>
        </ul>
      </div>
      <div className="mid-column">
        <div className="profile-head">
          <h1>username</h1>
          <div className="winlose-cont">
            <h3>win: <span>##</span></h3>
            <h3>lose: <span>##</span></h3>
          </div>
        </div>
        <div className="detail">

        </div>
      </div>
      <div className="right-column">
        <button onClick={handlePlay}>PLAY</button>
      </div>


      {playSelectionVisible && 
        <div className="play-selection-box">
          <PlaySelection onCancel={hidePlaySelection}></PlaySelection>
        </div>
      }

    </div>
  );
};

export default ProfilePage;
