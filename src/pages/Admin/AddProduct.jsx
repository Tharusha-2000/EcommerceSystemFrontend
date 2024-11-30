import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/common/AdminSidebar";
import Header from "../../components/common/Header";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase.js";

function AddProduct() {
  const [sizePriceList, setSizePriceList] = useState([{ size: "", price: "" }]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  // Image upload
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const [errors, setErrors] = useState({}); // State to track form errors

  const selectedSizes = sizePriceList.map((row) => row.size);

  const validateForm = () => {
    const validationErrors = {};

    if (!productName.trim()) {
      validationErrors.productName = "Product Name is required";
    }

    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (!imageUrl.trim()) {
      validationErrors.imageUrl = "Image URL is required";
    }

    sizePriceList.forEach((row, index) => {
      if (!row.size.trim()) {
        validationErrors[`size_${index}`] = "Size is required";
      }
      if (!row.price.trim()) {
        validationErrors[`price_${index}`] = "Price is required";
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAddRow = () => {
    setSizePriceList([...sizePriceList, { size: "", price: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedList = sizePriceList.filter((_, i) => i !== index);
    setSizePriceList(updatedList);
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...sizePriceList];

    if (field === "price") {
      if (value !== "" && (isNaN(value) || value <= 0)) {
        setErrors({
          ...errors,
          [`price_${index}`]: "Price must be a positive integer",
        });
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
    if (field === "size" && value.trim()) {
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
      const response = await axios.post(
        "http://your-backend-url/api/products",
        productData
      );
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");

      // Reset form
      setProductName("");
      setDescription("");
      setImageUrl("");
      setIsAvailable(false);
      setSizePriceList([{ size: "", price: "" }]);
      setErrors({});
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const upload = () => {
    if (!image) {
      return;
    }
    console.log(">>>");
    const imagePath = `product/${image.name + uuidv4()}`;
    const imageRef = ref(storage, imagePath);
    const uploadFile = uploadBytesResumable(imageRef, image);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log("error while uploading file", err);
      },
      () => {
        setTimeout(() => {
          setProgress(0);
        }, 2000);
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          console.log(imagePath);
          // Save the path of the uploaded image

          setImageUrl(downloadURL);
          console.log(downloadURL);
          console.log(imageUrl);
        });
        setImage(null);
      }
    );
  };

  return (
    <>
      <Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Header />
          <Box height={60} />
          <Box sx={{ display: "flex" }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Add New Product
              </Typography>

              <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Box component="section" sx={{ p: 2, width: "100%" }}>
                  <Box
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      component="section"
                      sx={{
                        p: 1,
                        border: "1px dashed grey",
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={
                          imageUrl ||
                          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=1024x1024&w=is&k=20&c=5aen6wD1rsiMZSaVeJ9BWM4GGh5LE_9h97haNpUQN5I="
                        }
                        alt="Product Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ px: 1 }}>
                        Select product image
                      </Typography>
                      <div>
                        <input
                          type="file"
                          onChange={(event) => {
                            setImage(event.target.files[0]);
                          }}
                        />
                        <Button variant="contained" onClick={upload}>
                          Upload Image
                        </Button>
                        { progress > 0 &&
                          <div>
                            <progress value={progress} max="100" />
                            {progress}%
                          </div>
                        }
                      </div>
                    </Box>
                  </Box>
                </Box>

                <TextField
                  id="product-name"
                  label="Product Name"
                  variant="outlined"
                  value={productName}
                  sx={{ width: "10em" }}
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
                  sx={{ width: "400em" }}
                />

                <Typography variant="h8" sx={{ mt: 3 }}>
                  Sizes and Prices
                </Typography>
                {sizePriceList.map((row, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <TextField
                      select
                      label="Size"
                      value={row.size}
                      onChange={(e) => {
                        handleChange(index, "size", e.target.value);
                        const updatedErrors = { ...errors };
                        delete updatedErrors[`size_${index}`];
                        setErrors(updatedErrors);
                      }}
                      variant="outlined"
                      sx={{ width: "13em" }}
                      error={!!errors[`size_${index}`]}
                      helperText={errors[`size_${index}`]}
                      required
                    >
                      <MenuItem
                        value="Small"
                        disabled={
                          selectedSizes.includes("Small") &&
                          row.size !== "Small"
                        }
                      >
                        Small
                      </MenuItem>
                      <MenuItem
                        value="Medium"
                        disabled={
                          selectedSizes.includes("Medium") &&
                          row.size !== "Medium"
                        }
                      >
                        Medium
                      </MenuItem>
                      <MenuItem
                        value="Large"
                        disabled={
                          selectedSizes.includes("Large") &&
                          row.size !== "Large"
                        }
                      >
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
                        handleChange(index, "price", e.target.value);
                        const updatedErrors = { ...errors };
                        delete updatedErrors[`price_${index}`];
                        setErrors(updatedErrors);
                      }}
                      error={!!errors[`price_${index}`]}
                      helperText={errors[`price_${index}`]}
                      disabled={!row.size.trim()} // Disabled until Size is selected
                      required
                    />

                    <IconButton
                      onClick={handleAddRow}
                      color="primary"
                      disabled={!row.price.trim()}
                    >
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
                    sx={{ width: "10em", mr: 3 }}
                  >
                    Add Product
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="reset"
                    sx={{ width: "10em" }}
                    onClick={() => {
                      setProductName("");
                      setDescription("");
                      setImageUrl("");
                      setIsAvailable(false);
                      setSizePriceList([{ size: "", price: "" }]);
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
