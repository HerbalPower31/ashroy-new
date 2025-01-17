import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Avatar,
  IconButton,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tab,
  Tabs,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UserProfile = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: null,
    marketingPreferences: {
      email: true,
      sms: true,
      promotions: true,
    },
    notificationSettings: {
      bookingUpdates: true,
      promotionalEmails: true,
      newsAndUpdates: false,
      priceAlerts: true,
    },
    securitySettings: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
    interests: [],
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone_number || '',
        address: user.address || '',
        avatar: user.avatar || null,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (setting) => {
    setProfileData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: !prev.notificationSettings[setting]
      }
    }));
  };

  const handleSecurityChange = (setting) => {
    setProfileData(prev => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        [setting]: !prev.securitySettings[setting]
      }
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Implement password change logic here
      setShowPasswordDialog(false);
      setSuccessMessage('Password updated successfully');
    } catch (error) {
      setError('Failed to update password');
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">User Profile</Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<PersonIcon />} label="Profile" />
            <Tab icon={<SecurityIcon />} label="Security" />
            <Tab icon={<NotificationsIcon />} label="Notifications" />
            <Tab icon={<HistoryIcon />} label="Booking History" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  component="label"
                  sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                  size="small"
                >
                  <CameraAltIcon sx={{ color: 'white', fontSize: 16 }} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={!isEditing}
                  />
                </IconButton>
              }
            >
              <Avatar
                src={profileData.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={profileData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <List>
            <ListItem>
              <ListItemText
                primary="Two-Factor Authentication"
                secondary="Add an extra layer of security to your account"
              />
              <Switch
                edge="end"
                checked={profileData.securitySettings.twoFactorAuth}
                onChange={() => handleSecurityChange('twoFactorAuth')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Login Alerts"
                secondary="Get notified of new login attempts"
              />
              <Switch
                edge="end"
                checked={profileData.securitySettings.loginAlerts}
                onChange={() => handleSecurityChange('loginAlerts')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Change Password"
                secondary="Update your password regularly for better security"
              />
              <Button
                variant="outlined"
                onClick={() => setShowPasswordDialog(true)}
              >
                Change
              </Button>
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <List>
            <ListItem>
              <ListItemText
                primary="Booking Updates"
                secondary="Receive notifications about your bookings"
              />
              <Switch
                edge="end"
                checked={profileData.notificationSettings.bookingUpdates}
                onChange={() => handleNotificationChange('bookingUpdates')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Promotional Emails"
                secondary="Get special offers and deals"
              />
              <Switch
                edge="end"
                checked={profileData.notificationSettings.promotionalEmails}
                onChange={() => handleNotificationChange('promotionalEmails')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="News and Updates"
                secondary="Stay informed about new features and services"
              />
              <Switch
                edge="end"
                checked={profileData.notificationSettings.newsAndUpdates}
                onChange={() => handleNotificationChange('newsAndUpdates')}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Price Alerts"
                secondary="Get notified when prices change"
              />
              <Switch
                edge="end"
                checked={profileData.notificationSettings.priceAlerts}
                onChange={() => handleNotificationChange('priceAlerts')}
              />
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="body1" color="text.secondary" align="center">
            Your booking history will appear here
          </Typography>
        </TabPanel>

        {isEditing && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">Update Password</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile; 