import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; // CSS file for styling
import GoogleButton from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import Navbar from '../shared/Navbar';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {googleSignIn, anonymousSignin} = UserAuth(); 

  const handleLogin = (e) => {
    alert ("not implemented");
    // e.preventDefault();
    // console.log('Logging in:', email, password);
    // // Add login API call here
    // navigate('/profile'); // Navigate to profile on success
  };

  const handleGoogleAuth = async () => {
    try {
        await googleSignIn(); 
    } catch (error) {
        alert (error); 
    }
  };

  const handleGuestAccess = async () => {
    try {
      await anonymousSignin(); 
    } catch (error) {
      alert (error); 
    }
  };

  return (
    <div>
    <div className="welcome-container">
      <Navbar></Navbar>
      <div className="welcome-illustration">
        <img src="your-image-path.jpg" alt="Illustration" />
      </div>

      <div className="welcome-content">
        <div className="welcome-prompt">
          <h1>WELCOME!</h1>
          <h3>login to play users online</h3>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="username/email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-group">
            <button type="submit" className="login-button">log in</button>
            <button
              type="button"
              className="signup-button"
              onClick={() => navigate('/signup')} // TODO 
            >
              sign up
            </button>
          </div>
        </form>
        <div className="alt-button-group">
          <button className="google-button" onClick={handleGoogleAuth}>
            continue with
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
          </button>
          <button className="guest-button" onClick={handleGuestAccess}>
            continue as guest
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Welcome;