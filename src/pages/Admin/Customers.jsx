import React from 'react'
import AdminSidebar from '../../components/common/AdminSidebar'
import Header from '../../components/common/Header'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

function Customers() {
  return (
<>
      <Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Header />
          <Box height={60} />
          <Box sx={{ display: 'flex' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <h1>this is customer list </h1>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Customers
