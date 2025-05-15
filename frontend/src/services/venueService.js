import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with authentication
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to parse price string to number
const parsePrice = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  if (typeof priceStr === 'string') {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  }
  return 0;
};

// Venue operations
export const venueService = {
  // Get all venues for the current user
  getVenues: async () => {
    try {
      const response = await api.get('/venues/');
      return response.data;
    } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
    }
  },

  // Get a single venue by ID
  getVenue: async (id) => {
    try {
      const response = await api.get(`/venues/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching venue ${id}:`, error);
      throw error;
    }
  },

  // Create a new venue
  createVenue: async (venueData) => {
    try {
      const dataToSend = {
        ...venueData,
        price_per_hour: parsePrice(venueData.price),
      };
      
      const response = await api.post('/venues/', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating venue:', error);
      throw error;
    }
  },

  // Update an existing venue
  updateVenue: async (id, venueData) => {
    try {
      const dataToSend = { ...venueData };
      if ('price' in dataToSend) {
        dataToSend.price_per_hour = parsePrice(dataToSend.price);
        delete dataToSend.price;
      }
      
      const response = await api.put(`/venues/${id}/`, dataToSend);
      return response.data;
    } catch (error) {
      console.error(`Error updating venue ${id}:`, error);
      throw error;
    }
  },

  // Delete a venue
  deleteVenue: async (id) => {
    try {
      await api.delete(`/venues/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting venue ${id}:`, error);
      throw error;
    }
  },

  // Get options for forms
  getVenueOptions: async () => {
    try {
      const [status, facilities, categories] = await Promise.all([
        api.get('/venue-options/status/'),
        api.get('/venue-options/facilities/'),
        api.get('/venue-options/sport-categories/'),
      ]);
      
      return {
        statusOptions: status.data.status_options || [],
        facilityOptions: facilities.data.facility_options || [],
        sportCategories: categories.data.sport_categories || [],
      };
    } catch (error) {
      console.error('Error fetching venue options:', error);
      // Return default options if API fails
      return {
        statusOptions: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'maintenance', label: 'Under Maintenance' },
        ],
        facilityOptions: [
          'Changing Rooms', 'Parking', 'Equipment Rental', 'Water Fountains',
          'Showers', 'Lockers', 'Floodlights', 'Seating Area', 'Cafeteria',
          'First Aid', 'WiFi', 'Locker Rooms', 'Towel Service', 'Air Conditioning'
        ],
        sportCategories: [
          'Tennis', 'Basketball', 'Swimming', 'Football', 'Soccer',
          'Badminton', 'Squash', 'Volleyball', 'Table Tennis', 'Cricket'
        ],
      };
    }
  },
};

export default venueService;
