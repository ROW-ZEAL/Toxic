import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocationOn as VenueIcon,
  BookOnline as BookingIcon,
  People as UserIcon,
  Analytics as AnalyticsIcon,
  Payment as PaymentIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { unSetUserToken } from '../features/authSlice';
import { unsetUserInfo } from '../features/userSlice';
import { removeToken } from '../services/LocalStorageService';
import logo1 from '../assets/logo1.png';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [venueAnchor, setVenueAnchor] = useState(null);
  const [bookingAnchor, setBookingAnchor] = useState(null);
  const [analyticsAnchor, setAnalyticsAnchor] = useState(null);

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: '', email: '', status: null }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate('/');
  };

  const linkStyles = {
    color: 'text.primary',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '15px',
    px: 2,
    py: 1,
    '&.active': {
      color: theme.palette.primary.main,
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  };

  return (
    <AppBar position="sticky" elevation={1} color="default">
      <Toolbar sx={{ px: 4, display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component="img"
          src={logo1}
          alt="Admin Logo"
          sx={{ height: 40, mr: 3, cursor: 'pointer' }}
          onClick={() => navigate('/admin/dashboard')}
        />

        {/* Navigation */}
        <Button component={NavLink} to="/admin/dashboard" startIcon={<DashboardIcon />} sx={linkStyles}>
          Dashboard
        </Button>

        <Button
          onClick={(e) => setVenueAnchor(e.currentTarget)}
          endIcon={<ArrowDownIcon />}
          startIcon={<VenueIcon />}
          sx={linkStyles}
        >
          Venue Management
        </Button>
        <Menu anchorEl={venueAnchor} open={Boolean(venueAnchor)} onClose={() => setVenueAnchor(null)}>
          <MenuItem onClick={() => { navigate('/admin/venues/manage'); setVenueAnchor(null); }}>
            Manage Venues
          </MenuItem>
          <MenuItem onClick={() => { navigate('/admin/venues/slots'); setVenueAnchor(null); }}>
            Slot Management
          </MenuItem>
          <MenuItem onClick={() => { navigate('/admin/venues/offers'); setVenueAnchor(null); }}>
            Discounts & Offers
          </MenuItem>
        </Menu>

        <Button
          onClick={(e) => setBookingAnchor(e.currentTarget)}
          endIcon={<ArrowDownIcon />}
          startIcon={<BookingIcon />}
          sx={linkStyles}
        >
          Bookings
        </Button>
        <Menu anchorEl={bookingAnchor} open={Boolean(bookingAnchor)} onClose={() => setBookingAnchor(null)}>
          <MenuItem onClick={() => { navigate('/admin/bookings/requests'); setBookingAnchor(null); }}>
            Booking Requests
          </MenuItem>
          <MenuItem onClick={() => { navigate('/admin/bookings/history'); setBookingAnchor(null); }}>
            Booking History
          </MenuItem>
        </Menu>

        <Button component={NavLink} to="/admin/users" startIcon={<UserIcon />} sx={linkStyles}>
          User Management
        </Button>

        <Button
          onClick={(e) => setAnalyticsAnchor(e.currentTarget)}
          endIcon={<ArrowDownIcon />}
          startIcon={<AnalyticsIcon />}
          sx={linkStyles}
        >
          Analytics
        </Button>
        <Menu anchorEl={analyticsAnchor} open={Boolean(analyticsAnchor)} onClose={() => setAnalyticsAnchor(null)}>
          <MenuItem onClick={() => { navigate('/admin/analytics/revenue'); setAnalyticsAnchor(null); }}>
            Revenue Reports
          </MenuItem>
          <MenuItem onClick={() => { navigate('/admin/analytics/trends'); setAnalyticsAnchor(null); }}>
            Occupancy & Trends
          </MenuItem>
        </Menu>

        <Button component={NavLink} to="/admin/payments" startIcon={<PaymentIcon />} sx={linkStyles}>
          Payments
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {/* Logout */}
        <IconButton color="error" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
