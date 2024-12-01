import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import StorefrontIcon from '@mui/icons-material/Storefront';

const drawerWidth = 240;

function AdminSidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          background: 'linear-gradient(145deg, #ffffff, #e6e6e6)', 
          color: '#333',
          borderRight: '1px solid #ddd',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Toolbar sx={{ background: 'linear-gradient(145deg, #f5f5f5, #e6e6e6)', borderBottom: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
       
      </Toolbar>
      <List sx={{ mt: 8.5 }}> {/* Add margin-top to move the tabs down */}
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Products', icon: <StorefrontIcon />, path: '/admin/products' },
          { text: 'Orders', icon: <ShoppingCartIcon />, path: '/admin/orders' },
          { text: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
          { text: 'Feedbacks', icon: <BarChartIcon />, path: '/admin/feedbacks' }
      
   
        ].map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            sx={{
              color: location.pathname === item.path ? '#fff' : '#333',
              backgroundColor: location.pathname === item.path ? '#B40614' : 'transparent',
              boxShadow: location.pathname === item.path ? '0 0 10px #B40614' : 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#fff' : '#333' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                textShadow: location.pathname === item.path ? '0 0 10px #B40614' : 'none',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default AdminSidebar;