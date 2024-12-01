import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'; // Ensure axios is installed
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { updateUser } from "../api/index";

const UpdateProfile = ({ open, onClose, userdata, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
  });
  const dispatch = useDispatch();

  // Populate formData with userdata only when the dialog opens for the first time
  useEffect(() => {
    if (open && userdata && !formData.firstName) {
      setFormData({
        id: userdata[0]?.id || '',
        firstName: userdata[0]?.firstName || '',
        lastName: userdata[0]?.lastName || '',
        email: userdata[0]?.email || '',
        userType: userdata[0]?.userType || '',
        phoneNo: userdata[0]?.phoneNo || '',
        address: userdata[0]?.address || '',
      });
    }
  }, [open, userdata]);

  // Save updated data and send it to the backend
  const handleSave = async () => {
    try {
      const response = await updateUser(formData);
      if (response.status === 200) {
        console.log('Profile updated successfully:', response.data);
        dispatch(
          openSnackbar({
            message: "Profile updated successfully",
            severity: "success",
          })
        );
        onClose();
        onUpdate(formData);
      } else {
        console.log('Error updating profile:', response.statusText);
        dispatch(
          openSnackbar({
            message: response.statusText,
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.error( error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          fullWidth
        />
     
        <TextField
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNo}
          onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} text="Cancel" />
        <Button onClick={handleSave} text="Save" />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfile;



