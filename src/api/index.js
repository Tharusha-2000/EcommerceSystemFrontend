import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddelivery-mern.onrender.com/api/",
});

// Product API
const API2 = axios.create({
  baseURL: "https://localhost:7273/api/",
});

// Cart API
const API3 = axios.create({
  baseURL: "https://localhost:7242/api/",
});

//review and rating
const API4 = axios.create({
  baseURL: "https://localhost:7046/api/",
});

//auth
const API1 = axios.create({
  baseURL: "https://localhost:8080/api/",
});




//auth

export const UserSignIn = async (data) => await API1.post(`Auth/login`, data);
export const UserSignUp = async (data) => await API1.post(`Auth/register`, data);

export const SendEmail = async (data) => await API1.post(`Auth/forgot-password`, data);

export const PasswordChange = async (data) => await API1.post(`Auth/reset-password`, data);



export const UserCreate = async (data) => {
      const response = await API1.post(`User`, data);
    return response;
};

export const getUserById = async (id) => {
  const response = await API1.get(`User/${id}`);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await API1.put(`User`, data);
  return response;
};







//products
export const getAllProducts = async (filter) =>
  await API2.get(`Product/GetAllProducts?${filter}`);

export const getProductDetails = async (id) =>
  await API2.get(`Product/GetProductById/${id}`);

export const createProduct = async (productData) =>
  await API2.post("Product/CreateProductAsync", productData);


export const updateProduct = async (id, productData) =>
  await API2.put(`Product/UpdateProductAsync/${id}`, productData);

export const deleteProduct = async (productId) => {
  try {
    const response = await API2.delete(`Product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(error.response?.data?.message || "Error deleting product");
  }
};
//Cart
//Cart
// export const getCart = async (token) =>
//   await API.get(`/user/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });



export const getCartByUserId = async (userId) => await API3.get(`Cart/byUser/${userId}`);
export const getCart = async () => await API3.get("Cart");
export const addToCart = async ( data) => await API3.post(`Cart/`, data);

// export const deleteFromCart = async (token, data) =>
//   await API.patch(`/user/cart/`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const updateFromCart = async ({ cartId, count }) => {
  try {
    const data = { count: count > 0 ? count : 0 }; // If count is <= 0, treat as removal (count = 0)
    const response = await API3.put(
      `Cart/${cartId}?count=${count}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating cart");
  }
};

export const updateItemOnCart = async (data) =>
  await API3.put(`Cart/${data.cartId}`, data);

export const deleteFromCart = async (cartId) => {
  try {
    console.log(cartId);
    const response = await API3.delete(
      `Cart/${cartId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting from cart"
    );
  }
};

//cart
export const getUserById2 = async (id) => {
  const response = await API1.get(`User/${id}`);
  return response;
};




//Orders
export const createOrder = async (data) =>
  await API3.post(`Order`, data);

export const storeOrderProduct = async (data) =>
  await API3.post(`OrderProduct`, data);

// export const getOrders = async (token) =>
//   await API.get(`Order`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getOrders = async () => await API3.get(`Order`);
export const handelViewOrder = async ( orderId ) => await API3.get(`OrderProduct/byOrder/${orderId}`);
export const updateOrder = async (orderId, updatedOrder)  => await API3.put(`Order/${orderId}`, updatedOrder);


/////////////// review and rating

//API for fetching product reviews
export const getProductFeedbacks = async (productId) => {
  try {
    const response = await API4.get(
      `/FeedBack/GetProductFeedback/${productId}`
    );
    return response.data.$values; // Extract the $values array from the response
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching product reviews"
    );
  }
};

//API for fetching Feedbacks by order Id
export const GetFeedbackByOrderId = async (orderId) => {
  try {
    const response = await API4.get(
      `/FeedBack/GetFeedbackByOrderId/${orderId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching feedback by order id:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching feedback by order id"
    );
  }
};

//API fetching for add product feedback
export const SaveProductFeedback = async (newFeedback) => {
  try {
    const response = await API4.post(
      `/FeedBack/SaveProductFeedback`,
      newFeedback
    );
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw new Error(error.response?.data?.message || "Error saving feedback");
  }
};

//API for feching orders by orderId
export const fetchOrdersByUserId = async (userId) => {
  try {
    const response = await API3.get(`/Order/byUser/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching orders by user id:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching orders by user id"
    );
  }
};

//API for fetching order included products
export const getOrderProductByOrderId = async (orderId) => {
  try {
    const response = await API3.get(`/OrderProduct/byOrder/${orderId}`);
    return response;
  } catch (error) {
    console.error("Error fetching orders by user id:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching orders by user id"
    );
  }
};

//API for get products by product Id
export const getProductById = async (productId) => {
  try {
    const response = await API2.get(`/Product/GetProductById/${productId}`);
    return response;
  } catch (error) {
    console.error("Error fetching orders by user id:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching orders by user id"
    );
  }
};


//users-dilum
export const getAllUsers = async () =>
  await API1.get(`User`);

export const deleteUser = async (id) => {
  try {
    const response = await API1.delete(`User/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting user");
  }
};
//get all orders -dilum
export const getAllOrders = async () =>
  await API3.get(`Order`);
//get all feedback -dilum
export const getAllFeedback = async () =>
  await API4.get(`Feedback/GetAllFeedbacks`);
//get order details -dilum
export const getallOrderDetails = async (id) =>
  await API3.get(`OrderProduct`);
