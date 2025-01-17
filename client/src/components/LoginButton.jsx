import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export const LoginButton = () => {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <CircularProgress size={24} />;
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          logout();
          navigate('/');
        }}
        startIcon={<LogoutIcon />}
      >
        Log Out
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/login')}
      startIcon={<LoginIcon />}
    >
      Log In
    </Button>
  );
}; 