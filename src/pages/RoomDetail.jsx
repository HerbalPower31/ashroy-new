import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, Chip, Divider } from '@mui/material';
import rooms from '../data/rooms';
import BedIcon from '@mui/icons-material/Bed';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === parseInt(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!room) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Room not found</Typography>
        <Button variant="contained" onClick={() => navigate('/rooms')}>
          Back to Rooms
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Box
            component="img"
            src={room.image}
            alt={room.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Typography variant="h3" gutterBottom>
            {room.name}
          </Typography>
          <Typography variant="h5" color="primary.main" gutterBottom>
            ₹{room.price} / night
          </Typography>
          <Typography variant="body1" paragraph>
            {room.description}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={2}>
              {room.amenities.map((amenity, index) => (
                <Grid item xs={6} key={index} data-aos="fade-up" data-aos-delay={50 * (index + 1)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="primary" />
                    <Typography>{amenity}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(`/booking/${room.id}`)}
            sx={{ 
              mt: 4,
              py: 1.5,
              px: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              }
            }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Book Now
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetail; 