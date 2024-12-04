import React, { useState } from 'react'; 
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../../firebase.js";
import { updateProduct } from '../../api/index.js'; 
import Swal from 'sweetalert2'; 

function UpdateProduct({ open, onClose, productData, onUpdate }) {
  const [productName, setProductName] = useState(productData.name || '');
  const [description, setDescription] = useState(productData.description || '');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(productData.imageUrl || '');
  const [isAvailable, setIsAvailable] = useState(productData.isAvailable || false);
  const [sizePriceList, setSizePriceList] = useState(productData.sizes || [{ size: '', price: '' }]);
  const [selectedCategories, setSelectedCategories] = useState(productData.categories || []); // Categories as array
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const allCategories = ['Cheese', 'Sausage', 'Mushroom', 'Chicken','Veg','pizza'];

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

    if (selectedCategories.length === 0) validationErrors.categories = 'At least one category must be selected'; 

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category) // Deselect category
        : [...prevSelectedCategories, category] // Select category
    );
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
      categories: selectedCategories, // Send selected categories as array
    };

    // Handle image upload
    if (imageFile) {
      const imageRef = ref(storage, `product_images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);

      uploadTask.on('state_changed', 
        (snapshot) => {},
        (error) => {
          Swal.fire('Error', 'Error uploading image', 'error');
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
      Swal.fire('Success', 'Product updated successfully!', 'success');
      onUpdate(updatedProduct);
      setTimeout(() => {
        onClose();
      }, 6000);
    } catch (error) {
      Swal.fire('Error', 'An error occurred while updating the product.', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-product-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : '50%',
          maxWidth: '80vw',
          maxHeight: '95vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 1,
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

          {/* Categories Checkboxes */}
          <Typography variant="h6" sx={{ mt: 2 }}>Categories</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            {allCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </Box>
          {errors.categories && (
            <Typography color="error" variant="body2">{errors.categories}</Typography>
          )}

          {/* Display the current product image */}
          {imageUrl && (
            <Box sx={{ p: 2 }}>
              <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
                <Box sx={{ p: 1, border: '1px dashed grey', width: '100px', height: '100px', borderRadius: 1 }}>
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

          <Typography variant="h8" sx={{ mt: 1 }}>Sizes and Prices</Typography>
          {sizePriceList.map((row, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ width: '80px' }}>
                {row.size === 'S' ? 'Small' : row.size === 'M' ? 'Medium' : 'Large'}
              </Typography>

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
            </Box>
          ))}

          <FormControlLabel
            control={<Checkbox checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />}
            label="Available"
          />

          <Box>
            <Button variant="contained" type="submit" sx={{ background: '#FF3D4D' }}>Update Product</Button>
            <Button variant="contained" sx={{ background: '#333333', ml:2 }} onClick={onClose}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default UpdateProduct;
