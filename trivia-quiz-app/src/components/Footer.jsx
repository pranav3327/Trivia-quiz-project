import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 6, boxShadow: 1 }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 Fun Quiz App. All rights reserved.<br />
          Powered by Open Trivia Database
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;