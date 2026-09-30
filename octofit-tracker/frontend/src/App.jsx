import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-brand">
              OctoFit Tracker
            </Link>
            <ul className="nav-menu">
              <li><Link to="/users" className="nav-link">Users</Link></li>
              <li><Link to="/activities" className="nav-link">Activities</Link></li>
              <li><Link to="/workouts" className="nav-link">Workouts</Link></li>
              <li><Link to="/teams" className="nav-link">Teams</Link></li>
              <li><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to OctoFit Tracker</h1>
      <p>Your multi-tier fitness tracking application</p>
      <p>Built with React 19, Express, and MongoDB</p>
    </div>
  );
}

export default App;
