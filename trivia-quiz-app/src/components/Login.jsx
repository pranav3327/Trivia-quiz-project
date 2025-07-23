import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, TextField, Stack, Alert, Container } from '@mui/material';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('quizUser');
    if (user) {
      onLogin(JSON.parse(user));
    }
  }, [onLogin]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
      const user = users.find(u => u.username === formData.username && u.password === formData.password);
      if (user) {
        localStorage.setItem('quizUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Register logic
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
      const existingUser = users.find(u => u.username === formData.username);
      if (existingUser) {
        setError('Username already exists');
        return;
      }
      const newUser = {
        id: Date.now(),
        username: formData.username,
        password: formData.password,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('quizUsers', JSON.stringify(users));
      localStorage.setItem('quizUser', JSON.stringify(newUser));
      onLogin(newUser);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: '100%' }}>
        <Typography variant="h4" fontWeight={700} color="primary" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                fullWidth
              />
            )}
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ fontWeight: 600 }}>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Stack>
        </Box>
        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button onClick={toggleMode} color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 