import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const steps = ['Basic Information', 'Property Details', 'Verification'];

const AdminSignup = () => {
  const navigate = useNavigate();
  const { signupPartner } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    propertyName: '',
    propertyAddress: '',
    propertyDescription: '',
    documents: null,
    isAgreed: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // In a real application, this would send the data to your backend
      const success = await signupPartner(formData);
      if (success) {
        navigate('/admin/login', { 
          state: { 
            message: 'Registration successful! Please wait for admin approval before logging in.' 
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Name"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                required
                helperText="Will be displayed as '[Property Name] by Ashroy'"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Address"
                name="propertyAddress"
                multiline
                rows={2}
                value={formData.propertyAddress}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Description"
                name="propertyDescription"
                multiline
                rows={4}
                value={formData.propertyDescription}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Please upload the following documents:
              </Typography>
              <ul>
                <li>Property ownership/lease agreement</li>
                <li>Business registration (if applicable)</li>
                <li>Government-issued ID</li>
              </ul>
              <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id="documents-upload"
                multiple
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.files }))}
              />
              <label htmlFor="documents-upload">
                <Button variant="outlined" component="span">
                  Upload Documents
                </Button>
              </label>
              {formData.documents && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {Array.from(formData.documents).map(file => file.name).join(', ')}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                By clicking Submit, you agree to our Terms of Service and Privacy Policy.
                Your application will be reviewed by our team, and you will be notified
                once your account is approved.
              </Typography>
            </Grid>
          </Grid>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Partner Admin Registration
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Join Ashroy as a property partner
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" align="center">
            Already have an account?{' '}
            <Link to="/admin/login" style={{ textDecoration: 'none' }}>
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminSignup; 