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
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase.js";
import { updateProduct } from '../../api'; // Import the updateProduct function

function UpdateProduct({ open, onClose, productData, onUpdate }) {
  const [productName, setProductName] = useState(productData.name || '');
  const [description, setDescription] = useState(productData.description || '');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(productData.imageUrl || '');
  const [isAvailable, setIsAvailable] = useState(productData.isAvailable || false);
  const [sizePriceList, setSizePriceList] = useState(productData.sizes || [{ size: '', price: '' }]);
  const [categories, setCategories] = useState(productData.categories?.join(', ') || ''); // Added categories state
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ open: false, type: '', message: '' });

  const selectedSizes = sizePriceList.map((row) => row.size);

  const validateForm = () => {
    const validationErrors = {};

    if (!productName.trim()) validationErrors.productName = 'Product Name is required';
    if (!description.trim()) validationErrors.description = 'Description is required';
    
    sizePriceList.forEach((row, index) => {
      if (!row.size.trim()) validationErrors[`size_${index}`] = 'Size is required';
      if (!row.price || row.price <= 0 || isNaN(row.price)) {
        validationErrors[`price_${index}`] = 'Price must be a positive number';
      }
    });

    if (!categories.trim()) validationErrors.categories = 'Categories are required'; // Validate categories

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
    updatedList[index][field] = value;
  
    // Handle price validation
    if (field === 'price' && value !== '' && (isNaN(value) || value <= 0)) {
      setErrors((prevErrors) => ({ ...prevErrors, [`price_${index}`]: 'Price must be a positive number' }));
      return;
    } else {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[`price_${index}`];
        return updatedErrors;
      });
    }
  
    setSizePriceList(updatedList);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setImageFile(file); // Store the file in the state
      setImageUrl(imageUrl); // Update the displayed image
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedProduct = {
      productId: productData.productId, // Include the productId
      name: productName,
      description,
      isAvailable,
      sizes: sizePriceList,
      imageUrl: imageUrl,
      categories: categories.split(',').map((cat) => cat.trim()), // Convert categories to array
    };

    // Handle image upload
    if (imageFile) {
      const imageRef = ref(storage, `product_images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on('state_changed', 
        (snapshot) => {},
        (error) => {
          setNotification({ open: true, type: 'error', message: 'Error uploading image' });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedProduct.imageUrl = downloadURL;
            updateProductData(updatedProduct);
          });
        }
      );
    } else {
      // If no image selected, proceed with the existing imageUrl
      updateProductData(updatedProduct);
    }
  };

  const updateProductData = async (updatedProduct) => {
    console.log(updatedProduct);
    try {
      await updateProduct(updatedProduct.productId, updatedProduct); // Use the updateProduct function
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
        <Typography variant="h4" gutterBottom>
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
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={!!errors.productName}
            helperText={errors.productName}
            required
          />
          <TextField
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

          {/* Categories Input */}
          <TextField
            label="Categories (comma separated)"
            variant="outlined"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            error={!!errors.categories}
            helperText={errors.categories}
            required
          />

          {/* Display the current product image */}
          {imageUrl && (
            <Box sx={{ p: 2 }}>
              <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
                <Box sx={{ p: 1, border: '1px dashed grey', width: '150px', height: '150px', borderRadius: 1 }}>
                  <img
                    src={imageUrl || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=1024x1024&w=is&k=20&c=5aen6wD1rsiMZSaVeJ9BWM4GGh5LE_9h97haNpUQN5I="}
                    alt="Product Image"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6">Select product image</Typography>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Box>
              </Box>
            </Box>
          )}

          {/* Sizes and Prices */}
          <Typography variant="h6" sx={{ mt: 3 }}>Sizes and Prices</Typography>
          {sizePriceList.map((row, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
             <TextField
                  select
                  label="Size"
                  value={row.size}
                  onChange={(e) => handleChange(index, 'size', e.target.value)}
                  variant="outlined"
                  error={!!errors[`size_${index}`]}
                  helperText={errors[`size_${index}`]}
                  required
                >
                  <MenuItem value="Small" disabled={selectedSizes.includes('Small') && row.size !== 'Small'}>Small</MenuItem>
                  <MenuItem value="Medium" disabled={selectedSizes.includes('Medium') && row.size !== 'Medium'}>Medium</MenuItem>
                  <MenuItem value="Large" disabled={selectedSizes.includes('Large') && row.size !== 'Large'}>Large</MenuItem>
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
              <IconButton onClick={handleAddRow} color="primary"><AddIcon /></IconButton>
              <IconButton onClick={() => handleRemoveRow(index)} color="error" disabled={sizePriceList.length === 1}><DeleteIcon /></IconButton>
            </Box>
          ))}

          <FormControlLabel
            control={<Checkbox checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />}
            label="Available"
          />

          <Box>
            <Button variant="contained" color="primary" type="submit">Update Product</Button>
            <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
          </Box>
        </Box>

        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseNotification} severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
}

export default UpdateProduct;