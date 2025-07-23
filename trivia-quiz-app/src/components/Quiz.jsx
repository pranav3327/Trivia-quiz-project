// src/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (category) {
      fetchQuestions(category);
    }
  }, [category]);

  useEffect(() => {
    if (questions.length > 0) {
      const q = questions[currentQuestion];
      const options = [...q.incorrectAnswers, q.correctAnswer]
        .sort(() => Math.random() - 0.5)
        .map(decodeHtml);
      setCurrentOptions(options);
      setSelected(null);
    }
  }, [questions, currentQuestion]);

  const fetchQuestions = async (category) => {
    try {
      setIsLoading(true);
      setError('');
      const res = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`
      );
      const data = await res.json();

      if (data.response_code === 0) {
        const formatted = data.results.map((q) => ({
          question: decodeHtml(q.question),
          correctAnswer: decodeHtml(q.correct_answer),
          incorrectAnswers: q.incorrect_answers.map(decodeHtml),
        }));
        setQuestions(formatted);
      } else {
        setError('No questions found for this category.');
      }
      setIsLoading(false);
    } catch {
      setError('Failed to load quiz. Please try again.');
      setIsLoading(false);
    }
  };

  const handleAnswer = (selectedOpt) => {
    setSelected(selectedOpt);
    setTimeout(() => {
      if (selectedOpt === questions[currentQuestion].correctAnswer) {
        setScore((prev) => prev + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setTimeLeft(30);
      } else {
        handleFinish();
      }
    }, 700);
  };

  const handleFinish = () => {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
    attempts.push({
      timestamp: new Date().toISOString(),
      score,
      total: questions.length,
      category,
    });
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    navigate("/results", { state: { score, total: questions.length, category } });
  };

  if (isLoading) return (
    <div className="quiz-container loading-state">
      <div className="loading-spinner"></div>
      <h3>Loading quiz...</h3>
    </div>
  );
  if (error) return <div className="quiz-container"><div className="error-message">{error}</div></div>;
  if (!questions.length) return <div className="quiz-container"><div className="error-message">No questions found.</div></div>;

  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="quiz-stats">
          <span className="timer">Time Left: {timeLeft}s</span>
          <span className="score">Score: {score}/{questions.length}</span>
        </div>
      </div>
      <div className="question-section">
        <h2>Question {currentQuestion + 1}</h2>
        <div className="question">{q.question}</div>
      </div>
      <div className="options">
        {currentOptions.map((opt, i) => (
          <button
            key={i}
            className={`option-btn${selected ? (opt === q.correctAnswer ? ' correct' : (opt === selected ? ' incorrect' : '')) : ''}`}
            onClick={() => !selected && handleAnswer(opt)}
            disabled={!!selected}
          >
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
