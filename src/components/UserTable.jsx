import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { getAllUsers, deleteUser } from '../api'; // Import the API functions
import Swal from 'sweetalert2'; // Import SweetAlert2

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setData(response.data);
        console.log("Fetched users:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          setData((prevData) => prevData.filter((item) => item.id !== userId));
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire('Error!', 'Failed to delete the user. Please try again.', 'error');
        }
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 200,
        Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'phoneNo',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box display="flex" gap="8px">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(row.original.id)}
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
    <Box sx={{ width: '95%', margin: 'auto' }}>
      {/* Users Table */}
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
          isLoading: loading,
        }}
      />
    </Box>
  );
};

export default UsersTable;