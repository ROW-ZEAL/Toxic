import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { Box } from '@mui/material';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
