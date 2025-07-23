import React from "react";
import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-left">
          <div className="header-avatar">❓</div>
          <Link to="/" className="header-title">Trivia Quiz</Link>
        </div>
        <div className="header-center">
          <Link to="/" className="header-link">Home</Link>
          <Link to="/daily" className="header-link">Daily Challenge</Link>
          <Link to="/leaderboard" className="header-link">Leaderboard</Link>
        </div>
        <div className="header-right">
          {user ? (
            <>
              <span className="header-username">{user.username}</span>
              <button className="header-logout-btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="header-login-btn">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
