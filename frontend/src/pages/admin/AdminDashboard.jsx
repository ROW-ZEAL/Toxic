import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  EventAvailable as EventIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingIcon,
  LocationOn as VenueIcon,
  Notifications as NotificationIcon,
  MoreVert as MoreIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const theme = useTheme();

  // Gradient backgrounds for cards
  const gradients = {
    blue: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    green: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    orange: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    purple: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
  };
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      change: '+12%',
    },
    {
      title: 'Active Bookings',
      value: '156',
      icon: <EventIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      change: '+5%',
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: <MoneyIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
      change: '+8%',
    },
    {
      title: 'Total Venues',
      value: '45',
      icon: <VenueIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      change: '+2',
    },
  ];

  const bookingStats = [
    { label: 'Pending', value: 45, color: theme.palette.warning.main },
    { label: 'Confirmed', value: 85, color: theme.palette.success.main },
    { label: 'Cancelled', value: 12, color: theme.palette.error.main },
  ];

  const recentBookings = [
    {
      id: 1,
      user: 'John Doe',
      venue: 'Tennis Court A',
      time: '2:00 PM - 4:00 PM',
      status: 'confirmed',
      amount: '$45',
    },
    {
      id: 2,
      user: 'Alice Smith',
      venue: 'Basketball Court',
      time: '5:00 PM - 7:00 PM',
      status: 'pending',
      amount: '$60',
    },
    {
      id: 3,
      user: 'Bob Wilson',
      venue: 'Swimming Pool',
      time: '9:00 AM - 10:00 AM',
      status: 'cancelled',
      amount: '$30',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckIcon sx={{ color: theme.palette.success.main }} />;
      case 'pending':
        return <PendingIcon sx={{ color: theme.palette.warning.main }} />;
      case 'cancelled':
        return <CancelIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return null;
    }
  };

  const popularVenues = [
    {
      name: 'Tennis Court A',
      bookings: 156,
      rating: 4.8,
      revenue: '$3,450',
      image: 'https://source.unsplash.com/800x600/?tennis',
    },
    {
      name: 'Basketball Court',
      bookings: 142,
      rating: 4.6,
      revenue: '$2,850',
      image: 'https://source.unsplash.com/800x600/?basketball',
    },
    {
      name: 'Swimming Pool',
      bookings: 98,
      rating: 4.9,
      revenue: '$4,200',
      image: 'https://source.unsplash.com/800x600/?swimming',
    },
  ];

  const upcomingMaintenance = [
    {
      venue: 'Tennis Court A',
      date: '2025-05-15',
      type: 'Regular Maintenance',
      status: 'scheduled',
      duration: '2 hours',
    },
    {
      venue: 'Swimming Pool',
      date: '2025-05-16',
      type: 'Deep Cleaning',
      status: 'pending',
      duration: '4 hours',
    },
    {
      venue: 'Basketball Court',
      date: '2025-05-18',
      type: 'Equipment Check',
      status: 'confirmed',
      duration: '1.5 hours',
    },
  ];

  const recentReviews = [
    {
      user: 'John D.',
      venue: 'Tennis Court A',
      rating: 5,
      comment: 'Excellent facilities and great service!',
      date: '2025-05-12',
    },
    {
      user: 'Sarah M.',
      venue: 'Basketball Court',
      rating: 4,
      comment: 'Good court, but could use better lighting.',
      date: '2025-05-11',
    },
    {
      user: 'Mike R.',
      venue: 'Swimming Pool',
      rating: 5,
      comment: 'Very clean and well maintained.',
      date: '2025-05-10',
    },
  ];

  const recentActivities = [
    'New booking request from John Doe',
    'Payment received for Tennis Court #3',
    'New venue added: Basketball Court',
    'User feedback received for Swimming Pool',
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Welcome to Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
          const gradientKey = Object.keys(gradients)[index % Object.keys(gradients).length];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: gradients[gradientKey],
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 500 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        width: 52,
                        height: 52,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {stat.change.includes('+') ? 
                      <ArrowUpIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', mr: 1, fontSize: 20 }} /> : 
                      <ArrowDownIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', mr: 1, fontSize: 20 }} />
                    }
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.change} from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Booking Stats and Recent Bookings */}
      <Grid container spacing={3}>
        {/* Booking Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Booking Statistics</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              
              {bookingStats.map((stat, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {stat.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stat.value}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: `${stat.color}22`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Recent Bookings</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              
              <List sx={{ width: '100%' }}>
                {recentBookings.map((booking, index) => (
                  <React.Fragment key={booking.id}>
                    <ListItem
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {booking.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2">{booking.user}</Typography>
                            <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                              {booking.amount}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                              {booking.venue} • {booking.time}
                            </Typography>
                            {getStatusIcon(booking.status)}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentBookings.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Popular Venues Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Popular Venues</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                {popularVenues.map((venue, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card elevation={2}>
                      <Box
                        sx={{
                          height: 160,
                          backgroundImage: `url(${venue.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                          },
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {venue.name}
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Bookings
                            </Typography>
                            <Typography variant="h6">{venue.bookings}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Revenue
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                              {venue.revenue}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance and Reviews Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Upcoming Maintenance</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              <List>
                {upcomingMaintenance.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2">{item.venue}</Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: item.status === 'confirmed' ? 'success.light' : 'warning.light',
                                color: item.status === 'confirmed' ? 'success.dark' : 'warning.dark',
                              }}
                            >
                              {item.status}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {item.type} • {item.duration}
                            </Typography>
                            <Typography variant="body2" color="primary.main">
                              {new Date(item.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < upcomingMaintenance.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Recent Reviews</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              <List>
                {recentReviews.map((review, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {review.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2">
                              {review.user} • {review.venue}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  sx={{
                                    fontSize: 16,
                                    color: i < review.rating ? 'warning.main' : 'action.disabled',
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {review.comment}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(review.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentReviews.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Recent Activities</Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                {recentActivities.map((activity, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        '&:hover': {
                          boxShadow: 1,
                          bgcolor: 'background.paper',
                        },
                      }}
                    >
                      <Typography variant="body2">{activity}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
