import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import rooms from '../data/rooms';

const Rooms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom data-aos="fade-up">
        Our Rooms
      </Typography>
      <Typography 
        variant="h6" 
        textAlign="center" 
        color="text.secondary" 
        sx={{ mb: 6 }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Choose from our selection of comfortable and well-furnished rooms
      </Typography>
      <Grid container spacing={4}>
        {rooms.map((room, index) => (
          <Grid item xs={12} md={6} lg={4} key={room.id} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
            <Box className="hover-lift" sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 1,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 3,
              }
            }}>
              <Box sx={{
                height: 240,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }} onClick={() => handleRoomClick(room.id)}>
                <img
                  src={room.images[0].url}
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </Box>
              <Box sx={{ p: 3 }} onClick={() => handleRoomClick(room.id)} style={{ cursor: 'pointer' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {room.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {room.description.slice(0, 100)}...
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{room.price} / night
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Rooms; 