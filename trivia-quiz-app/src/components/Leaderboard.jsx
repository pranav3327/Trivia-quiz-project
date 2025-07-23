import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container } from '@mui/material';
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
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={5} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
          Top Quiz Scores
        </Typography>
        {attempts.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ my: 4 }}>
            No attempts yet. Try a quiz!
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Quiz Topic</TableCell>
                  <TableCell>Your Score</TableCell>
                  <TableCell>Out of</TableCell>
                  <TableCell>Attempted On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attempts.map((attempt, index) => (
                  <TableRow key={index}>
                    <TableCell>{categoryNames[attempt.category] || attempt.category}</TableCell>
                    <TableCell>{attempt.score}</TableCell>
                    <TableCell>{attempt.total}</TableCell>
                    <TableCell>{new Date(attempt.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="outlined" color="primary" onClick={handleBack}>Back</Button>
          <Button variant="contained" color="error" onClick={handleReset}>Reset Leaderboard</Button>
        </Stack>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Reset Leaderboard</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to clear the leaderboard? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
            <Button onClick={confirmReset} color="error" variant="contained">Reset</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Leaderboard;