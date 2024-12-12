import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

import Login from './components/Login';
import VehicleRegistrationForm from './components/VehicleRegistrationForm';
import NotFoundRedirect from './components/NotFoundRedirect';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Nested routes under Home */}
        <Route path="/" element={<Home />}>
             {/* Independent vehicle registration route */}
             <Route path="/vehicles/register" element={<VehicleRegistrationForm />} />
        </Route>

      

        {/* Handle unmatched routes */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
