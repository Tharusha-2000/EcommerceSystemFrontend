import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { addToCart, deleteFromCart, getCart, placeOrder,updateFromCart } from "../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";
import PaymentDialog from "./Checkout";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


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
`;
const Img = styled.img`
  height: 80px;
`;
const Details = styled.div`
  max-width: 130px;
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
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const handleOpenPaymentDialog = () => {
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };



  const getProducts = async () => {
    setLoading(true);
    // const token = localStorage.getItem("krist-app-token");
    await getCart().then((res) => {
      setProducts(res.data);
      console.log(res.data);
      setLoading(false);
    });

  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.count* item?.unitPrice,
      0
    );
  };
  const convertAddressToString = (addressObj) => {
    // Convert the address object to a string representation
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  // const PlaceOrder = async () => {
  //   setButtonLoad(true);
  //   try {
  //     const isDeliveryDetailsFilled =
  //       deliveryDetails.firstName &&
  //       deliveryDetails.lastName &&
  //       deliveryDetails.completeAddress &&
  //       deliveryDetails.phoneNumber &&
  //       deliveryDetails.emailAddress;

  //     if (!isDeliveryDetailsFilled) {
  //       // Show an error message or handle the situation where delivery details are incomplete
  //       dispatch(
  //         openSnackbar({
  //           message: "Please fill in all required delivery details.",
  //           severity: "error",
  //         })
  //       );
  //       return;
  //     }

  //     // const token = localStorage.getItem("krist-app-token");
      const totalAmount = calculateSubtotal().toFixed(2);
  //     const orderDetails = {
  //       products,
  //       address: convertAddressToString(deliveryDetails),
  //       totalAmount,
  //     };

  //     await placeOrder(token, orderDetails);
  //     dispatch(
  //       openSnackbar({
  //         message: "Order placed successfully",
  //         severity: "success",
  //       })
  //     );
  //     setButtonLoad(false);
  //     // Clear the cart and update the UI
  //     setReload(!reload);
  //   } catch (err) {
  //     dispatch(
  //       openSnackbar({
  //         message: "Failed to place order. Please try again.",
  //         severity: "error",
  //       })
  //     );
  //     setButtonLoad(false);
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);

 
  const updateQuntity = async (id,count) => {
    let updatedCount = count > 0 ? count : 0;  
    try {
      await updateFromCart({
        cartId: id,
        count: updatedCount,

      });
      setProducts(prevItems => 
        prevItems.map(item => 
          item.cartId === id ? { ...item, count: updatedCount } : item
        )
      );

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

      console.log(cartId);

      await deleteFromCart(cartId);
  
      setProducts(prevItems => prevItems.filter(item => item.cartId !== cartId));
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
      const getUserProfile = () => {
        // Replace this with an actual API call or retrieve from localStorage
        return {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phoneNo: "+1234567890",
          address: "123 Main St, City, Country, 12345",
        };
      };
    

    // Autofill the address fields from the user's profile data
    const autofillAddress = () => {
      const userProfile = getUserProfile();
      setDeliveryDetails({
        ...userProfile,  // This will set all address details from profile to the form
      });
    };


  return (
    <Container>
      <Section>
        <Title>Your Shopping Cart</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 ? (
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
                  {products.map((item) => (
                    <Table key={item.cartId}>
                      <TableItem flex>
                        <Product>
                        <TableItem>{item.cartId}</TableItem>

                          <Img src={item.productImg} />
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
                            onClick={() =>  
                              updateQuntity(item?.cartId, item?.count - 1)
                            }
                          >
                            -
                          </div>
                          {item?.count}{" "}
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                            }}
                            onClick={() => updateQuntity(item?.cartId, item?.count + 1)}
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
                          onClick={() => removeCart( item?.cartId ) }
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
                        control={<Switch/>}
                        label= "Use exitsing address"
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
                  <PaymentDialog open={openPaymentDialog} onClose={handleClosePaymentDialog} />
                  <Button
                    text="Checkout"
                    small
                    onClick={handleOpenPaymentDialog}
                  />
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
