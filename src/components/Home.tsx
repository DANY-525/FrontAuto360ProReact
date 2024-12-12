import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <h1>Auto360Pro</h1>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/vehicles/register" className="nav-link">addVehicles</Link>
          <Link to="/vehicles/list" className="nav-link">ListVehicles</Link>
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </nav>
      </header>
      
      <main className="content">
        {/* Aquí se renderizan las rutas anidadas */}
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2024 TransApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;