// src/components/Results.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Paper, Stack, Container } from '@mui/material';

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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={5} sx={{ p: 5, borderRadius: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
            Quiz Results
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <Typography variant="h2" fontWeight={800} color="secondary" gutterBottom>
              {score} / {total}
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center">
              {getMessage()}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/')}>Go Home</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Results;
