import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { getAllOrders, getAllUsers } from '../api'; // Import the API functions
import Swal from 'sweetalert2'; // Import SweetAlert2

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setData(response.data);
        console.log("Fetched orders:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

  // Create a mapping of user IDs to user names
  const userIdToNameMap = useMemo(() => {
    const map = {};
    users.forEach(user => {
      map[user.id] = `${user.firstName} ${user.lastName}`;
    });
    return map;
  }, [users]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'orderId',
        header: 'Order ID',
        size: 50,
      },
      {
        accessorKey: 'userId',
        header: 'Customer Name',
        size: 150,
        Cell: ({ cell }) => userIdToNameMap[cell.getValue()] || 'Unknown',
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        size: 100,
        Cell: ({ cell }) => `Rs: ${cell.getValue()}`,
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
        size: 150,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 100,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
        Cell: ({ row }) => `${row.original.street}, ${row.original.city}, ${row.original.province}, ${row.original.country}`,
      },
      {
        accessorKey: 'postalcode',
        header: 'Postal Code',
        size: 100,
      },
      {
        accessorKey: 'phoneNum',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        size: 100,
        Cell: ({ cell }) => (cell.getValue() ? 'Paid' : 'Unpaid'),
      },
      {
        accessorKey: 'orderStatus',
        header: 'Order Status',
        size: 150,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    [userIdToNameMap]
  );

  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
      {/* Orders Table */}
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

export default OrdersTable;