import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryNames = {
  11: 'Movies',
  12: 'Music',
  14: 'Television',
  15: 'Video Games',
  31: 'Anime & Manga',
  32: 'Cartoons',
};

const Leaderboard = ({ onBack }) => {
  const [attempts, setAttempts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    const sorted = stored.sort((a, b) => b.score - a.score);
    setAttempts(sorted);
  }, []);

  const handleReset = () => {
    setOpenDialog(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('quizAttempts');
    setAttempts([]);
    setOpenDialog(false);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-box">
        <h2 className="leaderboard-title">Top Quiz Scores</h2>
        {attempts.length === 0 ? (
          <p className="leaderboard-empty">No attempts yet. Try a quiz!</p>
        ) : (
          <div className="leaderboard-table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Quiz Topic</th>
                  <th>Your Score</th>
                  <th>Out of</th>
                  <th>Attempted On</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, index) => (
                  <tr key={index}>
                    <td>{categoryNames[attempt.category] || attempt.category}</td>
                    <td>{attempt.score}</td>
                    <td>{attempt.total}</td>
                    <td>{new Date(attempt.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="leaderboard-actions">
          <button className="leaderboard-back-btn" onClick={handleBack}>Back</button>
          <button className="leaderboard-reset-btn" onClick={handleReset}>Reset Leaderboard</button>
        </div>
        {openDialog && (
          <div className="leaderboard-modal-overlay">
            <div className="leaderboard-modal">
              <h3>Reset Leaderboard</h3>
              <p>Are you sure you want to clear the leaderboard? This action cannot be undone.</p>
              <div className="leaderboard-modal-actions">
                <button onClick={() => setOpenDialog(false)}>Cancel</button>
                <button className="leaderboard-modal-reset-btn" onClick={confirmReset}>Reset</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;