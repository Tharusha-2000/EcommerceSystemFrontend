import React, { useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";
import Header from "../../components/common/Header";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid as MuiGrid,
} from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase.js";
import { createProduct } from "../../api"; // Import the createProduct function
import Swal from 'sweetalert2'; // Import SweetAlert2

function AddProduct() {
  const [sizePriceList, setSizePriceList] = useState([
    { size: "Small", price: "" },
    { size: "Medium", price: "" },
    { size: "Large", price: "" },
  ]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store the image URL
  const [isAvailable, setIsAvailable] = useState(false);
  const [categories, setCategories] = useState(""); // New state for categories
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});

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
      if (!row.price.trim()) {
        validationErrors[`price_${index}`] = "Price is required";
      }
    });
  
    if (categories.length === 0) {
      validationErrors.categories = "At least one category must be selected";
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
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

    updatedList[index][field] = value;

    setSizePriceList(updatedList);
  };

  const handleSubmit = async () => {

 
    if (!validateForm()) {
      return;

    }
  
    // Convert the size names to "S", "M", "L"
    const updatedSizeList = sizePriceList.map((row) => ({
      size: row.size === "Small" ? "S" : row.size === "Medium" ? "M" : "L",
      price: row.price,
    }));
  
    const productData = {
      name: productName,
      description: description,
      imageUrl: imageUrl,  // Send image URL as is
      isAvailable: isAvailable,
      sizes: updatedSizeList, // Use the updated size list
      categories: categories, // Send the categories array directly
    };
  
    try {
      console.log("hihgjf djkfnvkdf");
      const response = await createProduct(productData); // Use the createProduct function
      console.log("Product added successfully:", response.data);
      Swal.fire('Success', 'Product added successfully!', 'success');
  
      // Reset form
      setProductName("");
      setDescription("");
      setImageUrl("");
      setIsAvailable(false);
      setSizePriceList([
        { size: "Small", price: "" },
        { size: "Medium", price: "" },
        { size: "Large", price: "" },
      ]);
      setCategories([]); // Reset categories
      setErrors({});
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire('Error', 'An error occurred while adding the product.', 'error');
    }
  };
  


    

  const upload = () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
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
        alert('Error uploading image.');
      },
      () => {
        setTimeout(() => {
          setProgress(0);
        }, 2000);
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); // Save the image URL after upload
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
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
              <Typography variant="h4"  >
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
                        {progress > 0 && (
                          <div>
                            <progress value={progress} max="100" />
                            {progress}%
                          </div>
                        )}
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

                {/* Categories Input using checkboxes */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Select Categories
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {["Cheese", "Sausage", "Mushroom", "Chicken","Veg","pizza"].map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={categories.includes(category)}
                          onChange={(e) => {
                            setCategories((prevCategories) =>
                              e.target.checked
                                ? [...prevCategories, category]
                                : prevCategories.filter((item) => item !== category)
                            );
                          }}
                        />
                      }
                      label={category}
                    />
                  ))}
                </Box>

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
                    <Typography sx={{ width: "13em" }}>{row.size}</Typography>
                    <TextField
                      label="Price"
                      type="number"
                      variant="outlined"
                      value={row.price}
                      onChange={(e) => {
                        handleChange(index, "price", e.target.value);
                      }}
                      error={!!errors[`price_${index}`]}
                      helperText={errors[`price_${index}`]}
                      required
                    />
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
                      setSizePriceList([
                        { size: "Small", price: "" },
                        { size: "Medium", price: "" },
                        { size: "Large", price: "" },
                      ]);
                      setCategories(""); // Reset categories
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
