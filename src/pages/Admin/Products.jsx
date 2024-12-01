import AdminSidebar from '../../components/common/AdminSidebar'; 
import Header from '../../components/common/Header';
import Grid from '@mui/material/Grid';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import { getAllProducts, deleteProduct } from '../../api'; // Import the API functions

const Products = () => {
  const [data, setData] = useState([]); // State to store product data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
  const navigate = useNavigate();

  // Fetch products data from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          setData(response.data); // Set fetched data
          console.log('Fetched products:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Please try again.');
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        alert('Product deleted successfully!');
        // Fetch the updated list of products after deletion
        const updatedProducts = await getAllProducts();
        setData(updatedProducts.data);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };

  // Open modal with selected product data
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Reset selected product
  };

  // Update the product data in the table
  const handleUpdateProduct = (updatedProduct) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.productId === selectedProduct.productId
          ? { ...product, ...updatedProduct }
          : product
      )
    );
    handleCloseModal();
  };

  // Define the table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'productId',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'imageUrl',
        header: 'Image',
        size: 120,
        Cell: ({ row }) => (
          <Box display="flex" justifyContent="center">
            <img
              src={row.original.imageUrl}
              alt={row.original.name}
              style={{ width: 75, height: 75, borderRadius: 8 }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        size: 150,
        Cell: ({ row }) => {
          const categories = row.original.categories;
          return (
            <Typography variant="body2">
              {categories ? categories.join(', ') : 'No categories'}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'isAvailable',
        header: 'Available',
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        size: 130,
      },
      {
        accessorKey: 'sizes',
        header: 'Sizes',
        size: 130,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {row.original.sizes.map((size, index) => (
              <Typography key={index} variant="body2">
                {size.size} : Rs. {size.price}
              </Typography>
            ))}
          </Box>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box display="flex" gap="8px">
            <Button
              variant="contained"
              size="small"
              onClick={() => handleOpenModal(row.original)}
              sx={{
                backgroundColor: '#ff3d00',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDelete(row.original.productId)}
              sx={{
                backgroundColor: '#f44336',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Header />
        <Box height={60} />
        <Box sx={{ display: 'flex' }}>
          <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <Box sx={{ width: '90%', margin: 'auto' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/admin/add-product')}
                  sx={{
                    backgroundColor: '#ff3d00',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                  }}
                >
                  Add New Product
                </Button>
              </Box>

              <MaterialReactTable
                columns={columns}
                data={data}
                enableRowVirtualization
                muiTableBodyProps={{
                  sx: {
                    height: '500px',
                    overflowY: 'auto',
                  },
                }}
                state={{
                  isLoading: data.length === 0, // Show loading state if no data
                }}
              />

              {selectedProduct && (
                <UpdateProduct
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  productData={selectedProduct}
                  onUpdate={handleUpdateProduct}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Products;