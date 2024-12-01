import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import Logo from '../../utils/Images/Logo1.png'; // Adjust the path to your logo image

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)', // Very low tone white gradient
}));

export default function Header() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.value) {
        dispatch(logout());
        navigate('/'); 
        // Add your logout logic here
        console.log('User logged out');
      }
    });
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={userLogout}>
        <IconButton color="inherit">
          <LogoutRoundedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
  <AppBar position="fixed">
    <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px' }}> {/* Adjust the minHeight value as needed */}
      {/* Box for Logo on the left */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={Logo} alt="Logo" style={{ height: '70px', marginRight: '1200px' }} />
      </Box>

      {/* Box for Admin Panel text */}
                      <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #B40614, #FF4D4D)', // Gradient background
                  padding: '5px 15px', // Smaller padding
                  borderRadius: '16px', // Rounder corners
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
                  marginX: 2, // Add horizontal margin
                }}
              >
                <Typography
                  variant="h6" // Smaller variant
                  noWrap
                  component="div"
                  sx={{
                    fontSize: '1.5rem', // Smaller font size
                    color: '#ffffff',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Glowing text effect
                    letterSpacing: '1px', // Reduced letter spacing
                    textTransform: 'uppercase',
                  }}
                >
                  Admin Panel
                </Typography>
              </Box>
              {/* Box for Logout Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="account of current user"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={userLogout}
                  sx={{
                    color: 'black',
                    fontSize: '2.5rem',
                    ml: 0,
                    backgroundColor: '#f0f0f0',
                    borderRadius: '50%',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    },
                  }} // Adjust the font size and add left margin
                >
                  <LogoutRoundedIcon fontSize="inherit" />
                </IconButton>
              </Box>
    </Toolbar>
  </AppBar>
  {renderMobileMenu}
</Box>
  );
}