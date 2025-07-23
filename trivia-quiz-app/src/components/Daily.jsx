/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Stack, Alert, Container } from '@mui/material';

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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" gap={2}>
      <Typography variant="h6">Loading daily challenge...</Typography>
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
            Daily Challenge
          </Typography>
          <Typography variant="h6" align="center">{question.question}</Typography>
          <Stack spacing={2}>
            {question.options.map((opt, i) => (
              <Button
                key={i}
                variant={selected ? (opt === question.correct ? 'contained' : 'outlined') : 'outlined'}
                color={selected ? (opt === question.correct ? 'success' : (opt === selected ? 'error' : 'primary')) : 'primary'}
                size="large"
                fullWidth
                sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
                onClick={() => !hasAnswered && handleSelect(opt)}
                disabled={hasAnswered}
              >
                {opt}
              </Button>
            ))}
          </Stack>
          {feedback && <Alert severity={feedback.startsWith('Correct') ? 'success' : 'error'}>{feedback}</Alert>}
          {hasAnswered && <Typography color="text.secondary" align="center">You've already answered today's challenge.</Typography>}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Daily;
