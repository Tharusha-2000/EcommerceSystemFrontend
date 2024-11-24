import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PizzaIcon from "../utils/Images/food-delivery.png"; // Replace with your pizza icon
import Button from "../components/Button"; // Adjust the import path as necessary
import PropTypes from "prop-types";
import "./MyOrders.css"; // Import the CSS file for additional styles

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState({});
  const [products, setProducts] = useState({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch your orders.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await axios.get(
          `https://localhost:7242/api/Order/byUser/${userId}`
        );

        const userOrders = response.data
          .filter((order) => order.paymentStatus === true) // Filter orders with paymentStatus true
          .map((order) => ({
            orderId: order.orderId,
            date: new Date(order.date), // Convert date string to Date object
            totalPrice: order.totalPrice,
            orderStatus: order.orderStatus,
          }))
          .sort((a, b) => b.date - a.date); // Sort orders by date, latest first

        console.log("User orders:", userOrders);

        setOrders(userOrders);
        Swal.close();
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire(
          "Error",
          "Failed to load orders. Please try again later.",
          "error"
        );
      }
    };

    fetchOrders();
  }, [userId]);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const orderProductsData = {};
        const productsData = {};

        for (const order of orders) {
          const response = await axios.get(
            `https://localhost:7242/api/OrderProduct/byOrder/${order.orderId}`
          );

          console.log(
            "Order products for order",
            order.orderId,
            ":",
            response.data
          );
          orderProductsData[order.orderId] = response.data;

          for (const orderProduct of response.data) {
            if (!productsData[orderProduct.productId]) {
              const productResponse = await axios.get(
                `https://localhost:7273/api/Product/GetProductById/${orderProduct.productId}`
              );
              productsData[orderProduct.productId] = productResponse.data.name;
            }
          }
        }

        setOrderProducts(orderProductsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching order products:", error);
      }
    };

    if (orders.length > 0) {
      fetchOrderProducts();
    }
  }, [orders]);

  const handleGiveFeedback = (order) => {
    setSelectedOrder(order);
    setShowFeedbackForm(true);
    sessionStorage.setItem("OrderId", JSON.stringify(order.orderId));
    sessionStorage.setItem("UserId", JSON.stringify(userId));
    setShowFeedbackForm(true);
  };

  const handleCloseModal = () => {
    setShowFeedbackForm(false);
    setSelectedOrder(null);
    sessionStorage.removeItem("OrderId");
    sessionStorage.removeItem("UserId");
  };

  const handleSaveFeedback = (feedback) => {
    console.log("Feedback saved:", feedback);
    // Update state or perform any necessary actions with the saved feedback
  };

  return (
    <>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="row p-5 rounded-4 sec shadow m-4 h-auto"
          >
            <div className="col-lg-1 col-md-2 col-sm-3 align-items-center justify-content-center m-auto d-grid pb-1">
              <img
                src={PizzaIcon}
                alt="PizzaIcon"
                className="VehicleIcon align-items-center justify-content-center m-auto"
                style={{ width: "50px", height: "50px" }} // Adjust the size as needed
              />
              {/* <div className="fw-semibold pt-2">{order.date}</div> */}
            </div>
            <div className="col-lg-3 col-md-3 col-sm-4 align-items-center justify-content-center m-auto d-grid">
              <h6 className="align-items-center justify-content-center m-auto">
                Order ID: {order.orderId}
              </h6>
              <p className="align-items-center justify-content-center m-auto">
                {order.date.toLocaleDateString()}
              </p>
              <p className="align-items-center justify-content-center m-auto">
                Total Price: LKR {order.totalPrice}.00
              </p>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-4 align-items-center justify-content-center m-auto d-grid">
              {orderProducts[order.orderId] &&
                orderProducts[order.orderId].map((orderProduct) => (
                  <p
                    key={orderProduct.orderProductId}
                    className="align-items-center justify-content-center m-auto"
                  >
                    {products[orderProduct.productId]} ({orderProduct.count}{orderProduct.pizzaSize})
                  </p>
                ))}
            </div>
            <div className="col-lg-1 col-md-3 col-sm-4 align-items-center justify-content-center m-auto d-grid">
              <h6 className="align-items-center justify-content-center m-auto">
                Status
              </h6>
              <p> {order.orderStatus}</p>
            </div>
            <div className="col col-lg-2 col-md-3 col-sm-4 col-12 align-items-center justify-content-center d-flex m-auto pt-1 ">
              <div className="col-lg-2 col-md-2 col-sm-3 col-4 m-0 align-items-center justify-content-center d-flex m-auto w-auto">
                <Button
                  text="Add Review"
                  type="primary"
                  onClick={() => handleGiveFeedback(order)}
                  isDisabled={order.orderStatus !== "Completed"} // Disable button if order status is not "Completed"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="row p-4 rounded-4 sec shadow bg-grey mt-4 mb-4 ml-4 mr-4">
          <div className="col-lg-12 mt-5 mb-4">
            <p className="text-center fs-10 font-family-Inter">
              No past orders found.
            </p>
          </div>
        </div>
      )}

      {/* {showFeedbackForm && selectedOrder && (
        <FeedBackModal onClose={handleCloseModal}>
          <FeedbackForm
            userId={userId}
            orderId={selectedOrder.orderId}
            onClose={handleCloseModal}
            onSave={handleSaveFeedback}
          />
          <FeedbackList
            userId={userId}
            orderId={selectedOrder.orderId}
          />
        </FeedBackModal>
      )} */}
    </>
  );
};

MyOrders.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default MyOrders;