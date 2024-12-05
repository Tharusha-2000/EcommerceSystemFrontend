import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card as JoyCard,
  CardContent as JoyCardContent,
  Typography as JoyTypography,
} from "@mui/joy";
import {
  getAllProducts,
  getAllUsers,
  getAllOrders,
  getAllFeedback,
  getallOrderDetails,
} from "../api";

const postalCodeToCityMap = {
  11270: "Demanhandiya ",
  11271: "Mount-Lavanie",
  11566: "Katubedda",
  33601: "Panadura",
  73001: "Moratuwa",
  14526: "Piliyandala",
  45001: "Miriswaththa",
  0: "Unknown City",
};

function AdminOverview() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
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

    const fetchFeedbacks = async () => {
      try {
        const response = await getAllFeedback();
        setFeedbacks(response.data.$values || []);
        console.log("Fetched feedbacks:", response.data.$values);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await getallOrderDetails();
        if (response && response.data) {
          setOrderDetails(response.data);
          console.log("Fetched order details:", response.data);
        } else {
          console.error("Invalid response for order details:", response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchProducts();
    fetchUsers();
    fetchOrders();
    fetchFeedbacks();
    fetchOrderDetails();
    setLoading(false);
  }, []);

  // Create a mapping of user IDs to user names
  const userIdToNameMap = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      map[user.id] = `${user.firstName} ${user.lastName}`;
    });
    return map;
  }, [users]);

  // Create a mapping of order IDs to user IDs
  const orderIdToUserIdMap = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      map[order.orderId] = order.userId;
    });
    return map;
  }, [orders]);

  // Create a mapping of order IDs to product IDs
  const orderIdToProductIdMap = useMemo(() => {
    const map = {};
    orderDetails.forEach((orderDetail) => {
      map[orderDetail.orderId] = orderDetail.productId;
    });
    return map;
  }, [orderDetails]);

  // Create a mapping of product IDs to product names
  const productIdToNameMap = useMemo(() => {
    const map = {};
    products.forEach((product) => {
      map[product.productId] = product.name;
    });
    return map;
  }, [products]);

  // Data for metrics
  const totalProducts = products.length; // Total number of products
  const totalOrders = orders.length; // Total orders
  const totalUsers = users.length; // Total registered users
  const feedbackCount = feedbacks.length; // Total feedback entries

  // Sort orders by date in descending order
  const recentOrders = orders
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Aggregate orders by postal code and city
  const ordersByPostalCodeAndCity = orders.reduce((acc, order) => {
    const key = `${order.postalcode} - ${
      postalCodeToCityMap[order.postalcode] || "Unknown City"
    }`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});

  // Create data array for postal code and city chart
  const postalCodeAndCityData = Object.keys(ordersByPostalCodeAndCity).map(
    (key) => ({
      name: key,
      value: ordersByPostalCodeAndCity[key],
    })
  );

  // Pie chart data for orders by status
  const orderStatusData = [
    {
      name: "Delivered",
      value: orders.filter((order) => order.orderStatus === "Delivered").length,
    },
    {
      name: "Pending",
      value: orders.filter((order) => order.orderStatus === "Pending").length,
    },
    {
      name: "Canceled",
      value: orders.filter((order) => order.orderStatus === "Canceled").length,
    },
  ];

  // Calculate average ratings by product
  const averageRatings = useMemo(() => {
    const ratingsMap = {};
    feedbacks.forEach((feedback) => {
      const productId = orderIdToProductIdMap[feedback.orderId];
      if (!ratingsMap[productId]) {
        ratingsMap[productId] = { totalRating: 0, count: 0 };
      }
      ratingsMap[productId].totalRating += feedback.rate;
      ratingsMap[productId].count += 1;
    });

    return products
      .filter(
        (product) =>
          ratingsMap[product.productId] &&
          ratingsMap[product.productId].count > 0
      )
      .map((product) => ({
        productId: product.productId,
        productName: product.name,
        averageRating: (
          ratingsMap[product.productId].totalRating /
          ratingsMap[product.productId].count
        ).toFixed(2),
      }));
  }, [feedbacks, orderIdToProductIdMap, productIdToNameMap, products]);

  const averageRatingChartData = averageRatings.map((rating) => ({
    name: `${rating.productName} (${rating.averageRating})`,
    value: parseFloat(rating.averageRating),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  // Sort feedbacks by givenDate in descending order and get the 3 most recent feedbacks
  const recentFeedback = feedbacks
    .sort((a, b) => new Date(b.givenDate) - new Date(a.givenDate))
    .slice(0, 3);

  return (
    <Box sx={{ padding: 4, fontFamily: "Roboto, Arial, sans-serif" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          background: "linear-gradient(135deg, #B40614, #FF4D4D)", // Gradient with #B40614
          borderRadius: "8px",
          boxShadow:
            "0 4px 10px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.5)", // Added red glow effect
          mb: 3, // Add margin below the header
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            fontSize: isMobile ? "1.5rem" : "3rem", // Adjust font size for mobile
          }}
        >
          Admin Dashboard Overview
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {[
          { title: "Total Products", value: totalProducts },
          { title: "Total Orders", value: totalOrders },
          { title: "Total Users", value: totalUsers },
          { title: "Feedback Count", value: feedbackCount },
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <JoyCard
              variant="outlined"
              sx={{
                minHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <JoyCardContent>
                <JoyTypography
                  level="h6"
                  gutterBottom
                  sx={{
                    fontSize: isMobile ? "1rem" : "2rem",
                    textAlign: "center",
                  }}
                >
                  {metric.title}
                </JoyTypography>
                <JoyTypography
                  level="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: isMobile ? "2rem" : "4.5rem",
                    textAlign: "center",
                  }}
                >
                  {metric.value}
                </JoyTypography>
              </JoyCardContent>
            </JoyCard>
          </Grid>
        ))}
      </Grid>

      {/* Pie Charts Section */}
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Orders by Postal Code and City
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={postalCodeAndCityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {postalCodeAndCityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Average Ratings by Product
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={averageRatingChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {averageRatingChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Orders
        </Typography>
        <Paper elevation={3} sx={{ overflowX: "auto", marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    {userIdToNameMap[orderIdToUserIdMap[order.orderId]]}
                  </TableCell>
                  <TableCell>Rs: {order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>
                    {postalCodeToCityMap[order.postalcode] || "Unknown City"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Recent Feedback Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Feedback
        </Typography>
        <Paper elevation={3} sx={{ marginTop: 2, padding: 2 }}>
          <List>
            {recentFeedback.map((feedback) => (
              <ListItem
                key={feedback.feedbackId}
                sx={{
                  backgroundColor: "#f9f9f9",
                  marginBottom: 1,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">
                      User Name:{" "}
                      {userIdToNameMap[orderIdToUserIdMap[feedback.orderId]]}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span">
                        <strong>Message:</strong> {feedback.feedbackMessage}
                      </Typography>
                      <br />
                      <Typography component="span">
                        <strong>Rating:</strong> {feedback.rate}/5
                      </Typography>
                      <br />
                      <Typography component="span">
                        <strong>City:</strong>{" "}
                        {postalCodeToCityMap[feedback.postalcode] ||
                          "Unknown City"}{" "}
                        {/* Display city name */}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default AdminOverview;
