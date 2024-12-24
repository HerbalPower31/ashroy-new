import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useMediaQuery, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Rooms', path: '/rooms' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            color: 'primary.main', 
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
          onClick={() => navigate('/')}
        >
          Ashroy Homestay
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {pages.map((item) => (
                <MenuItem 
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.title}
                </MenuItem>
              ))}
              <MenuItem 
                onClick={() => handleNavigation('/booking')}
                sx={{ 
                  color: 'white',
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Book Now
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {pages.map((item) => (
              <Button 
                key={item.path}
                color="primary" 
                onClick={() => navigate(item.path)}
                sx={{ 
                  fontWeight: 500,
                  '&:hover': { 
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                {item.title}
              </Button>
            ))}
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/booking')}
              sx={{ 
                ml: 2,
                px: 3,
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              Book Now
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 