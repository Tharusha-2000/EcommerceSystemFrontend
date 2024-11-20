import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminProductTable = () => {
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
        {
            productId: 3,
            name: 'BBQ Chicken Pizza',
            description: 'Savory BBQ chicken pizza with a smoky flavor and fresh toppings.',
            imageUrl: 'http://example.com/bbq-chicken.jpg',
            isAvailable: false,
            sizes: [
                { size: 'Small', price: 950, qty: 18 },
                { size: 'Medium', price: 1350, qty: 12 },
                { size: 'Large', price: 1700, qty: 8 },
            ],
        },
        {
            productId: 4,
            name: 'Veggie Supreme Pizza',
            description: 'Loaded with fresh vegetables, olives, and cheese.',
            imageUrl: 'http://example.com/veggie-supreme.jpg',
            isAvailable: true,
            sizes: [
                { size: 'Small', price: 850, qty: 22 },
                { size: 'Medium', price: 1250, qty: 17 },
                { size: 'Large', price: 1550, qty: 10 },
            ],
        },
        {
            productId: 5,
            name: 'Four Cheese Pizza',
            description: 'A cheesy delight with mozzarella, parmesan, cheddar, and gorgonzola.',
            imageUrl: 'http://example.com/four-cheese.jpg',
            isAvailable: false,
            sizes: [
                { size: 'Small', price: 950, qty: 0 },
                { size: 'Medium', price: 1400, qty: 0 },
                { size: 'Large', price: 1800, qty: 0 },
            ],
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility
    const navigate = useNavigate(); // For navigation to a different component

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                            color="primary"
                            size="small"
                            onClick={handleOpenModal} // Opens the modal
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() =>
                                setData((prevData) =>
                                    prevData.filter(
                                        (item) => item.productId !== row.original.productId
                                    )
                                )
                            }
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
        <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
            {/* Add New Product Button */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                sx={{
                    padding: '10px 0',
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Product Management
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/admin/add-product')} 
                    sx={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#0056b3',
                        },
                    }}
                >
                    Add New Product
                </Button>
            </Box>

            {/* Product Table */}
            <MaterialReactTable
                columns={columns}
                data={data}
                enableRowVirtualization
                muiTableBodyProps={{
                    sx: {
                        height: '500px', // Fixed height for virtualization
                        overflowY: 'auto',
                    },
                }}
                state={{
                    isLoading: false,
                }}
            />

            {/* Modal for Update */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    {/* Empty content for now */}
                    <Typography variant="body1">Update functionality coming soon...</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminProductTable;
