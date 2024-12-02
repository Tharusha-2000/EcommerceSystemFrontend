import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import AdminOverview from '../../components/AdminOverview';

function AdminDashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 0 }}> {/* Adjust the margin-top value as needed */}
        <AdminOverview />
      </Box>
    </Box>
  );
}

export default AdminDashboard;