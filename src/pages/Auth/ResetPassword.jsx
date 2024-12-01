import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import image2 from '../../utils/Images/forgetpass.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PasswordChange } from "../../api/index";
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    password: '',
    confirmpassword: ''
  });

  const validateForm = () => {
    const { password, confirmpassword } = values;

    if (!password || !confirmpassword) {
      dispatch(
        openSnackbar({
          message: "All fields are required.",
          severity: "error",
        })
      );
      return false;
    }

    if (password.length < 8) {
      dispatch(
        openSnackbar({
          message: "Password must be at least 8 characters long.",
          severity: "error",
        })
      );
      return false;
    }

    if (password !== confirmpassword) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      return;
    }

    try {
      console.log('token:', token);
      const response = await PasswordChange({ email,token, newPassword: values.password });
      dispatch(
        openSnackbar({
          message: response.message || "Password updated successfully!",
          severity: "success",
        })
      );
      navigate('/'); 
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          message: error.response?.data?.message || "Failed to update password.",
          severity: "error",
        })
      );
    }
  };

  return (
    <main
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          py: 3,
          px: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'rgba(178, 190, 181, 0.73)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 'lg',
          },
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h5" component="h3">
            <b>Create New Password</b>
          </Typography>
          <br />
        </div>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmpassword"
            type="password"
            placeholder="Confirm password"
            onChange={(e) =>
              setValues({ ...values, confirmpassword: e.target.value })
            }
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Create Password
        </Button>
      </Paper>
    </main>
  );
};

export default ResetPassword;


