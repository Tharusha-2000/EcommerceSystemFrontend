import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { UserSignIn } from "../api";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import LogoImage from "../utils/Images/Logo.png";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom"; 

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 180px;
  z-index: 10;
`;


const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const validateInputs = () => {
    if (!username || !password) {
      dispatch(
        openSnackbar({
          message: "Please fill all the fields",
          severity: "error",
        })
       );
       setLoading(false);
       setButtonDisabled(false);
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({ username, password })
         
        .then((res) => {
          const token = res.data.jwtToken;
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          console.log(userRole);
           dispatch(loginSuccess(res.data));
          if (userRole === "Admin") {
            navigate("/admin/dashboard"); 
            setOpenAuth(false);
             console.log("Admin");

          } else {
            console.log("Regular User");
            navigate("/"); // Navigate to homepage for regular users
            setOpenAuth(false);
          }
          
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })

          );
          setLoading(false);
          setButtonDisabled(false);
          setOpenAuth(false);
        })
        .catch((err) => {
          setLoading(false);
          setButtonDisabled(false);
          console.log(err.response);
          dispatch(
            openSnackbar({
              message:  err.response.data,
              severity: "error",
            })
          );
        });
    }
  };

  const handleForgotPasswordClick = () => {
    setOpenAuth(false);
    navigate('/forgetPassword');
  };


  return (
    <Container>
      <div>
        <Logo src={LogoImage} />
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={username}
          handelChange={(e) => setUserName(e.target.value)}
        />

        
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />

        <TextButton onClick={handleForgotPasswordClick}>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;
