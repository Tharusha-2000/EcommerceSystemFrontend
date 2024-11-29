import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog'; // Ensure @mui/material is installed
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';

const UpdateProfile = ({ open, onClose, userdata, onUpdate }) => {
  const [data, setData] = useState(userdata);
 
  console.log("hi");
  console.log(data);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(formData); // Callback to save updated data
    onClose(); // Close dialog
  };

  return (
  
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="First Name"
          name="firstName"
          value= {userdata[0].firstName}
        //   onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Last Name"
          name="lastName"
        //   value={formData.lastName}
        //   onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Email"
          name="email"
        //   value={formData.email}
        //   onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
        //   value={formData.address}
        //   onChange={handleChange}
          fullWidth
        />
          <TextField
          margin="normal"
          label="Address"
          name="address"
        //   value={formData.address}
        //   onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} text="Cancel" />
        <Button onClick={handleSave} text="Save"/>

      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfile;
