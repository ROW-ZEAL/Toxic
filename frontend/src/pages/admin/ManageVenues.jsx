import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  Alert,
  Drawer,
  Divider,
  Stack,
  Switch,
  Tooltip,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  LocationOn as LocationIcon,
  Image as ImageIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import venueService from '../../services/venueService';

// Default form data
const defaultFormData = {
  name: '',
  location: '',
  description: '',
  price: '',
  status: 'active',
  facilities: [],
  sportCategories: [],
  photos: [],
};

// Mock venues data
const mockVenues = [
  {
    id: 1,
    name: 'Badminton Court',
    location: '654 Shuttle Drive, Boston',
    status: 'inactive',
    price: '$35/hour',
    photos: ['https://source.unsplash.com/800x600/?badminton'],
    description: 'Indoor badminton court with professional flooring',
    facilities: ['Changing Rooms', 'Equipment Rental'],
    sportCategories: ['Badminton'],
  },
];

// Available sport categories
const sportCategoriesOptions = [
  'Tennis',
  'Basketball',
  'Swimming',
  'Football',
  'Soccer',
  'Badminton',
  'Volleyball',
  'Cricket',
  'Baseball',
  'Table Tennis',
];

// Available facilities
const facilitiesOptions = [
  'Changing Rooms',
  'Parking',
  'Equipment Rental',
  'Showers',
  'Lockers',
  'Water Fountains',
  'Floodlights',
  'Spectator Seating',
  'Cafe',
  'First Aid',
];

const ManageVenues = () => {
  const theme = useTheme();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({ open: false, venueId: null });
  const [formData, setFormData] = useState(defaultFormData);
  const [options, setOptions] = useState({
    statusOptions: [],
    facilityOptions: [],
    sportCategories: [],
  });

  // Fetch venues and options on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [venuesData, optionsData] = await Promise.all([
          venueService.getVenues(),
          venueService.getVenueOptions(),
        ]);
        
        setVenues(venuesData);
        setOptions(optionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({
          open: true,
          message: 'Failed to load data. Please try again.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes for facilities
  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  // Handle sport category changes
  const handleSportCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData(prev => ({
      ...prev,
      sportCategories: [selectedCategory]
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        photos: [reader.result]
      }));
    };
    reader.readAsDataURL(file);
  };

  // Get status label
  const getStatusLabel = (status) => {
    const statusOption = options.statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.label : status;
  };

  // Open add venue drawer
  const handleAddVenue = () => {
    setCurrentVenue(null);
    setFormData(defaultFormData);
    setOpenDrawer(true);
  };

  // Open edit venue drawer
  const handleEditVenue = (venue) => {
    setCurrentVenue(venue);
    setFormData({
      name: venue.name,
      location: venue.location,
      description: venue.description || '',
      price: venue.price_per_hour.toString(),
      status: venue.status,
      facilities: venue.facilities || [],
      sportCategories: venue.sport_categories || [],
      photos: venue.photos || [],
    });
    setOpenDrawer(true);
  };

  // Handle view venue details
  const handleViewVenue = (venue) => {
    setCurrentVenue(venue);
    setOpenDialog(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (venueId) => {
    setDeleteConfirmDialog({ open: true, venueId });
  };

  // Confirm venue deletion
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await venueService.deleteVenue(deleteConfirmDialog.venueId);
      setVenues(venues.filter(venue => venue.id !== deleteConfirmDialog.venueId));
      setDeleteConfirmDialog({ open: false, venueId: null });
      setNotification({
        open: true,
        message: 'Venue deleted successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error deleting venue:', error);
      setNotification({
        open: true,
        message: 'Failed to delete venue. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Save venue (add or update)
  const handleSaveVenue = async () => {
    if (!formData.name || !formData.location || !formData.price) {
      setNotification({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      let response;
      
      if (currentVenue) {
        // Update existing venue
        response = await venueService.updateVenue(currentVenue.id, formData);
        setVenues(venues.map(v => v.id === currentVenue.id ? response : v));
        setNotification({
          open: true,
          message: 'Venue updated successfully',
          severity: 'success',
        });
      } else {
        // Add new venue
        response = await venueService.createVenue(formData);
        setVenues([...venues, response]);
        setNotification({
          open: true,
          message: 'Venue added successfully',
          severity: 'success',
        });
      }
      
      setOpenDrawer(false);
    } catch (error) {
      console.error('Error saving venue:', error);
      setNotification({
        open: true,
        message: error.response?.data?.detail || 'Failed to save venue. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter venues based on search query
  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return theme.palette.success.main;
      case 'inactive':
        return theme.palette.error.main;
      case 'maintenance':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  if (loading && venues.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Manage Venues
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => {
              setNotification({
                open: true,
                message: 'CSV upload feature coming soon',
                severity: 'info',
              });
            }}
          >
            Import CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddVenue}
          >
            Add Venue
          </Button>
        </Box>
      </Box>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search venues by name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Venues Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Venue Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <TableRow key={venue.id} hover>
                  <TableCell>{venue.name}</TableCell>
                  <TableCell>{venue.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(venue.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(venue.status),
                        color: '#fff',
                      }}
                    />
                  </TableCell>
                  <TableCell>{venue.price}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="View Details">
                        <IconButton color="info" onClick={() => handleViewVenue(venue)}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Venue">
                        <IconButton color="primary" onClick={() => handleEditVenue(venue)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Venue">
                        <IconButton color="error" onClick={() => handleDeleteClick(venue.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" py={2}>
                    No venues found. Try adjusting your search or add a new venue.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Venue Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {currentVenue && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{currentVenue.name}</Typography>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Location</Typography>
                    <Typography variant="body1">{currentVenue.location}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
                    <Chip
                      label={getStatusLabel(currentVenue.status)}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(currentVenue.status),
                        color: '#fff',
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Price</Typography>
                    <Typography variant="body1">{currentVenue.price}</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Description</Typography>
                    <Typography variant="body1">{currentVenue.description}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Facilities</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {currentVenue.facilities.map((facility, index) => (
                        <Chip key={index} label={facility} size="small" />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Sport Categories</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {currentVenue.sportCategories.map((category, index) => (
                        <Chip key={index} label={category} size="small" color="primary" />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">Photos</Typography>
                    <Box sx={{ mt: 1 }}>
                      {currentVenue.photos && currentVenue.photos.length > 0 ? (
                        <Box
                          component="img"
                          src={currentVenue.photos[0]}
                          alt={currentVenue.name}
                          sx={{ width: '100%', borderRadius: 1 }}
                        />
                      ) : (
                        <Paper
                          sx={{
                            height: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f5f5f5',
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">No photos available</Typography>
                        </Paper>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => {
                  setOpenDialog(false);
                  handleEditVenue(currentVenue);
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add/Edit Venue Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '500px' },
            padding: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            {currentVenue ? 'Edit Venue' : 'Add New Venue'}
          </Typography>
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            required
            label="Venue Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            required
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <LocationIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            required
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end">/hour</InputAdornment>,
            }}
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Sport Category</InputLabel>
            <Select
              value={formData.sportCategories.length > 0 ? formData.sportCategories[0] : ''}
              onChange={handleSportCategoryChange}
              input={<OutlinedInput label="Sport Category" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  },
                },
              }}
            >
              {sportCategoriesOptions.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              label="Status"
            >
              {options.statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1">Facilities</Typography>
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            {facilitiesOptions.map((facility) => (
              <FormControlLabel
                key={facility}
                control={
                  <Checkbox
                    checked={formData.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                  />
                }
                label={facility}
              />
            ))}
          </FormGroup>

          <Button
            variant="outlined"
            startIcon={<ImageIcon />}
            sx={{ mt: 2 }}
            component="label"
          >
            Upload Photos
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Button>

          {formData.photos.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Box
                component="img"
                src={formData.photos[0]}
                alt="Venue"
                sx={{ width: '100%', borderRadius: 1 }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SaveIcon />}
              onClick={handleSaveVenue}
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {currentVenue ? 'Update Venue' : 'Save Venue'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmDialog.open} onClose={() => setDeleteConfirmDialog({ open: false, venueId: null })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this venue? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmDialog({ open: false, venueId: null })}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageVenues;
