import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert, Checkbox, FormControlLabel, Paper } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../../features/admin/adminSlice';

const AdminRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminAcknowledgment: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adminAcknowledgment' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(registerAdmin(formData)).unwrap();
      setSuccessMessage(result.msg);
      // Clear form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminAcknowledgment: false
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Registration failed. Please try again.'
      }));
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
              <AdminPanelSettings sx={{ color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Admin Registration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Register for admin access. Your request will be reviewed by a super admin.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="adminAcknowledgment"
                  checked={formData.adminAcknowledgment}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="textSecondary">
                  I understand that this is a request for administrative access. My request will be reviewed by the system administrators.
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {errors.submit}
              </Typography>
            )}
            {successMessage ? (
              <Box sx={{ mt: 3, mb: 2 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.adminAcknowledgment}
              >
                Request Admin Access
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminRegistration;
