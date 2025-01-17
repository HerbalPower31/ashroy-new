import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Fade,
  Zoom,
} from '@mui/material';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const BlockDates = () => {
  // Mock room data
  const rooms = [
    { id: 1, name: 'Deluxe Room' },
    { id: 2, name: 'Super Deluxe Room' },
    { id: 3, name: 'Executive Suite' },
  ];

  const [selectedRoom, setSelectedRoom] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [blockReason, setBlockReason] = useState('');
  const [blockedDates, setBlockedDates] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock fetch blocked dates
  useEffect(() => {
    if (selectedRoom) {
      // Simulating API call
      const mockBlockedDates = [
        {
          id: 1,
          roomId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-05',
          reason: 'Maintenance',
        },
        {
          id: 2,
          roomId: 2,
          startDate: '2024-01-10',
          endDate: '2024-01-15',
          reason: 'Renovation',
        },
      ];
      setBlockedDates(mockBlockedDates.filter(date => date.roomId === parseInt(selectedRoom)));
    }
  }, [selectedRoom]);

  useEffect(() => {
    // Initialize AOS for this component
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, [selectedRoom, blockedDates]);

  const handleSubmit = () => {
    if (!selectedRoom || !dateRange[0].startDate || !dateRange[0].endDate || !blockReason) {
      setError('Please fill in all fields');
      return;
    }

    const newBlock = {
      id: editId || Date.now(),
      roomId: parseInt(selectedRoom),
      startDate: format(dateRange[0].startDate, 'yyyy-MM-dd'),
      endDate: format(dateRange[0].endDate, 'yyyy-MM-dd'),
      reason: blockReason,
    };

    if (editMode) {
      setBlockedDates(prev => prev.map(block => block.id === editId ? newBlock : block));
      setSuccess('Block dates updated successfully');
    } else {
      setBlockedDates(prev => [...prev, newBlock]);
      setSuccess('Dates blocked successfully');
    }

    // Reset form
    setBlockReason('');
    setShowDatePicker(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (block) => {
    setSelectedRoom(block.roomId.toString());
    setDateRange([
      {
        startDate: new Date(block.startDate),
        endDate: new Date(block.endDate),
        key: 'selection',
      },
    ]);
    setBlockReason(block.reason);
    setEditMode(true);
    setEditId(block.id);
    setShowDatePicker(true);
  };

  const handleDelete = (id) => {
    setBlockedDates(prev => prev.filter(block => block.id !== id));
    setSuccess('Block dates deleted successfully');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3}
        sx={{ p: 3 }}
        data-aos="fade-up"
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ fontWeight: 'bold' }}
          data-aos="fade-right"
        >
          Block Dates
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }} 
            onClose={() => setError('')}
            data-aos="fade-down"
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 2 }} 
            onClose={() => setSuccess('')}
            data-aos="fade-down"
          >
            {success}
          </Alert>
        )}

        <Box sx={{ mb: 3 }} data-aos="fade-up">
          <FormControl 
            fullWidth 
            sx={{ mb: 2 }}
            data-aos="fade-up"
          >
            <InputLabel>Select Room</InputLabel>
            <Select
              value={selectedRoom}
              label="Select Room"
              onChange={(e) => setSelectedRoom(e.target.value)}
              disabled={loading}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={() => setShowDatePicker(true)}
            sx={{ mb: 2 }}
            disabled={loading}
            fullWidth
            data-aos="fade-up"
          >
            {dateRange[0].startDate && dateRange[0].endDate
              ? `${format(dateRange[0].startDate, 'MMM dd, yyyy')} - ${format(
                  dateRange[0].endDate,
                  'MMM dd, yyyy'
                )}`
              : 'Select Dates'}
          </Button>

          <TextField
            fullWidth
            label="Blocking Reason"
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
            data-aos="fade-up"
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !selectedRoom || !dateRange[0].startDate || !dateRange[0].endDate || !blockReason}
            fullWidth
            data-aos="fade-up"
          >
            {loading ? 'Processing...' : editMode ? 'Update Block' : 'Block Dates'}
          </Button>
        </Box>

        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ mt: 4, fontWeight: 'bold' }}
          data-aos="fade-right"
        >
          Currently Blocked Dates
        </Typography>

        {selectedRoom ? (
          loading ? (
            <Typography color="textSecondary" data-aos="fade">
              Loading blocked dates...
            </Typography>
          ) : blockedDates.length > 0 ? (
            <List>
              {blockedDates.map((block, index) => (
                <ListItem
                  key={block.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    mb: 2,
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        {`${format(new Date(block.startDate), 'MMM dd, yyyy')} - ${format(
                          new Date(block.endDate),
                          'MMM dd, yyyy'
                        )}`}
                      </Typography>
                    }
                    secondary={block.reason}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleEdit(block)} 
                      sx={{ mr: 1 }}
                      disabled={loading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDelete(block.id)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary" data-aos="fade">
              No blocked dates for this room
            </Typography>
          )
        ) : (
          <Typography color="textSecondary" data-aos="fade">
            Select a room to view blocked dates
          </Typography>
        )}

        <Dialog
          open={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Select Date Range</DialogTitle>
          <DialogContent>
            <DateRange
              editableDateInputs={true}
              onChange={item => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDatePicker(false)}>Cancel</Button>
            <Button onClick={() => setShowDatePicker(false)} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default BlockDates; 