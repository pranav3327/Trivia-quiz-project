// src/components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { value: '11', label: 'Movies', icon: '🎬' },
  { value: '12', label: 'Music', icon: '🎵' },
  { value: '14', label: 'Television', icon: '📺' },
  { value: '15', label: 'Video Games', icon: '🎮' },
  { value: '31', label: 'Anime & Manga', icon: '📚' },
  { value: '32', label: 'Cartoons', icon: '🦸' },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (selectedCategory) {
      navigate(`/quiz?category=${selectedCategory}`);
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <div className="home-avatar">Q</div>
        <h1 className="home-title">Trivia Quiz</h1>
        <p className="home-subtitle">Test your knowledge across fun categories!</p>
        <div className="home-form-group">
          <label htmlFor="category" className="home-label">Category</label>
          <select
            id="category"
            className="home-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="home-start-btn"
          onClick={handleStart}
          disabled={!selectedCategory}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;