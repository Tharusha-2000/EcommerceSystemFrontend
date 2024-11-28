import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'

const drawerWidth = 240

function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          background: 'linear-gradient(45deg, #333, #555)', 
          color: 'white' 
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Products', icon: <DashboardIcon />, path: '/admin/products' },
          { text: 'Orders', icon: <ShoppingCartIcon />, path: '/admin/orders' },
          { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
          { text: 'Reports', icon: <BarChartIcon />, path: '/admin/reports' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
        ].map((item, index) => (
          <ListItem button component={Link} to={item.path} key={index} sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default AdminSidebar