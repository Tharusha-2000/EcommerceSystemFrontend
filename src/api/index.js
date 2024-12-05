import axios from "axios";


const API = axios.create({
  baseURL: "https://localhost:7000/api/",
});



export const UserSignIn = async (data) => {
  return await API.post(`Auth/login`, data);
}
export const UserSignUp = async (data) =>
  await API.post(`Auth/register`, data);

export const SendEmail = async (data) =>
  await API.post(`Auth/forgot-password`, data);

export const PasswordChange = async (data) =>
  await API.post(`Auth/reset-password`, data);

export const UserCreate = async (data) => {
  const response = await API.post(`User`, data);
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

  const response = await API.get(`User/${id}`, config);
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
  const response = await API.put(`User`, data, config);
  return response;
};

//products
export const getAllProducts = async (filter) =>
  await API.get(`Product/GetAllProducts?${filter}`);

export const getProductDetails = async (id) =>
  await API.get(`Product/GetProductById/${id}`);



export const createProduct = async (productData) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API.post("Product/CreateProductAsync", productData, config);
};

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API.put(
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

  const response = await API.delete(`Product/${productId}`, config);
  return response;
};



export const getCartByUserId = async (userId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API.get(`Cart/byUser/${userId}`, config);
};

export const getCart = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await API.get(`Cart`, config);
};

export const addToCart = async (data) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await API.post(`Cart/`, data, config);
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
  const response = await API.put(`Cart/${cartId}?count=${count}`, config);
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
  return await API.put(`Cart/${data.cartId}`, data, config);
};


export const deleteFromCart = async (cartId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.delete(`Cart/${cartId}`, config);
  return response.data;
};

//cart
export const getUserById2 = async (id) => {
  const response = await API.get(`User/${id}`);
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
  const response = await API.post(`Order`, data, config);
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
  const res= await API.post(`OrderProduct`, data, config);
  console.log(res);
  return res;
};

export const getOrders = async () => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API.get(`Order`, config);
};

export const handelViewOrder = async (orderId) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API.get(`OrderProduct/byOrder/${orderId}`, config);
};

export const updateOrder = async (orderId, updatedOrder) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await API.put(`Order/${orderId}`, updatedOrder, config);
};


export const getClientSecret = async (amount) =>{
  const res = API.post(`Payment/create-payment-intent`,amount);
  return res;
}

export const updatePaymentState = async (data) => {
  try {
    await API.put(`Order/byOrderId/${data}?paymentStatus=true`);
  } catch (e) {
    console.log(e);
  }
}



/////////////// review and rating

//API for fetching product reviews
export const getProductFeedbacks = async (productId) => {
  const response = await API.get(`/FeedBack/GetProductFeedback/${productId}`);
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
  const response = await API.get(
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
  const response = await API.post(
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
  const response = await API.get(`/Order/byUser/${userId}`, config);
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
  const response = await API.get(`/OrderProduct/byOrder/${orderId}`, config);
  return response;
};

//API for get products by product Id
export const getProductById = async (productId) => {
  const response = await API.get(`/Product/GetProductById/${productId}`);
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
  return await API.get(`User`, config);
};
export const deleteUser = async (id) => {
  const token = localStorage.getItem("Mossa-Melt-token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await API.delete(`User/${id}`, config);
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
  return await API.get(`Order`, config);
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
  return await API.get(`Feedback/GetAllFeedbacks`, config);
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
  return await API.get(`OrderProduct`, config);
};



