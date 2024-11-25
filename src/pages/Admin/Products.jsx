import AdminSidebar from '../../components/common/AdminSidebar';
import Header from '../../components/common/Header';
import Grid from '@mui/material/Grid';
import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';

const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://your-backend-url/api/products/${productId}`);
      
      if (response.status === 200) {
        alert('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };
  

const Products = () => {
  const [data, setData] = useState([
    {
      productId: 1,
      name: 'Margherita Pizza',
      description: 'Classic margherita pizza with fresh tomatoes, basil, and mozzarella.',
      imageUrl: 'http://example.com/margherita.jpg',
      isAvailable: true,
      sizes: [
        { size: 'Small', price: 800, qty: 20 },
        { size: 'Medium', price: 1200, qty: 15 },
        { size: 'Large', price: 1500, qty: 10 },
      ],
    },
    {
      productId: 2,
      name: 'Pepperoni Pizza',
      description: 'Spicy pepperoni pizza topped with cheese and extra pepperoni.',
      imageUrl: 'http://example.com/pepperoni.jpg',
      isAvailable: true,
      sizes: [
        { size: 'Small', price: 900, qty: 25 },
        { size: 'Medium', price: 1300, qty: 20 },
        { size: 'Large', price: 1600, qty: 15 },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
        size: 150,
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
        size: 200,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
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
                  isLoading: false,
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
