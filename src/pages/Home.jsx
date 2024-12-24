import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import BalconyIcon from '@mui/icons-material/Balcony';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <BedIcon fontSize="large" />, title: 'Comfortable Rooms', description: 'Spacious and well-furnished rooms for a relaxing stay' },
    { icon: <LocationOnIcon fontSize="large" />, title: 'Prime Location', description: 'Located in the heart of Tezpur with easy access to attractions' },
    { icon: <WifiIcon fontSize="large" />, title: 'Free Wi-Fi', description: 'Stay connected with high-speed internet access' },
    { icon: <BalconyIcon fontSize="large" />, title: 'Private Bathrooms & Balconies', description: 'Enjoy your privacy with en-suite bathrooms and scenic balconies' },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: '80vh',
        position: 'relative',
        backgroundImage: 'url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            color: 'white',
            zIndex: 1
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Ashroy
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Your Home Away From Home
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
              onClick={() => navigate('/rooms')}
            >
              View Our Rooms
            </Button>
          </Container>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom data-aos="fade-up">
          Why Choose Ashroy
        </Typography>
        <Box 
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white', 
            py: 3,
            px: 4,
            borderRadius: 2,
            width: '100%',
            mb: 6,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 2, md: 4 }
          }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Experience Comfort at Affordable Rates
            </Typography>
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                whiteSpace: 'nowrap'
              }}
            >
              Starting from ₹1,200/night
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/rooms')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ 
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  p: 2,
                  mb: 2,
                  color: 'white'
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom textAlign="center" sx={{ fontWeight: 500 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }} data-aos="fade-up">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="100">
              <Typography variant="h3" gutterBottom>
                About Ashroy
              </Typography>
              <Typography variant="body1" paragraph>
                Ashroy Homestay is more than just accommodation – it's your home away from home in Tezpur. 
                We offer a unique blend of modern comfort and traditional Assamese hospitality.
              </Typography>
              <Typography variant="body1">
                Our family-run homestay ensures that every guest experiences the warmth and cultural richness 
                of Assam while enjoying all modern amenities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="200">
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Ashroy Homestay"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Map Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom data-aos="fade-up">
          Our Location
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} data-aos="fade-right" data-aos-delay="100">
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
          <Grid item xs={12} md={6} data-aos="fade-left" data-aos-delay="200">
            <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'primary.main',
                fontWeight: 'medium'
              }}>
                <LocationOnIcon color="primary" />
                Find Us Here
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Located in the heart of Tezpur, Ashroy Homestay offers easy access to all major attractions. 
                Our prime location ensures you're never far from the city's best experiences.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 2,
                  borderRadius: 1,
                  fontWeight: 'medium'
                }}
              >
                Address: Lalmati, Tiger Hill Road, Tezpur, Assam 784001
              </Typography>
              <Button
                variant="contained"
                color="primary"
                endIcon={<OpenInNewIcon />}
                onClick={() => window.open('https://maps.app.goo.gl/SiGR4ndfo4WSaPra9?g_st=iw', '_blank')}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  px: 3,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                Open in Google Maps
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box 
        sx={{ 
          py: 8, 
          textAlign: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        }}
        data-aos="fade-up"
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            Ready to Experience Ashroy?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'white' }}>
            Book your stay now and create memorable experiences
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/rooms')}
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              '&:hover': { bgcolor: 'secondary.dark' }
            }}
          >
            Book Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 