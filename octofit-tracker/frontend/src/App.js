import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src={process.env.PUBLIC_URL + '/octofitapp-small.png'} 
              alt="OctoFit Logo" 
              className="navbar-logo"
            />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="bg-dark text-light py-3 mt-auto">
        <div className="container text-center">
          <small>&copy; 2025 OctoFit Tracker. Built for Mergington High School.</small>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div>
      <div className="hero-section text-center">
        <h1 className="display-4">Welcome to OctoFit Tracker</h1>
        <p className="lead mb-4">Track your fitness activities and compete with your team!</p>
        <Link to="/activities" className="btn btn-light btn-lg me-2">Get Started</Link>
        <Link to="/leaderboard" className="btn btn-outline-light btn-lg">View Leaderboard</Link>
      </div>
      
      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <span className="me-2">📊</span>Activities
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Track Your Progress</h5>
              <p className="card-text flex-grow-1">Log and track your daily fitness activities including running, cycling, swimming, and more.</p>
              <Link to="/activities" className="btn btn-primary">View Activities</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <span className="me-2">🏆</span>Leaderboard
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Compete & Win</h5>
              <p className="card-text flex-grow-1">See how you rank against other fitness enthusiasts and climb to the top of the leaderboard.</p>
              <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">
              <span className="me-2">👥</span>Teams
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Join Forces</h5>
              <p className="card-text flex-grow-1">Join a team, collaborate with teammates, and compete together for team achievements.</p>
              <Link to="/teams" className="btn btn-primary">View Teams</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <span className="me-2">👤</span>Users
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Community Members</h5>
              <p className="card-text flex-grow-1">Browse our community of fitness enthusiasts and connect with like-minded athletes.</p>
              <Link to="/users" className="btn btn-primary">View Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <span className="me-2">💪</span>Workouts
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Workout Library</h5>
              <p className="card-text flex-grow-1">Explore our collection of workouts designed to help you achieve your fitness goals.</p>
              <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
