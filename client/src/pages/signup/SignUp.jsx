import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import Logo from "../../assets/img/logo.png";
import SignUpImage from "../../assets/img/signupImage.jpg";
import { signup } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import store from "../../redux/store";
import "./SignUp.css";
import GoogleSignInButton from "./GoogleSignInButton";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const signUpMail = async () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const data = {
        name,
        role,
        email,
        password,
      };
      let response = await props.signup(data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // const handleGoogleLoginSuccess = async (response) => {
  //   setLoading(true);
  //   try {
  //     const { profileObj, tokenId } = response;
  //     const data = {
  //       name: profileObj.name,
  //       email: profileObj.email,
  //       role,
  //       googleToken: tokenId,
  //     };
  //     let result = await props.signup(data);
  //     console.log(result);
  //   } catch (e) {
  //     console.error("Google login failed:", e);
  //   }
  //   setLoading(false);
  // };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
  };

  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true);
    try {
      const { tokenId } = response;
      const data = { googleToken: tokenId };
      const res = await fetch("/api/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 200) {
        console.log("Login successful", result);
        // Handle successful login, e.g., save token, redirect, etc.
      } else {
        console.error("Login failed:", result.message);
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (props.alert_message) {
      alert("Error in signup: " + props.alert_message.data.message);
      store.dispatch({ type: "SET_ALERT", payload: { message: null } });
    }
  }, [props.alert_message]);

  return (
    <Grid container className="signup-container">
      {/* Left Section */}
      <Grid item xs={6} className="left-section">
        <Box className="branding">
          <img alt="logo" src={Logo} style={{ marginBottom: "1rem", width: "150px" }} />
          <Typography variant="h4" className="tagline">
            Welcome to Your Journey!
          </Typography>
          <Typography variant="body1" className="description">
            Simplify onboarding with our platform.
          </Typography>
          <img alt="signup" src={SignUpImage} className="signup-image" />
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item xs={6} className="right-section">
        <Box className="form-container">
          <Typography variant="h4" className="form-heading">
            Create Account
          </Typography>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{ marginTop: "0px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ marginTop: "0px" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ marginTop: "0px" }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            style={{ marginTop: "0px" }}
          />
          <FormControl fullWidth margin="normal" style={{ marginTop: "0px" }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            }
            label="I agree to the Terms & Conditions"
          />
          <Button
            variant="contained"
            fullWidth
            className="submit-button"
            onClick={signUpMail}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create an Account"}
          </Button>
          <Typography
            variant="body2"
            className="signin-link"
            style={{ marginTop: "10px", fontWeight: 600 }}
          >
            Already a user? <Link to="/signin">Sign in here</Link>.
          </Typography>
          <Typography variant="body2" className="or-divider" style={{ marginTop: "15px", display: "flex", justifyContent: "space-evenly" }}>
            OR
          </Typography>
          <GoogleSignInButton
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            clientId="752044554768-n169aibds88s15hp40eb619pc4h145fc.apps.googleusercontent.com"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const mapActionWithProps = {
  signup,
};

const mapPropsWithState = (state) => ({
  alert_message: state.user.alert_message,
  success_message: state.user.success_message,
});

export default connect(mapPropsWithState, mapActionWithProps)(SignUp);