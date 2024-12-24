import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAuth } from '../../contexts/AuthContext';
import rooms from '../../data/rooms';

const ManageRooms = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '',
    size: '',
    owner: user?.type === 'parent' ? 'Ashroy' : user?.propertyName?.replace(' by Ashroy', ''),
    ownerType: user?.type,
    amenities: [],
    images: [],
    features: {
      bedroom: [],
      bathroom: [],
      kitchen: [],
      entertainment: [],
      comfort: [],
      workspace: []
    },
    rules: {
      checkIn: '12:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Flexible',
      smoking: false,
      pets: false,
      parties: false
    }
  });

  // Filter rooms based on admin type
  const filteredRooms = rooms.filter(room => {
    if (user?.type === 'parent') {
      return true; // Parent admin can see all rooms
    }
    return room.owner === user?.name; // Partner admin can only see their rooms
  });

  const handleOpenDialog = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setRoomData(room);
    } else {
      setEditingRoom(null);
      setRoomData({
        name: '',
        description: '',
        price: '',
        capacity: '',
        size: '',
        owner: user?.type === 'parent' ? 'Ashroy' : user?.propertyName?.replace(' by Ashroy', ''),
        ownerType: user?.type,
        amenities: [],
        images: [],
        features: {
          bedroom: [],
          bathroom: [],
          kitchen: [],
          entertainment: [],
          comfort: [],
          workspace: []
        },
        rules: {
          checkIn: '12:00 PM',
          checkOut: '11:00 AM',
          cancellation: 'Flexible',
          smoking: false,
          pets: false,
          parties: false
        }
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRoom(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAmenity = () => {
    const amenity = document.getElementById('amenity-input').value.trim();
    if (amenity) {
      setRoomData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
      document.getElementById('amenity-input').value = '';
    }
  };

  const handleRemoveAmenity = (index) => {
    setRoomData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      url: URL.createObjectURL(file),
      caption: `Room Image ${roomData.images.length + index + 1}`,
      category: 'bedroom',
      order: roomData.images.length + index + 1
    }));
    setRoomData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleImageCaptionChange = (index, caption) => {
    setRoomData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, caption } : img
      )
    }));
  };

  const handleImageCategoryChange = (index, category) => {
    setRoomData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, category } : img
      )
    }));
  };

  const handleImageOrderChange = (index, direction) => {
    const newImages = [...roomData.images];
    if (direction === 'up' && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    newImages.forEach((img, i) => img.order = i + 1);
    setRoomData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleFeatureChange = (category, feature) => {
    setRoomData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [category]: feature.split(',').map(f => f.trim())
      }
    }));
  };

  const handleRuleChange = (rule, value) => {
    setRoomData(prev => ({
      ...prev,
      rules: {
        ...prev.rules,
        [rule]: value
      }
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Room Data:', roomData);
    handleCloseDialog();
  };

  const handleDeleteRoom = (roomId) => {
    // Here you would typically send a delete request to your backend
    console.log('Deleting room:', roomId);
  };

  const imageCategories = [
    'bedroom',
    'bathroom',
    'kitchen',
    'living',
    'view',
    'exterior'
  ];

  const featureCategories = [
    { key: 'bedroom', label: 'Bedroom Features' },
    { key: 'bathroom', label: 'Bathroom Features' },
    { key: 'kitchen', label: 'Kitchen Features' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'comfort', label: 'Comfort' },
    { key: 'workspace', label: 'Workspace' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Manage Rooms
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Room
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} md={6} key={room.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={room.images[0].url}
                alt={room.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {room.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {room.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={`₹${room.price}/night`} color="primary" />
                  <Chip label={`${room.capacity} guests`} />
                  <Chip label={room.size} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {room.ownerType === 'partner' ? `${room.owner} by Ashroy` : 'Ashroy Homestay'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filteredRooms.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No rooms available
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRoom ? 'Edit Room' : 'Add New Room'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Room Name"
                name="name"
                value={roomData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={roomData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price per Night"
                name="price"
                type="number"
                value={roomData.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={roomData.capacity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Room Size"
                name="size"
                value={roomData.size}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Images Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Room Images
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="room-images"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="room-images">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<ImageIcon />}
                >
                  Upload Images
                </Button>
              </label>
              <ImageList cols={3} gap={16} sx={{ mt: 2 }}>
                {roomData.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image.url}
                      alt={image.caption}
                      loading="lazy"
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                    <ImageListItemBar
                      title={
                        <TextField
                          size="small"
                          fullWidth
                          value={image.caption}
                          onChange={(e) => handleImageCaptionChange(index, e.target.value)}
                          sx={{ 
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }
                          }}
                        />
                      }
                      subtitle={
                        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                          <Select
                            value={image.category}
                            onChange={(e) => handleImageCategoryChange(index, e.target.value)}
                            sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' } }}
                          >
                            {imageCategories.map((category) => (
                              <MenuItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      actionIcon={
                        <Box sx={{ display: 'flex', gap: 1, pr: 1 }}>
                          <Tooltip title="Move Up">
                            <IconButton
                              onClick={() => handleImageOrderChange(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUpwardIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Move Down">
                            <IconButton
                              onClick={() => handleImageOrderChange(index, 'down')}
                              disabled={index === roomData.images.length - 1}
                            >
                              <ArrowDownwardIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Remove">
                            <IconButton
                              onClick={() => {
                                setRoomData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }));
                              }}
                            >
                              <DeleteIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            {/* Features Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Room Features
              </Typography>
              <Grid container spacing={2}>
                {featureCategories.map(({ key, label }) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      fullWidth
                      label={label}
                      multiline
                      rows={2}
                      value={roomData.features[key].join(', ')}
                      onChange={(e) => handleFeatureChange(key, e.target.value)}
                      helperText="Enter features separated by commas"
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Rules Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Room Rules
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Check-in Time"
                    value={roomData.rules.checkIn}
                    onChange={(e) => handleRuleChange('checkIn', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Check-out Time"
                    value={roomData.rules.checkOut}
                    onChange={(e) => handleRuleChange('checkOut', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cancellation Policy"
                    value={roomData.rules.cancellation}
                    onChange={(e) => handleRuleChange('cancellation', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Amenities Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  id="amenity-input"
                  label="Add Amenity"
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={handleAddAmenity}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              <List dense>
                {roomData.amenities.map((amenity, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={amenity} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveAmenity(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingRoom ? 'Save Changes' : 'Add Room'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageRooms; 