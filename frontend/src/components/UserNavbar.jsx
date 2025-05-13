import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Badge,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  LocationOn as VenueIcon,
  BookOnline as BookingIcon,
  Notifications as NotificationIcon,
  Person as ProfileIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  Star as RatingIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { unSetUserToken } from '../features/authSlice';
import { unsetUserInfo } from '../features/userSlice';
import { removeToken } from '../services/LocalStorageService';
import logo1 from '../assets/logo1.png';

const navItems = [
  { label: 'Home', icon: <HomeIcon fontSize="small" />, path: '/' },
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, path: '/dashboard' },
  { label: 'Venues', icon: <VenueIcon fontSize="small" />, path: '/venues' },
  { label: 'Bookings', icon: <BookingIcon fontSize="small" />, path: '/bookings' },
];

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user);

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: '', email: '', status: null }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        px: 4,
      }}
    >
      <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={logo1}
            alt="Logo"
            sx={{ height: 40, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          {/* Nav Items */}
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 15,
                px: 2,
                '&.active': {
                  color: 'primary.main',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Side: Notifications + Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notification Icon */}
          <IconButton
            color="default"
            onClick={(e) => setNotificationAnchor(e.currentTarget)}
          >
            <Badge badgeContent={3} color="error">
              <NotificationIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={() => setNotificationAnchor(null)}
          >
            <MenuItem>Booking Confirmed: Tennis Court #1</MenuItem>
            <MenuItem>New Offer Available: 20% Off</MenuItem>
            <MenuItem>Upcoming Booking Reminder</MenuItem>
          </Menu>

          {/* Profile Button */}
          <Button
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            startIcon={
              <Avatar sx={{ width: 32, height: 32 }}>
                {name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            }
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: 'text.primary',
              px: 2,
            }}
          >
            <Typography variant="body1">{name || 'Profile'}</Typography>
          </Button>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
          >
            <MenuItem onClick={() => { navigate('/profile'); setProfileAnchor(null); }}>
              <ProfileIcon sx={{ mr: 1 }} /> View Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/bookings/history'); setProfileAnchor(null); }}>
              <HistoryIcon sx={{ mr: 1 }} /> Booking History
            </MenuItem>
            <MenuItem onClick={() => { navigate('/favorites'); setProfileAnchor(null); }}>
              <FavoriteIcon sx={{ mr: 1 }} /> Favorites
            </MenuItem>
            <MenuItem onClick={() => { navigate('/reviews'); setProfileAnchor(null); }}>
              <RatingIcon sx={{ mr: 1 }} /> Reviews & Ratings
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;
