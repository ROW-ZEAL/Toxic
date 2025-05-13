import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../features/userSlice';
import { Box, Button, TextField, Typography, Container, Alert, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { loginAdmin } from '../../features/admin/adminSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await dispatch(loginAdmin(formData)).unwrap();
      
      // Store the token and user info
      localStorage.setItem('adminToken', result.token.access);
      dispatch(setUserInfo({
        email: result.user.email,
        name: result.user.name,
        is_admin: true
      }));
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message || 'You are not authorized for admin access');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ 
              backgroundColor: 'primary.main', 
              borderRadius: '50%', 
              p: 1, 
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LockOutlined sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Admin Login
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Need admin access?{' '}
              <Link 
                to="/admin/register"
                style={{ 
                  color: '#1976d2', // Material-UI blue
                  textDecoration: 'none',
                  fontWeight: 'medium',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Request here
              </Link>
            </Typography>
          </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
