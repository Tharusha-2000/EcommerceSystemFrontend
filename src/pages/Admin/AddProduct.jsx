import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function AddProduct() {
  const [sizePriceList, setSizePriceList] = useState([{ size: '', price: '' }]);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const [errors, setErrors] = useState({}); // State to track form errors

  const selectedSizes = sizePriceList.map((row) => row.size);

  const validateForm = () => {
    const validationErrors = {};

    if (!productName.trim()) {
      validationErrors.productName = 'Product Name is required';
    }

    if (!description.trim()) {
      validationErrors.description = 'Description is required';
    }

    if (!imageUrl.trim()) {
      validationErrors.imageUrl = 'Image URL is required';
    }

    sizePriceList.forEach((row, index) => {
      if (!row.size.trim()) {
        validationErrors[`size_${index}`] = 'Size is required';
      }
      if (!row.price.trim()) {
        validationErrors[`price_${index}`] = 'Price is required';
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
  
    if (field === 'price') {
      if (value !== '' && (isNaN(value) || value <= 0)) {
        setErrors({ ...errors, [`price_${index}`]: 'Price must be a positive integer' });
        return;
      } else {
        const updatedErrors = { ...errors };
        delete updatedErrors[`price_${index}`];
        setErrors(updatedErrors);
      }
    }
  
    // Set the updated value for size or price
    updatedList[index][field] = value;
  
    // Clear the error if the field is valid
    if (field === 'size' && value.trim()) {
      const updatedErrors = { ...errors };
      delete updatedErrors[`size_${index}`];
      setErrors(updatedErrors);
    }
  
    setSizePriceList(updatedList);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: productName,
      description: description,
      imageUrl: imageUrl,
      isAvailable: isAvailable,
      sizes: sizePriceList,
    };

    try {
      const response = await axios.post('http://your-backend-url/api/products', productData);
      console.log('Product added successfully:', response.data);
      alert('Product added successfully!');

      // Reset form
      setProductName('');
      setDescription('');
      setImageUrl('');
      setIsAvailable(false);
      setSizePriceList([{ size: '', price: '' }]);
      setErrors({});
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <>
      <Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Header />
          <Box height={60} />
          <Box sx={{ display: 'flex' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Add New Product
              </Typography>

              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  id="product-name"
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  sx={{width:'10em'}}
                  onChange={(e) => setProductName(e.target.value)}
                  error={!!errors.productName}
                  helperText={errors.productName}
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
                  disabled={!productName.trim()} // Disabled until Product Name is filled
                />

                <TextField
                  id="image-url"
                  label="Image URL"
                  variant="outlined"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl}
                  disabled={!description.trim()} // Disabled until Description is filled
                  sx={{ width: '400em' }} 
                />

                <Typography variant="h8" sx={{ mt: 3 }}>
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
                      onChange={(e) => {
                        handleChange(index, 'size', e.target.value);
                        const updatedErrors = { ...errors };
                        delete updatedErrors[`size_${index}`];
                        setErrors(updatedErrors);
                      }}
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

                    {/* Price Field */}
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      value={row.price}
                      onChange={(e) => {
                        handleChange(index, 'price', e.target.value);
                        const updatedErrors = { ...errors };
                        delete updatedErrors[`price_${index}`];
                        setErrors(updatedErrors);
                      }}
                      error={!!errors[`price_${index}`]}
                      helperText={errors[`price_${index}`]}
                      disabled={!row.size.trim()} // Disabled until Size is selected
                      required
                    />

                    <IconButton onClick={handleAddRow} color="primary" disabled={!row.price.trim()}>
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
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    sx={{ width: '10em', mr: 3 }}
                  >
                    Add Product
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="reset"
                    sx={{ width: '10em' }}
                    onClick={() => {
                      setProductName('');
                      setDescription('');
                      setImageUrl('');
                      setIsAvailable(false);
                      setSizePriceList([{ size: '', price: '' }]);
                      setErrors({});
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AddProduct;
