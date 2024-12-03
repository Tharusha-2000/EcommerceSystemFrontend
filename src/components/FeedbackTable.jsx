import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { getAllFeedback, getAllUsers, getAllOrders, getAllProducts, getallOrderDetails } from '../api'; // Import the API functions

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllFeedback();
        setFeedbacks(response.data.$values || []);
        console.log("Fetched feedbacks:", response.data.$values);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
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

    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data);
        console.log("Fetched orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await getallOrderDetails();
        setOrderDetails(response.data);
        console.log("Fetched order details:", response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchFeedbacks();
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchOrderDetails();
    setLoading(false);
  }, []);

  // Create a mapping of user IDs to user names
  const userIdToNameMap = useMemo(() => {
    const map = {};
    users.forEach(user => {
      map[user.id] = `${user.firstName} ${user.lastName}`;
    });
    return map;
  }, [users]);

  // Create a mapping of order IDs to product IDs
  const orderIdToProductIdMap = useMemo(() => {
    const map = {};
    orderDetails.forEach(orderDetail => {
      map[orderDetail.orderId] = orderDetail.productId;
    });
    return map;
  }, [orderDetails]);

  // Create a mapping of product IDs to product names
  const productIdToNameMap = useMemo(() => {
    const map = {};
    products.forEach(product => {
      map[product.productId] = product.name;
    });
    return map;
  }, [products]);

  // Create a mapping of order IDs to user IDs
  const orderIdToUserIdMap = useMemo(() => {
    const map = {};
    orders.forEach(order => {
      map[order.orderId] = order.userId;
    });
    return map;
  }, [orders]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'feedbackId',
        header: 'Feedback ID',
        size: 50,
      },
      {
        accessorKey: 'productId',
        header: 'Product Name',
        size: 150,
        Cell: ({ row }) => productIdToNameMap[orderIdToProductIdMap[row.original.orderId]] || 'Unknown',
      },
      {
        accessorKey: 'userId',
        header: 'User Name',
        size: 150,
        Cell: ({ row }) => userIdToNameMap[orderIdToUserIdMap[row.original.orderId]] || 'Unknown',
      },
      {
        accessorKey: 'feedbackMessage',
        header: 'Feedback Message',
        size: 300,
      },
      {
        accessorKey: 'rate',
        header: 'Rating',
        size: 100,
      },
      {
        accessorKey: 'givenDate',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    [userIdToNameMap, orderIdToProductIdMap, productIdToNameMap, orderIdToUserIdMap]
  );

  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
       <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
           All Feedbacks
          </Typography>
      {/* Feedback Table */}
      <MaterialReactTable
        columns={columns}
        data={feedbacks}
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
      <AverageRatingTable feedbacks={feedbacks} products={products} />
    </Box>
  );
};

const AverageRatingTable = ({ feedbacks, products }) => {
  const productIdToNameMap = useMemo(() => {
    const map = {};
    products.forEach(product => {
      map[product.productId] = product.name;
    });
    return map;
  }, [products]);

  const averageRatings = useMemo(() => {
    const ratingsMap = {};
    feedbacks.forEach(feedback => {
      const productId = feedback.productId;
      if (!ratingsMap[productId]) {
        ratingsMap[productId] = { totalRating: 0, count: 0 };
      }
      ratingsMap[productId].totalRating += feedback.rate;
      ratingsMap[productId].count += 1;
    });

    products.forEach(product => {
      if (!ratingsMap[product.productId]) {
        ratingsMap[product.productId] = { totalRating: 0, count: 0 };
      }
    });

    return Object.keys(ratingsMap).map(productId => ({
      productId,
      productName: productIdToNameMap[productId] || 'Unknown',
      averageRating: ratingsMap[productId].count > 0 ? (ratingsMap[productId].totalRating / ratingsMap[productId].count).toFixed(2) : 'No Ratings',
    }));
  }, [feedbacks, products, productIdToNameMap]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'productId',
        header: 'Product ID',
        size: 50,
      },
      {
        accessorKey: 'productName',
        header: 'Product Name',
        size: 150,
      },
      {
        accessorKey: 'averageRating',
        header: 'Average Rating',
        size: 100,
      },
    ],
    []
  );

  return (
    <Box sx={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
      {/* <Typography variant="h5" gutterBottom>
        Ratings by Product
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={averageRatings}
        enableRowVirtualization
        muiTableBodyProps={{
          sx: {
            height: '500px', // Fixed height for virtualization
            overflowY: 'auto',
          },
        }}
      /> */}
    </Box>
  );
};

export default FeedbackTable;