import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import  VehicleRegistrationForm  from './components/VehicleRegistrationForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define the Login route */}
        <Route path="/login" element={<Login />} />

        {/* Define the Home route */}
        <Route path="/home" element={<Home />} />

        {/* Redirect all other routes to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
