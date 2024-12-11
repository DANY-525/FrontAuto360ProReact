import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <h1>Auto360Pro</h1>
        </div>
        <nav className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/vehicles" className="nav-link">Vehicles</Link>
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </nav>
      </header>
      
      <main className="content">
        <h2>Welcome to the Transportation App!</h2>
        <p>Your go-to app for managing vehicles and transportation services.</p>
        {/* Add more content as needed */}
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 TransApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;