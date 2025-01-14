import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, TextField, Button, Alert } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import rooms from '../data/rooms';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === parseInt(id));

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (formData.guests < 1 || formData.guests > room.capacity) {
      newErrors.guests = `Guests must be between 1 and ${room.capacity}`;
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const bookingData = {
      roomId: room.id,
      roomName: room.name,
      dates: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      },
      ...formData
    };

    // Here you would typically send the booking data to your backend
    console.log('Booking Data:', bookingData);

    // Navigate to confirmation page with complete booking data
    navigate('/booking-confirmation', { 
      state: { bookingData }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom data-aos="fade-up">
        Book Your Stay
      </Typography>
      <Typography 
        variant="h6" 
        textAlign="center" 
        color="text.secondary" 
        sx={{ mb: 6 }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Complete your booking for an unforgettable stay
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7} data-aos="fade-right">
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Select Dates
            </Typography>
            <Box sx={{ mb: 3 }}>
              <DateRangePicker
                ranges={[dateRange]}
                onChange={item => setDateRange(item.selection)}
                minDate={new Date()}
                rangeColors={['#0A4D3C']}
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Guest Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Guests"
                  name="guests"
                  type="number"
                  value={formData.guests}
                  onChange={handleInputChange}
                  error={!!errors.guests}
                  helperText={errors.guests || `Maximum ${room.capacity} guests`}
                  InputProps={{ inputProps: { min: 1, max: room.capacity } }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Requests"
                  name="specialRequests"
                  multiline
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/rooms/${room.id}`)}
              >
                Back to Room
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Confirm Booking
              </Button>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={5} data-aos="fade-left">
          <Box sx={{ 
            p: 3, 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h5" gutterBottom>
              Booking Summary
            </Typography>
            {/* Summary content */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Booking; 