import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import image2 from '../../utils/Images/forgetpass.png';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PasswordChange } from "../../api/index";
import { useSearchParams } from 'react-router-dom';
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [values, setValues] =useState({
        password: '',
         confirmpassword: ''
     })
  const dispatch = useDispatch();
     
    console.log(token);
    console.log(email);

    const handleSubmit = (event) => {
        console.log(value);
        event.preventDefault();
        if (!value.email) {
            setError('result');
            Swal.fire({
                position: "top",
                text: "Please fill the required fields",
                customClass: { confirmButton: 'my-button' }
            });
            return;
        }
    }

    return (
    
        <main
            style={{
                backgroundImage: `url(${image2})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh', // make the main tag fill the entire height of the viewport
                display: 'flex', // add this
                justifyContent: 'center', // add this
                alignItems: 'center',
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    mx: 'auto', // margin left & right
                    my: 0, // margin top & bottom
                    py: 3, // increased padding top & bottom
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
            placeholder="Enter password"
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
          Create password
        </Button>
      </Paper>
    </main>

    );
}

export default ResetPassword;

