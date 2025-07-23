// src/components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Select, MenuItem, InputLabel, FormControl, Container, Paper, Avatar, Grid } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TvIcon from '@mui/icons-material/Tv';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AnimationIcon from '@mui/icons-material/Animation';

const categories = [
  { value: '11', label: 'Movies', icon: <MovieIcon /> },
  { value: '12', label: 'Music', icon: <MusicNoteIcon /> },
  { value: '14', label: 'Television', icon: <TvIcon /> },
  { value: '15', label: 'Video Games', icon: <SportsEsportsIcon /> },
  { value: '31', label: 'Anime & Manga', icon: <AutoStoriesIcon /> },
  { value: '32', label: 'Cartoons', icon: <AnimationIcon /> },
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', mb: 1 }}>
            <Typography variant="h4" color="white">Q</Typography>
          </Avatar>
          <Typography variant="h3" fontWeight={700} gutterBottom align="center">
            Trivia Quiz
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            Test your knowledge across fun categories!
          </Typography>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {cat.icon}
                    {cat.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, borderRadius: 2, fontWeight: 600, width: '100%' }}
            onClick={handleStart}
            disabled={!selectedCategory}
          >
            Start Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;