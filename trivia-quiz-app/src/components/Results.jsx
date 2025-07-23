// src/components/Results.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score = 0, total = 0 } = state || {};

  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return 'Perfect score! 🎉';
    if (percentage >= 80) return 'Great job! 💪';
    if (percentage >= 50) return 'Not bad, keep practicing!';
    return 'Better luck next time!';
  };

  return (
    <div className="results-container">
      <div className="results-box">
        <h2 className="results-title">Quiz Results</h2>
        <div className="results-score-section">
          <div className="results-score">{score} / {total}</div>
          <div className="results-message">{getMessage()}</div>
        </div>
        <button className="results-home-btn" onClick={() => navigate('/')}>Go Home</button>
      </div>
    </div>
  );
};

export default Results;
