import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  MonetizationOn as MoneyIcon,
  Hotel as HotelIcon,
  EventBusy as BlockIcon,
  Book as BookingIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import rooms from '../../data/rooms';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      roomId: 1,
      guestName: "John Doe",
      email: "john@example.com",
      phone: "+919123787213",
      checkIn: "2024-03-20",
      checkOut: "2024-03-22",
      amount: 5000,
      status: "Confirmed",
      idType: "Aadhar",
      idNumber: "1234-5678-9012"
    },
    {
      id: 2,
      roomId: 2,
      guestName: "Jane Smith",
      email: "jane@example.com",
      phone: "+919876543211",
      checkIn: "2024-03-25",
      checkOut: "2024-03-27",
      amount: 7000,
      status: "Confirmed",
      idType: "Passport",
      idNumber: "AB1234567"
    }
  ]);
  const [stats, setStats] = useState({
    totalEarnings: 12000,
    totalBookings: 2,
    blockedDates: 3,
    occupancyRate: '60%',
    roomWiseStats: {
      1: { bookings: 1, revenue: 5000, occupancy: 65 },
      2: { bookings: 1, revenue: 7000, occupancy: 55 },
      3: { bookings: 0, revenue: 0, occupancy: 0 }
    }
  });

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDownloadReceipt = async (bookingId) => {
    // Mock download functionality
    alert('Receipt download functionality will be implemented with backend integration');
  };

  const handlePrintReceipt = (bookingId) => {
    // Mock print functionality
    alert('Receipt print functionality will be implemented with backend integration');
  };

  const StatCard = ({ title, value, icon: Icon, subtext }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        {subtext && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtext}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  const RoomWiseStats = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell align="right">Total Bookings</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Occupancy Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(stats.roomWiseStats).map(([roomId, stat]) => (
            <TableRow key={roomId}>
              <TableCell>{rooms.find(r => r.id === parseInt(roomId))?.name}</TableCell>
              <TableCell align="right">{stat.bookings}</TableCell>
              <TableCell align="right">₹{stat.revenue}</TableCell>
              <TableCell align="right">{stat.occupancy}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const BookingDetailsDialog = () => (
    <Dialog
      open={!!selectedBooking}
      onClose={() => setSelectedBooking(null)}
      maxWidth="md"
      fullWidth
    >
      {selectedBooking && (
        <>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Guest Information</Typography>
                <Typography>Name: {selectedBooking.guestName}</Typography>
                <Typography>Email: {selectedBooking.email}</Typography>
                <Typography>Phone: {selectedBooking.phone}</Typography>
                <Typography>ID Type: {selectedBooking.idType}</Typography>
                <Typography>ID Number: {selectedBooking.idNumber}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Booking Information</Typography>
                <Typography>Room: {rooms.find(r => r.id === selectedBooking.roomId)?.name}</Typography>
                <Typography>Check In: {format(new Date(selectedBooking.checkIn), 'dd MMM yyyy')}</Typography>
                <Typography>Check Out: {format(new Date(selectedBooking.checkOut), 'dd MMM yyyy')}</Typography>
                <Typography>Amount: ₹{selectedBooking.amount}</Typography>
                <Typography>Status: {selectedBooking.status}</Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handlePrintReceipt(selectedBooking.id)}>
              Print Receipt
            </Button>
            <Button onClick={() => handleDownloadReceipt(selectedBooking.id)}>
              Download Receipt
            </Button>
            <Button onClick={() => setSelectedBooking(null)}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Earnings" 
            value={`₹${stats.totalEarnings}`}
            icon={MoneyIcon}
            subtext={`${timeFilter === 'month' ? 'This Month' : 'All Time'}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings}
            icon={BookingIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Blocked Dates" 
            value={stats.blockedDates}
            icon={BlockIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Occupancy Rate" 
            value={stats.occupancyRate}
            icon={HotelIcon}
          />
        </Grid>
      </Grid>

      {/* Room-wise Statistics */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Room-wise Statistics
      </Typography>
      <RoomWiseStats />

      {/* Filters */}
      <Grid container spacing={2} sx={{ my: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={timeFilter}
              label="Time Period"
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Room</InputLabel>
            <Select
              value={roomFilter}
              label="Room"
              onChange={(e) => setRoomFilter(e.target.value)}
            >
              <MenuItem value="all">All Rooms</MenuItem>
              {rooms.map(room => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Bookings Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Guest Name</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    {rooms.find(room => room.id === booking.roomId)?.name}
                  </TableCell>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{format(new Date(booking.checkIn), 'dd MMM yyyy')}</TableCell>
                  <TableCell>{format(new Date(booking.checkOut), 'dd MMM yyyy')}</TableCell>
                  <TableCell align="right">₹{booking.amount}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleViewBooking(booking)}>
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Receipt">
                      <IconButton onClick={() => handleDownloadReceipt(booking.id)}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print Receipt">
                      <IconButton onClick={() => handlePrintReceipt(booking.id)}>
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <BookingDetailsDialog />
    </Container>
  );
};

export default Dashboard; 