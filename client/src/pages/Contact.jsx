import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Typography variant="h3" textAlign="center" gutterBottom data-aos="fade-up">
          Contact Us
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          color="text.secondary" 
          sx={{ mb: 6 }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          We're here to help and answer any question you might have
        </Typography>

        {/* Contact Information */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { 
              icon: <LocationOnIcon fontSize="large" />, 
              title: 'Address', 
              content: 'Lalmati, Tiger Hill Road, Tezpur, Assam 784001',
              action: {
                text: 'View on Maps',
                onClick: () => window.open('https://maps.app.goo.gl/SiGR4ndfo4WSaPra9?g_st=iw', '_blank')
              }
            },
            { 
              icon: <PhoneIcon fontSize="large" />, 
              title: 'Phone', 
              content: '+91 91237 87213',
              action: {
                text: 'Call Us',
                onClick: () => window.open('tel:+919123787213')
              }
            },
            { 
              icon: <WhatsAppIcon fontSize="large" />, 
              title: 'WhatsApp', 
              content: '+91 91237 87213',
              action: {
                text: 'Message Us',
                onClick: () => window.open('https://wa.me/919123787213')
              }
            },
            { 
              icon: <EmailIcon fontSize="large" />, 
              title: 'Email', 
              content: 'info@ashroyhomestay.com',
              action: {
                text: 'Send Email',
                onClick: () => window.open('mailto:info@ashroyhomestay.com')
              }
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ 
                  color: 'primary.main',
                  mb: 2,
                  p: 1.5,
                  borderRadius: '50%',
                  bgcolor: 'primary.lighter'
                }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {item.content}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  onClick={item.action.onClick}
                >
                  {item.action.text}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Map Section */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6} data-aos="fade-right">
            <Box
              component="img"
              src="/images/map-screenshot.jpg"
              alt="Ashroy Homestay Location"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
              }}
              onClick={() => window.open('https://maps.app.goo.gl/SiGR4ndfo4WSaPra9?g_st=iw', '_blank')}
            />
          </Grid>
          <Grid item xs={12} md={6} data-aos="fade-left">
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Send us a Message
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" type="email" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ 
                      py: 1.5,
                      mt: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact; 