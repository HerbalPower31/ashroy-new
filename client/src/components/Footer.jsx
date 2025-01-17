import React from 'react';
import { Box, Container, Typography, Grid, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Ashroy
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Experience the warmth of traditional Assamese hospitality in our modern homestay. 
              Located in the heart of Tezpur, we offer comfortable accommodations with all modern amenities.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                color="inherit" 
                component={Link} 
                href="https://facebook.com" 
                target="_blank"
                sx={{ mr: 1 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                component={Link} 
                href="https://instagram.com" 
                target="_blank"
                sx={{ mr: 1 }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                component={Link} 
                href="https://twitter.com" 
                target="_blank"
                sx={{ mr: 1 }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                component={Link} 
                href="https://wa.me/919123787213" 
                target="_blank"
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">Home</Link>
              <Link href="/rooms" color="inherit" underline="hover">Our Rooms</Link>
              <Link href="/gallery" color="inherit" underline="hover">Gallery</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
              <Link href="/booking" color="inherit" underline="hover">Book Now</Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon />
                <Typography variant="body2">
                  Lalmati, Tiger Hill Road, Tezpur, Assam 784001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon />
                <Typography variant="body2">
                  <Link href="tel:+919123787213" color="inherit" underline="hover">
                    +91 91237 87213
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon />
                <Typography variant="body2">
                  <Link href="mailto:info@ashroyhomestay.com" color="inherit" underline="hover">
                    info@ashroyhomestay.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
          mt: 4, 
          pt: 3,
          textAlign: 'center'
        }}>
          <Typography variant="body2">
            © {currentYear} Ashroy Homestay. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 