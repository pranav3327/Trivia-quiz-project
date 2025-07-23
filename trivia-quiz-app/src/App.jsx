// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Daily from './components/Daily';
import Login from './components/Login';
import './App.css';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // teal
      contrastText: '#fff',
    },
    secondary: {
      main: '#00bcd4', // cyan
      contrastText: '#fff',
    },
    background: {
      default: '#e0f7fa', // light cyan
      paper: '#ffffff',
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#e53935',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('quizUser');
    setUser(null);
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header user={user} onLogout={handleLogout} />
        <Box flexGrow={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/daily" element={<Daily username={user?.username} />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
