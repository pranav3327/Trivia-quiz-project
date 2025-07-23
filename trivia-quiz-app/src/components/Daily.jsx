/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const Daily = ({ username }) => {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    if (!username) return;

    const savedData = localStorage.getItem(`dailyQuestion_${username}`);
    const savedTime = localStorage.getItem(`dailyTimestamp_${username}`);
    const savedAnswered = localStorage.getItem(`dailyAnswered_${username}`);

    const now = Date.now();

    if (savedData && savedTime) {
      const then = parseInt(savedTime, 10);
      const hoursPassed = (now - then) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setQuestion(JSON.parse(savedData));
        setHasAnswered(savedAnswered === 'true');
        return;
      }
    }

    // Fetch new question if 24+ hours passed or none saved
    fetchNewQuestion();
  }, [username]);

  const decodeHtml = html => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  const fetchNewQuestion = async () => {
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await res.json();
      const q = data.results[0];

      const processed = {
        question: decodeHtml(q.question),
        correct: decodeHtml(q.correct_answer),
        options: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml))
      };

      setQuestion(processed);
      setHasAnswered(false);
      localStorage.setItem(`dailyQuestion_${username}`, JSON.stringify(processed));
      localStorage.setItem(`dailyTimestamp_${username}`, Date.now().toString());
      localStorage.setItem(`dailyAnswered_${username}`, 'false');
    } catch (error) {
      // Optionally show error
    }
  };

  const handleSelect = opt => {
    if (hasAnswered) return;

    setSelected(opt);
    setHasAnswered(true);
    localStorage.setItem(`dailyAnswered_${username}`, 'true');

    if (opt === question.correct) {
      setFeedback('Correct! 🎉');
    } else {
      setFeedback(`Incorrect. The correct answer was: ${question.correct}`);
    }
  };

  if (!question) return (
    <div className="daily-loading">
      <h3>Loading daily challenge...</h3>
    </div>
  );

  return (
    <div className="daily-container">
      <div className="daily-box">
        <h2 className="daily-title">Daily Challenge</h2>
        <div className="daily-question">{question.question}</div>
        <div className="daily-options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              className={`daily-option-btn${selected ? (opt === question.correct ? ' correct' : (opt === selected ? ' incorrect' : '')) : ''}`}
              onClick={() => !hasAnswered && handleSelect(opt)}
              disabled={hasAnswered}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`daily-feedback${feedback.startsWith('Correct') ? ' success' : ' error'}`}>{feedback}</div>
        )}
        {hasAnswered && (
          <div className="daily-answered-note">You've already answered today's challenge.</div>
        )}
      </div>
    </div>
  );
};

export default Daily;
