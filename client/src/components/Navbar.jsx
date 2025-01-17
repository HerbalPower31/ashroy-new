import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginButton } from './LoginButton';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
        Ashroy Homestay
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem 
            key={page.name}
            onClick={() => handleNavigation(page.path)}
            sx={{
              backgroundColor: location.pathname === page.path ? 'action.selected' : 'transparent',
            }}
          >
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
        <ListItem>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <LoginButton />
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{
              flexGrow: { xs: 1, md: 0 },
              display: 'flex',
              fontWeight: 700,
              color: 'primary.main',
              cursor: 'pointer',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              letterSpacing: '0.5px',
            }}
          >
            Ashroy Homestay
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigation(page.path)}
                sx={{
                  mx: 1,
                  color: 'text.primary',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === page.path ? '100%' : '0%',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Auth Section */}
          <Box sx={{ ml: 2 }}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isAuthenticated && user ? (
              <>
                <Tooltip title={user.name || 'User Settings'}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                      alt={user.name} 
                      src={user.picture}
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {user.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <LoginButton />
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 