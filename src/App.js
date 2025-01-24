import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome'; 
import Play from './components/Play/Play'; 
import Settings from './components/Profile/Settings'
import { AuthContextProvider } from './context/AuthContext';
import ProfilePage from './components/Profile/Profile';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/settings" element={<Settings />} />

          <Route path="/play" element={<Play />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
