import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Avatar,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Paper,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../../contexts/AuthContext';

const ManageAdmins = () => {
  const { 
    user, 
    pendingPartners, 
    activeAdmins,
    approvePartner, 
    rejectPartner,
    updateAdmin,
    deleteAdmin
  } = useAuth();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewingStats, setViewingStats] = useState(null);
  const [viewingCalendar, setViewingCalendar] = useState(null);
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyName: '',
    isActive: true,
    permissions: {
      manageRooms: true,
      manageBookings: true,
      viewAnalytics: true,
      manageAdmins: false,
      viewAllStats: false,
      viewAllCalendars: false
    }
  });

  const handleOpenDialog = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin);
      setAdminData(admin);
    } else {
      setEditingAdmin(null);
      setAdminData({
        name: '',
        email: '',
        phone: '',
        propertyName: '',
        isActive: true,
        permissions: {
          manageRooms: true,
          manageBookings: true,
          viewAnalytics: true,
          manageAdmins: false,
          viewAllStats: false,
          viewAllCalendars: false
        }
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAdmin(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setAdminData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  const handleSubmit = () => {
    if (editingAdmin) {
      updateAdmin(editingAdmin.id, adminData);
    } else {
      const newAdmin = {
        id: Date.now(),
        ...adminData,
        joinedDate: new Date().toISOString().split('T')[0],
        totalRooms: 0,
        totalBookings: 0,
        revenue: 0,
        occupancyRate: 0,
        stats: {
          monthly: {
            bookings: [0, 0, 0, 0, 0, 0],
            revenue: [0, 0, 0, 0, 0, 0],
            occupancy: [0, 0, 0, 0, 0, 0]
          },
          rooms: []
        }
      };
      updateAdmin(newAdmin.id, newAdmin);
    }
    handleCloseDialog();
  };

  const handleDeleteAdmin = (adminId) => {
    deleteAdmin(adminId);
  };

  const handleViewStats = (admin) => {
    setViewingStats(admin);
  };

  const handleCloseStats = () => {
    setViewingStats(null);
  };

  const handleViewCalendar = (admin) => {
    setViewingCalendar(admin);
  };

  const handleCloseCalendar = () => {
    setViewingCalendar(null);
  };

  const handleApprovePartner = (partnerId) => {
    approvePartner(partnerId);
  };

  const handleRejectPartner = (partnerId) => {
    rejectPartner(partnerId);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Partner Admins
        </Typography>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Active Partners" />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Pending Approvals
                {pendingPartners.length > 0 && (
                  <Chip
                    label={pendingPartners.length}
                    color="primary"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Active Partners Tab */}
      <TabPanel value={selectedTab} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          {user?.type === 'parent' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add New Partner
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {activeAdmins.map((admin) => (
            <Grid item xs={12} md={6} key={admin.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>{admin.name[0]}</Avatar>
                    <Box>
                      <Typography variant="h6">
                        {admin.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {admin.propertyName}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {admin.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {admin.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Joined Date
                      </Typography>
                      <Typography variant="body1">
                        {admin.joinedDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Total Rooms
                      </Typography>
                      <Typography variant="body1">
                        {admin.totalRooms}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Permissions
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {Object.entries(admin.permissions).map(([key, value]) => (
                        <Chip
                          key={key}
                          label={key.replace(/([A-Z])/g, ' $1').trim()}
                          color={value ? 'primary' : 'default'}
                          variant={value ? 'filled' : 'outlined'}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewStats(admin)}
                    >
                      View Stats
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CalendarMonthIcon />}
                      onClick={() => handleViewCalendar(admin)}
                    >
                      View Calendar
                    </Button>
                    {user?.type === 'parent' && (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(admin)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {activeAdmins.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No active partners yet
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      {/* Pending Approvals Tab */}
      <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={3}>
          {pendingPartners.map((partner) => (
            <Grid item xs={12} key={partner.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>{partner.name[0]}</Avatar>
                    <Box>
                      <Typography variant="h6">
                        {partner.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {partner.propertyName} by Ashroy
                      </Typography>
                    </Box>
                    <Chip
                      label="Pending Approval"
                      color="warning"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Contact Information
                      </Typography>
                      <Typography variant="body1">
                        Email: {partner.email}
                      </Typography>
                      <Typography variant="body1">
                        Phone: {partner.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Property Address
                      </Typography>
                      <Typography variant="body1">
                        {partner.propertyAddress}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Property Description
                      </Typography>
                      <Typography variant="body1">
                        {partner.propertyDescription}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Submitted Documents
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {partner.documents.map((doc, index) => (
                          <Chip
                            key={index}
                            label={doc}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ClearIcon />}
                      onClick={() => handleRejectPartner(partner.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      onClick={() => handleApprovePartner(partner.id)}
                    >
                      Approve
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {pendingPartners.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No pending partner applications
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      {/* Add/Edit Partner Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAdmin ? 'Edit Partner Admin' : 'Add New Partner Admin'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={adminData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={adminData.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Name"
                name="propertyName"
                value={adminData.propertyName}
                onChange={handleInputChange}
                helperText="Will be displayed as '[Property Name] by Ashroy'"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Permissions
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(adminData.permissions).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={value}
                          onChange={() => handlePermissionChange(key)}
                          disabled={key === 'manageAdmins'}
                        />
                      }
                      label={key.replace(/([A-Z])/g, ' $1').trim()}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAdmin ? 'Save Changes' : 'Add Partner'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Stats Dialog */}
      <Dialog open={!!viewingStats} onClose={handleCloseStats} maxWidth="md" fullWidth>
        {viewingStats && (
          <>
            <DialogTitle>
              {viewingStats.propertyName} - Statistics
            </DialogTitle>
            <DialogContent>
              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <Tab label="Overview" />
                <Tab label="Monthly Stats" />
                <Tab label="Room Performance" />
              </Tabs>

              {/* Overview Tab */}
              <TabPanel value={selectedTab} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Total Performance
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Total Bookings
                          </Typography>
                          <Typography variant="h4">
                            {viewingStats.totalBookings}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Total Revenue
                          </Typography>
                          <Typography variant="h4">
                            ₹{viewingStats.revenue.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Average Occupancy Rate
                          </Typography>
                          <Typography variant="h4">
                            {viewingStats.occupancyRate}%
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Property Details
                      </Typography>
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Total Rooms
                          </Typography>
                          <Typography variant="h4">
                            {viewingStats.totalRooms}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Partner Since
                          </Typography>
                          <Typography variant="h6">
                            {viewingStats.joinedDate}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Monthly Stats Tab */}
              <TabPanel value={selectedTab} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Monthly Bookings
                      </Typography>
                      <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                        {viewingStats.stats.monthly.bookings.map((value, index) => (
                          <Box
                            key={index}
                            sx={{
                              height: `${(value / Math.max(...viewingStats.stats.monthly.bookings)) * 100}%`,
                              width: 40,
                              bgcolor: 'primary.main',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              color: 'white',
                              p: 1
                            }}
                          >
                            {value}
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
                          <Typography key={month} variant="body2">
                            {month}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Room Performance Tab */}
              <TabPanel value={selectedTab} index={2}>
                <Grid container spacing={2}>
                  {viewingStats.stats.rooms.map((room) => (
                    <Grid item xs={12} key={room.id}>
                      <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {room.name}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total Bookings
                            </Typography>
                            <Typography variant="h6">
                              {room.bookings}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total Revenue
                            </Typography>
                            <Typography variant="h6">
                              ₹{room.revenue.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseStats}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* View Calendar Dialog */}
      <Dialog open={!!viewingCalendar} onClose={handleCloseCalendar} maxWidth="md" fullWidth>
        {viewingCalendar && (
          <>
            <DialogTitle>
              {viewingCalendar.propertyName} - Room Calendars
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {viewingCalendar.stats.rooms.map((room) => (
                  <Grid item xs={12} key={room.id}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {room.name}
                      </Typography>
                      {/* Here you would integrate a calendar component showing bookings */}
                      <Box sx={{ height: 200, bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" align="center">
                          Calendar view will be integrated here
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCalendar}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ManageAdmins; 