import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp , UserCreate , UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/UserSlice";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";


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

const SignUp = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      const username = email; 
      const roles = ["customer"]; 
      const userType = "customer"; 
      const userData = {
        firstName,
        lastName,
        email,
        userType,
      };

      try {
        const createResponse = await UserCreate(userData);
        
        if (createResponse.status === 200) {
          const signUpResponse = await UserSignUp({ username, password, roles });
          console.log(' createuser', signUpResponse);

          if (signUpResponse.status === 200) {
            console.log('UserSignUp response:', signUpResponse);
            const signInResponse = await UserSignIn({ username, password });
            console.log('UserSignIn response:', signInResponse);
            dispatch(loginSuccess(signInResponse.data));
            dispatch(
              openSnackbar({
                message: "Sign Up Successful",
                severity: "success",
              })
            );
            setLoading(false);
            setButtonDisabled(false);
            setOpenAuth(false);
          }
        }

      } catch (err) {
        console.log('Error in handleSignUp:', err);
        setButtonDisabled(false);
        if (err.response) {
          setLoading(false);
          setButtonDisabled(false);
          alert(err.response.data.message);
          dispatch(
            openSnackbar({
              message: err.response.data.message,
              severity: "error",
            })
          );
        } else {
          setLoading(false);
          setButtonDisabled(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        }
      }
    }
  };

  return (
    <Container>
      <div>
        <Title>Create New Acc👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          handelChange={(e) => setFirstName(e.target.value)}
        />
         <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          handelChange={(e) => setLastName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
