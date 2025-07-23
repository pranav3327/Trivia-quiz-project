import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Stack } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

function Header({ user, onLogout }) {
  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ mb: 2 }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
            <QuizIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="primary" component={Link} to="/" sx={{ textDecoration: 'none' }}>
            Trivia Quiz
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button component={Link} to="/" color="primary" sx={{ fontWeight: 600 }}>Home</Button>
          <Button component={Link} to="/daily" color="primary" sx={{ fontWeight: 600 }}>Daily Challenge</Button>
          <Button component={Link} to="/leaderboard" color="primary" sx={{ fontWeight: 600 }}>Leaderboard</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }}>{user.username}</Typography>
              <Button variant="outlined" color="error" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
