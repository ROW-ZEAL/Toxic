import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Admin Login Thunk
export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/admin/login/', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login'
      );
    }
  }
);

// Async thunk for admin registration
export const registerAdmin = createAsyncThunk(
  'admin/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/register/', {
        name: formData.fullName,  // Changed from full_name to name to match backend
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
        tc: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register admin'
      );
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    adminInfo: null,
    registrationSuccess: false
  },
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isAuthenticated = false;
      state.adminInfo = null;
      state.registrationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register Admin cases
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login Admin cases
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.adminInfo = action.payload.user;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.adminInfo = null;
      });
  }
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
