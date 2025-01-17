import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          throw new Error('No token found in URL');
        }
        await handleCallback(token);
        navigate('/'); // Redirect to home page after successful authentication
      } catch (error) {
        console.error('Error processing callback:', error);
        navigate('/login'); // Redirect to login page if there's an error
      }
    };

    processCallback();
  }, [handleCallback, navigate, searchParams]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default Callback; 