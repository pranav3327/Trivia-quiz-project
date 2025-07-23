import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
      const user = users.find(u => u.username === formData.username && u.password === formData.password);
      if (user) {
        localStorage.setItem('quizUser', JSON.stringify(user));
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
    } else {
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #009688 0%, #00bcd4 100%)', position: 'relative', zIndex: 10000 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minWidth: 320, maxWidth: 360 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', background: 'linear-gradient(135deg, #009688 0%, #00bcd4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <div style={{ color: '#c53030', background: '#fed7d7', border: '1px solid #feb2b2', borderRadius: 8, padding: 8, marginBottom: 16, textAlign: 'center', fontWeight: 500 }}>{error}</div>}
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ width: '100%', fontSize: 18, padding: 10, marginBottom: 14, borderRadius: 8, border: '2px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ width: '100%', fontSize: 18, padding: 10, marginBottom: 14, borderRadius: 8, border: '2px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              style={{ width: '100%', fontSize: 18, padding: 10, marginBottom: 14, borderRadius: 8, border: '2px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
            />
          )}
          <button type="submit" style={{ width: '100%', fontSize: 18, padding: '12px 0', marginTop: 8, borderRadius: 8, background: 'linear-gradient(135deg, #009688 0%, #00bcd4 100%)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div style={{ marginTop: 18, textAlign: 'center', fontSize: 15, color: '#607d8b' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={toggleMode} style={{ color: '#009688', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: 700, fontSize: 15, marginLeft: 4 }}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 