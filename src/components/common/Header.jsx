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
import Logo from '../../utils/Images/Logo1.png'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
}));

export default function Header() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMoreOpen = Boolean(mobileMoreAnchorEl);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();

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
      }
    });
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMoreOpen}
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
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px', px: 2, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '70px', marginLeft: isMobile ? '10px' : '0' }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 10 } }}>
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.5rem' },
                  fontWeight: 'bold',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #B40614, #FF4D4D)',
                  padding: { xs: '3px 10px', sm: '5px 15px' },
                  borderRadius: '16px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Admin Panel
              </Typography>
            )}

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={isMobile ? handleMobileMenuOpen : userLogout}
              sx={{
                color: 'black',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                },
              }}
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
