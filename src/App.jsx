import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Order from "./pages/Order";
import { useState } from "react";
import Authentication from "./pages/Auth/Authentication";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Customers from "./pages/Admin/Customers";
import Orders from "./pages/Admin/Orders";
import AddProduct from "./pages/Admin/AddProduct";
import PrivateRoute from "./components/PrivateRoute";
import { Snackbar } from "@mui/material";
import { closeSnackbar } from "./redux/reducers/SnackbarSlice";
import Products from "./pages/Admin/Products";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Feedbacks from "./pages/Admin/Feedbacks";
import Contact from "./pages/Contact";

const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/forgetPassword" exact element={<ForgetPassword />} />
            <Route path="/reset-password" exact element={<ResetPassword/>} />
            <Route path="/orders" exact element={<Order />} />
            <Route path="/contact" exact element={<Contact />} />
            
            <Route
              path="/admin/dashboard"
              exact
              element={
                 <PrivateRoute>
                    <AdminDashboard />
                 </PrivateRoute>
              }
            />
            <Route
              path="/admin/customers"
              exact
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              exact
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products"
              exact
              element={
                <PrivateRoute>
                  <Products/>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/add-product"
              exact
              element={
                <PrivateRoute>
                  <AddProduct/>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/feedbacks"
              exact
              element={
                <PrivateRoute>
                <Feedbacks/>
                </PrivateRoute>
              }
            />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}

          <Snackbar
            open={open}
            message={message}
            severity={severity}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
