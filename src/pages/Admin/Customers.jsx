import React from 'react';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserTable from '../../components/UserTable';
import { Card as JoyCard, CardContent as JoyCardContent, Typography as JoyTypography } from '@mui/joy';

function Customers() {
  return (
    <Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Header />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Box sx={{ width: '90%', margin: 'auto' }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <JoyTypography level="h1" fontWeight="bold" sx={{ mb: 2 }}>
                  All Customers
                </JoyTypography>
              </Box>
              <UserTable />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Customers;