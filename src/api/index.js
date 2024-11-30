import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddelivery-mern.onrender.com/api/",
});

// Product API
const API2 = axios.create({
  baseURL: "http://localhost:5114/api/",
});

// Cart API
const API3 = axios.create({
  baseURL: "http://localhost:5126/api/",
});

//auth
const API1 = axios.create({
  baseURL: "https://localhost:7087/api/",
});


export const UserSignIn = async (data) => await API1.post(`Auth/login`, data);

export const UserSignUp = async (data) => await API1.post(`Auth/register`, data);

export const UserCreate = async (data) => {
  console.log('Data being sent to UserCreate:', data); // Log the data

    try {
    const response = await API1.post(`User`, data);
    console.log('Response from UserCreate:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Error in UserCreate:', error); // Log any error
    throw error;
  }
  
};


export const getUserById = async (id) => {
  try {
    const response = await API1.get(`User/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//products
export const getAllProducts = async (filter) =>
  await API2.get(`Product/GetAllProducts`);

export const getProductDetails = async (id) =>
  await API2.get(`Product/GetProductById/${id}`);

//Cart
// export const getCart = async (token) =>
//   await API.get(`/user/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const getCart = async () =>
  await axios.get("http://localhost:5126/api/Cart");

export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCart2 = async () => await API3.get("Cart");

export const addToCart2 = async (token, data) => await API3.post(`Cart/`, data);

// export const deleteFromCart = async (token, data) =>
//   await API.patch(`/user/cart/`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

export const updateFromCart = async ({ cartId, count }) => {
  try {
    const data = { count: count > 0 ? count : 0 }; // If count is <= 0, treat as removal (count = 0)
    const response = await axios.put(
      `https://localhost:7242/api/Cart/${cartId}?count=${count}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating cart");
  }
};

export const updateItemOnCart = async (token, data) =>
  await API3.put(`Cart/${data.cartId}`, data);

export const deleteFromCart = async (cartId) => {
  try {
    console.log(cartId);
    const response = await axios.delete(
      `https://localhost:7242/api/Cart/${cartId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting from cart"
    );
  }
};

//favorites

export const getFavourite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders
export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
