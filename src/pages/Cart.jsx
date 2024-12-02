import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import {
  addToCart,
  deleteFromCart,
  getCartByUserId,
  createOrder,
  updateFromCart,
  storeOrderProduct
} from "../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";
import PaymentDialog from "./Checkout";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {
  fetchCartRed,
  removeFromCartRed,
  updateCartRed,
} from "../redux/reducers/cartSlice";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  gap: 28px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 12px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 1.2;
  }
`;
const Table = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 30px;
  ${({ head }) => head && `margin-bottom: 22px`}
`;
const TableItem = styled.div`
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600; 
  font-size: 18px;`}
  align-items: center;
`;
const Counter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 8px;
  padding: 4px 12px;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const Img = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 6px;
`;
const Details = styled.div`
  max-width: 160px;
  @media (max-width: 700px) {
    max-width: 60px;
  }
`;
const Protitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
`;
const ProDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProSize = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 0.8;
  }
`;
const Subtotal = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;
const Delivery = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const { currentUser } = useSelector((state) => state.user);

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const handleOpenPaymentDialog = () => {
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };

  const getProducts = async () => {
    setLoading(true);

    if (cart.length > 0) {
      setLoading(false);
      return;
    } else {
      try {
        const userid = currentUser.id;
        const response = await getCartByUserId(userid);
        dispatch(fetchCartRed(response.data));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error by setting an empty cart
          dispatch(fetchCartRed([])); // Assuming fetchCartRed([]) clears the cart
        } else {
          console.error("Error fetching cart:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.count * item?.unitPrice,
      0
    );
  };
  const convertAddressToString = (addressObj) => {
    // Convert the address object to a string representation
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const afterCheckout = () => {
    PlaceOrder();
    //handleOpenPaymentDialog();
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.address &&
        deliveryDetails.phoneNo &&
        deliveryDetails.email &&
        deliveryDetails.postalcode;

      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        return;
      }
      // if (deliveryDetails.postalcode !== 11270) {
      //   dispatch(
      //     openSnackbar({
      //       message: "We are currently not delivering to your area",
      //       severity: "error",
      //     })
      //   );
      //   return;
      // }

      const totalAmount = calculateSubtotal().toFixed(2);
      console.log("Total Amount:", totalAmount);

      const userId = currentUser.id;
      console.log("User ID:", userId);

      const orderDetails = {
        userId: userId,
        fName: deliveryDetails.firstName,
        lName: deliveryDetails.lastName,
        email: deliveryDetails.email,
        phoneNum: deliveryDetails.phoneNo,
        address: deliveryDetails.address,
        paymentStatus: true,
        orderStatus: "new",
        date: new Date().toDateString(),
        totalPrice: totalAmount,
        postalcode: deliveryDetails.postalcode,
      };

      console.log("Order Details:", orderDetails);

      const response = await createOrder(orderDetails);
      console.log("Order Response:", response);
      if (response.status === 201) {
        console.log(response.data.orderId);
        for (let i = 0; i < cart.length; i++) {
          const cartItem = cart[i];
          const product = {
            orderId: response.data.orderId,
            productId: cartItem.productId,
            pizzaSize: cartItem.pizzaSize,
            count: cartItem.count,
          };
          console.log("Product:", product);
          const res = await storeOrderProduct(product);
          console.log("Product Response:", res);
        }
        dispatch(
          openSnackbar({
            message: "Order placed",
            severity: "success",
          })
        );
        
        setButtonLoad(false);
        setReload(!reload);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const updateQuntity = async (id, count) => {
    let updatedCount = count > 0 ? count : 0;
    console.log(id, count);
    try {
      const res = await updateFromCart({
        cartId: id,
        count: updatedCount,
      });

      dispatch(updateCartRed(res));
      setReload(!reload);
    } catch (err) {
      setReload(!reload);
      dispatch(
        openSnackbar({
          message: err.message,
          severity: "error",
        })
      );
    }
  };

  const removeCart = async (cartId) => {
    try {
      await deleteFromCart(cartId);
      dispatch(removeFromCartRed(cartId));
      // setProducts((prevItems) =>
      //   prevItems.filter((item) => item.cartId !== cartId)
      // );
    } catch (err) {
      dispatch(
        openSnackbar({
          message: err.message,
          severity: "error",
        })
      );
    }
  };

  // Fetch user profile data from localStorage or API (simulate fetching)
  const getUserProfile = async (userId) => {
    try {
      const response = await fetch(`https://localhost:8080/api/User/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userProfileArray = await response.json(); // Parse the JSON response

      console.log("Full API Response:", userProfileArray);

      // Check if the array has data
      if (userProfileArray.length > 0) {
        const userProfile = userProfileArray[0]; // Access the first element in the array

        // Display the required fields in the console
        console.log("User Profile Data:");
        console.log(`First Name: ${userProfile.firstName}`);
        console.log(`Last Name: ${userProfile.lastName}`);
        console.log(`Email: ${userProfile.email}`);
        console.log(`Phone Number: ${userProfile.phoneNo}`);

        return userProfile;
      } else {
        console.error("User profile array is empty");
        return null;
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  };

  // Example usage
  const autofillAddress = async () => {
    const userId = currentUser.id; // Replace with the actual user ID
    const userProfile = await getUserProfile(userId);
    if (userProfile) {
      setDeliveryDetails({
        ...userProfile, // Autofill form details with the user profile
      });
    } else {
      console.error("Failed to fetch user profile");
    }
  };
  return (
    <Container>
      <Section>
        <Title>Your Shopping Cart</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {cart.length === 0 ? (
              <>Cart is empty</>
            ) : (
              <Wrapper>
                <Left>
                  <Table>
                    <TableItem bold flex>
                      Product
                    </TableItem>

                    <TableItem bold>Price</TableItem>
                    <TableItem bold>Quantity</TableItem>
                    <TableItem bold>Subtotal</TableItem>
                    <TableItem></TableItem>
                  </Table>
                  {cart.map((item) => (
                    <Table key={item.cartId}>
                      <TableItem flex>
                        <Product>
                          <TableItem>{item.cartId}</TableItem>

                          <Img src={item?.productImg} />
                          <Details>
                            <Protitle>{item?.productName}</Protitle>
                            <ProDesc>{item?.pizzaSize}</ProDesc>
                          </Details>
                        </Product>
                      </TableItem>
                      <TableItem>LKR.{item?.unitPrice}</TableItem>
                      <TableItem>
                        <Counter>
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => {
                              if (item?.count > 1) {
                                updateQuntity(item?.cartId, item?.count - 1);
                              }
                            }}
                          >
                            -
                          </div>
                          {item?.count}{" "}
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => {
                              if (item?.count < 10) {
                                updateQuntity(item?.cartId, item?.count + 1);
                              }
                            }}
                          >
                            +
                          </div>
                        </Counter>
                      </TableItem>
                      <TableItem>
                        {" "}
                        LKR.
                        {(item.count * item?.unitPrice).toFixed(2)}
                      </TableItem>
                      <TableItem>
                        <DeleteOutline
                          sx={{ color: "red" }}
                          onClick={() => removeCart(item?.cartId)}
                        />
                      </TableItem>
                    </Table>
                  ))}
                </Left>
                <Right>
                  <Subtotal>
                    Subtotal : LKR:{calculateSubtotal().toFixed(2)}
                  </Subtotal>
                  <Delivery>
                    Delivery Details:
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <TextInput
                          small
                          placeholder="First Name"
                          value={deliveryDetails.firstName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              firstName: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          small
                          placeholder="Last Name"
                          value={deliveryDetails.lastName}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.email}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            email: e.target.value,
                          })
                        }
                      />

                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <TextInput
                          small
                          placeholder="Phone no. +91 XXXXX XXXXX"
                          value={deliveryDetails.phoneNo}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              phoneNo: e.target.value,
                            })
                          }
                        />

                        <TextInput
                          small
                          placeholder="postalcode"
                          value={deliveryDetails.postalcode}
                          handelChange={(e) =>
                            setDeliveryDetails({
                              ...deliveryDetails,
                              postalcode: e.target.value,
                            })
                          }
                        />
                      </div>

                      <FormControlLabel
                        control={<Switch />}
                        label="Use exitsing address"
                        onClick={autofillAddress}
                      />

                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.address}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Delivery>
                  <PaymentDialog
                    open={openPaymentDialog}
                    onClose={handleClosePaymentDialog}
                  />
                  <Button text="Checkout" small onClick={afterCheckout} />
                </Right>
              </Wrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
};

export default Cart;
