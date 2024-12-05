import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddelivery-mern.onrender.com/api/",
});

// Product API
const API2 = axios.create({
  baseURL: "https://localhost:7000/api/",
});

// Cart API
const API3 = axios.create({
  baseURL: "https://localhost:7000/api/",
});

//review and rating
const API4 = axios.create({
  baseURL: "https://localhost:7000/api/",
});

//auth
const API1 = axios.create({
  baseURL: "https://localhost:7000/api/",
});

//auth

export const UserSignIn = async (data) => await API1.post(`Auth/login`, data);
export const UserSignUp = async (data) =>
  await API1.post(`Auth/register`, data);

export const SendEmail = async (data) =>
  await API1.post(`Auth/forgot-password`, data);

export const PasswordChange = async (data) =>
  await API1.post(`Auth/reset-password`, data);

export const UserCreate = async (data) => {
  const response = await API1.post(`User`, data);
  return response;
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API1.get(`User/${id}`, config);
  return response.data;
};

export const updateUser = async (data) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API1.put(`User`, data, config);
  return response;
};

//products
export const getAllProducts = async (filter) =>
  await API2.get(`Product/GetAllProducts?${filter}`);

export const getProductDetails = async (id) =>
  await API2.get(`Product/GetProductById/${id}`);

export const createProduct = async (productData) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API2.post("Product/CreateProductAsync", productData, config);
};
export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API2.put(
    `Product/UpdateProductAsync/${id}`,
    productData,
    config
  );
};
export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API2.delete(`Product/${productId}`, config);
  return response;
};

//Cart
// export const getCart = async (token) =>
//   await API.get(`/user/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getCartByUserId = async (userId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.get(`Cart/byUser/${userId}`, config);
};

export const getCart = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API3.get(`Cart`, config);
};

export const addToCart = async (data) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await API3.post(`Cart/`, data, config);
  return res;
};

export const updateFromCart = async ({ cartId, count }) => {
  const data = { count: count > 0 ? count : 0 }; // If count is <= 0, treat as removal (count = 0)
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API3.put(`Cart/${cartId}?count=${count}`, config);
  return response.data;
};

export const updateItemOnCart = async (data) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.put(`Cart/${data.cartId}`, data, config);
};

export const deleteFromCart = async (cartId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API3.delete(`Cart/${cartId}`, config);
  return response.data;
};

//cart
export const getUserById2 = async (id) => {
  const response = await API1.get(`User/${id}`);
  return response;
};

//Orders
export const createOrder = async (data) => {
  console.log(data);
  const token = localStorage.getItem("Mossa-Melt-token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API3.post(`Order`, data, config);
  return response;
};

export const storeOrderProduct = async (data) => {
  console.log(data);
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.post(`OrderProduct`, data, config);
};

export const getOrders = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.get(`Order`, config);
};

export const handelViewOrder = async (orderId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.get(`OrderProduct/byOrder/${orderId}`, config);
};

export const updateOrder = async (orderId, updatedOrder) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.put(`Order/${orderId}`, updatedOrder, config);
};

/////////////// review and rating

//API for fetching product reviews
export const getProductFeedbacks = async (productId) => {
  const response = await API4.get(`/FeedBack/GetProductFeedback/${productId}`);
  return response.data.$values; // Extract the $values array from the response
};

//API for fetching Feedbacks by order Id
export const GetFeedbackByOrderId = async (orderId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API4.get(
    `/FeedBack/GetFeedbackByOrderId/${orderId}`,
    config
  );
  return response;
};

//API fetching for add product feedback
export const SaveProductFeedback = async (newFeedback) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API4.post(
    `/FeedBack/SaveProductFeedback`,
    newFeedback,
    config
  );
  return response;
};

//API for feching orders by orderId
export const fetchOrdersByUserId = async (userId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API3.get(`/Order/byUser/${userId}`, config);
  return response;
};

//API for fetching order included products
export const getOrderProductByOrderId = async (orderId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API3.get(`/OrderProduct/byOrder/${orderId}`, config);
  return response;
};

//API for get products by product Id
export const getProductById = async (productId) => {
  const response = await API2.get(`/Product/GetProductById/${productId}`);
  return response;
};

//users-dilum
export const getAllUsers = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API1.get(`User`, config);
};
export const deleteUser = async (id) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API1.delete(`User/${id}`, config);
  return response.data;
};

//get all orders -dilum
export const getAllOrders = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.get(`Order`, config);
};
//get all feedback -dilum
export const getAllFeedback = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API4.get(`Feedback/GetAllFeedbacks`, config);
};
//get order details -dilum
export const getallOrderDetails = async (id) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API3.get(`OrderProduct`, config);
};
