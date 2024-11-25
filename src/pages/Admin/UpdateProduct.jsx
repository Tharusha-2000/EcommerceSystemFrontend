import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function UpdateProduct({ open, onClose, productData, onUpdate }) {
  const [productName, setProductName] = useState(productData.name || '');
  const [description, setDescription] = useState(productData.description || '');
  const [imageUrl, setImageUrl] = useState(productData.imageUrl || '');
  const [isAvailable, setIsAvailable] = useState(productData.isAvailable || false);
  const [sizePriceList, setSizePriceList] = useState(productData.sizes || [{ size: '', price: '' }]);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });

  const selectedSizes = sizePriceList.map((row) => row.size);

  const validateForm = () => {
    const validationErrors = {};
  
    if (!productName.trim()) {
      validationErrors.productName = 'Product Name is required';
    }
    if (!description.trim()) {
      validationErrors.description = 'Description is required';
    }
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    if (!imageUrl.trim()) {
      validationErrors.imageUrl = 'Image URL is required';
    } else if (!urlRegex.test(imageUrl)) {
      validationErrors.imageUrl = 'Invalid URL format';
    }
  
    sizePriceList.forEach((row, index) => {
      if (!row.size.trim()) {
        validationErrors[`size_${index}`] = 'Size is required';
      }
      if (row.price === '' || row.price == null) {
        validationErrors[`price_${index}`] = 'Price is required';
      } else if (isNaN(row.price) || row.price <= 0) {
        validationErrors[`price_${index}`] = 'Price must be a positive number';
      }
    });
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  

  const handleAddRow = () => {
    setSizePriceList([...sizePriceList, { size: '', price: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedList = sizePriceList.filter((_, i) => i !== index);
    setSizePriceList(updatedList);
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...sizePriceList];

    if (field === 'price' && value !== '' && (isNaN(value) || value <= 0)) {
      setErrors({ ...errors, [`price_${index}`]: 'Price must be a positive number' });
      return;
    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors[`price_${index}`];
      setErrors(updatedErrors);
    }

    updatedList[index][field] = value;

    if (field === 'size' && value.trim()) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`size_${index}`];
      setErrors(updatedErrors);
    }

    setSizePriceList(updatedList);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const updatedProduct = {
      name: productName,
      description: description,
      imageUrl: imageUrl,
      isAvailable: isAvailable,
      sizes: sizePriceList,
    };

    try {
      await axios.put('http://your-backend-url/api/products', updatedProduct);
      setNotification({ open: true, type: 'success', message: 'Product updated successfully!' });
      onUpdate(updatedProduct);
      setTimeout(() => {
        setNotification({ open: false, type: '', message: '' });
        onClose();
      }, 6000);
    } catch (error) {
      setNotification({ open: true, type: 'error', message: 'An error occurred while updating the product.' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, type: '', message: '' });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-product-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="update-product-modal" variant="h4" gutterBottom>
          Update Product
        </Typography>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleUpdate}
        >
          <TextField
            id="product-name"
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={!!errors.productName}
            helperText={errors.productName}
            required
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            required
          />
          <TextField
            id="image-url"
            label="Image URL"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
            required
          />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Sizes and Prices
          </Typography>
          {sizePriceList.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                select
                label="Size"
                value={row.size}
                onChange={(e) => handleChange(index, 'size', e.target.value)}
                variant="outlined"
                sx={{ width: '13em' }}
                error={!!errors[`size_${index}`]}
                helperText={errors[`size_${index}`]}
                required
              >
                <MenuItem value="Small" disabled={selectedSizes.includes('Small') && row.size !== 'Small'}>
                  Small
                </MenuItem>
                <MenuItem value="Medium" disabled={selectedSizes.includes('Medium') && row.size !== 'Medium'}>
                  Medium
                </MenuItem>
                <MenuItem value="Large" disabled={selectedSizes.includes('Large') && row.size !== 'Large'}>
                  Large
                </MenuItem>
              </TextField>
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                value={row.price}
                onChange={(e) => handleChange(index, 'price', e.target.value)}
                error={!!errors[`price_${index}`]}
                helperText={errors[`price_${index}`]}
                required
              />
              <IconButton onClick={handleAddRow} color="primary">
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => handleRemoveRow(index)}
                color="error"
                disabled={sizePriceList.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <FormControlLabel
            control={
              <Checkbox
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
            }
            label="Available"
          />
          <Box>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '10em', mr: 3 }}>
              Update Product
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose} sx={{ width: '10em' }}>
              Cancel
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}

export default UpdateProduct;
