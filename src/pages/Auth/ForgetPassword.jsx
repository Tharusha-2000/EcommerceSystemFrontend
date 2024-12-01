import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import image2 from "../../utils/Images/forgetpass.png";
import Button from "../../components/Button";
import { SendEmail } from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      dispatch(
        openSnackbar({
          message: "Please enter a valid email address",
          severity: "error",
        })
      );
      return;
    }

    try {
     
      const response = await SendEmail({ email });

      dispatch(
        openSnackbar({
          message: response?.data?.message || "Email sent successfully!",
          severity: "success",
        })

      );
     

    } catch (error) {
      console.error("Error sending email:", error);

      dispatch(
        openSnackbar({
          message: error?.response?.data?.message || "Failed to send email",
          severity: "error",
        })
      );
    }
  };

  return (
    <main
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          my: 0,
          py: 3,
          px: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
          backgroundColor: "rgba(178, 190, 181, 0.73)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "lg",
          },
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h5" component="h3">
            <b>Forget Password</b>
          </Typography>
          <br />
          <br />
          <Typography variant="body1">Enter the email address.</Typography>
        </div>
        <Input
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="Send Email" type="primary" onClick={handleSubmit} />
      </Paper>
    </main>
  );
};

export default ForgetPassword;


