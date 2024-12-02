import AdminSidebar from '../../components/common/AdminSidebar'; 
import Header from '../../components/common/Header';
import Grid from '@mui/material/Grid';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import { getAllProducts, deleteProduct } from '../../api'; // Import the API functions
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Products = () => {
  const [data, setData] = useState([]); // State to store product data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');

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
        Swal.fire('Error', 'Failed to load products. Please try again.', 'error');
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to handle product deletion
  const handleDelete = async (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(productId);
          if (response.status === 200) {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            // Fetch the updated list of products after deletion
            const updatedProducts = await getAllProducts();
            setData(updatedProducts.data);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
          Swal.fire('Error', 'Failed to delete the product. Please try again.', 'error');
        }
      }
    });
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
        size: isMobile ? 20 : 40,
      },
      {
        accessorKey: 'imageUrl',
        header: 'Image',
        size: isMobile ? 50 : 80,
        Cell: ({ row }) => (
          <Box display="flex" justifyContent="center">
            <img
              src={row.original.imageUrl}
              alt={row.original.name}
              style={{ width: isMobile ? 30 : 50, height: isMobile ? 30 : 50, borderRadius: 8 }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: isMobile ? 60 : 100,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: isMobile ? 100 : 150,
      },
      {
        accessorKey: 'categories',
        header: 'Categories',
        size: isMobile ? 60 : 100,
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
        size: isMobile ? 50 : 80,
      },
      {
        accessorKey: 'sizes',
        header: 'Sizes',
        size: isMobile ? 60 : 80,
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
        size: isMobile ? 30 : 50,
        Cell: ({ row }) => (
          <Box display="flex" flexDirection="column" gap="4px">
            <IconButton
              size="small"
              onClick={() => handleOpenModal(row.original)}
              sx={{
                color: '#ff3d00',
                '&:hover': {
                  color: '#d32f2f',
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDelete(row.original.productId)}
              sx={{
                color: '#f44336',
                '&:hover': {
                  color: '#d32f2f',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [isMobile]
  );

  return (
    <Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Header />
        <Box height={40}  /> {/* Reduced top padding */}
        <Box sx={{ display: 'flex' }}>
          <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
            <Box sx={{ width: '100%', margin: 'auto', padding: 0 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          All Products
          </Typography>
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
                    height: '400px', // Reduce the height of the table
                    overflowY: 'auto',
                    fontSize: '0.75rem', // Reduce font size
                  },
                }}
                muiTableHeadCellProps={{
                  sx: {
                    padding: '2px', // Reduce padding in header cells
                    fontSize: '0.75rem', // Reduce font size in header cells
                  },
                }}
                muiTableBodyCellProps={{
                  sx: {
                    padding: '3px', // Reduce padding in body cells
                    fontSize: '0.75rem', // Reduce font size in body cells
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