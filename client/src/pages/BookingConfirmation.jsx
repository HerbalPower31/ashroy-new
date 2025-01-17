import React from 'react';
import { Container, Paper, Typography, Box, Divider, Chip, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import { format } from 'date-fns';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            No booking information found
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Thank you for choosing Ashroy Homestay
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Chip label="Booking Details" />
        </Divider>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Guest Information
          </Typography>
          <Typography><strong>Name:</strong> {bookingData.name}</Typography>
          <Typography><strong>Email:</strong> {bookingData.email}</Typography>
          <Typography><strong>Phone:</strong> {bookingData.phone}</Typography>
          {bookingData.specialRequests && (
            <Typography><strong>Special Requests:</strong> {bookingData.specialRequests}</Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Stay Details
          </Typography>
          <Typography>
            <strong>Check-in:</strong> {format(bookingData.dates.startDate, 'PPP')}
          </Typography>
          <Typography>
            <strong>Check-out:</strong> {format(bookingData.dates.endDate, 'PPP')}
          </Typography>
          <Typography>
            <strong>Number of Guests:</strong> {bookingData.guests}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation; 