import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, notification } from "antd";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Grid,
} from "@mui/material";
import { signin, sendVerificationCode, verifyCode, resetPassword } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import store from "../../redux/store";
import Logo from "../../assets/img/logo.png";
import SignUpImage from "../../assets/img/signupImage.jpg";
import "../signup/SignUp.css";
import "./SignIn.css"; // CSS file for Forgot Password styles
import GoogleSignInButton from "../signup/GoogleSignInButton";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const signInMail = async () => {
    setLoading(true);
    try {
      const data = {
        email: email,
        password: password,
      };
      await props.signin(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const close = () => {
    store.dispatch({ type: "SET_ALERT", payload: { message: null } });
  };

  const openNotification = (data) => {
    notification["error"]({
      message: "Error in signin",
      description: data.message,
      onClose: close,
    });
  };

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
    if (props.alert_message !== null && props.alert_message !== undefined) {
      openNotification(props.alert_message.data);
    }
  }, [props.alert_message]);

  // Handler for Forgot Password Email Submission
  const handleSendVerification = async () => {
    if (!email) {
      notification["warning"]({ message: "Please enter your email." });
      return;
    }
    try {
      await props.sendVerificationCode({ email });
      notification["success"]({ message: "Verification code sent!" });
      setCodeSent(true);
    } catch (error) {
      notification["error"]({ message: "Failed to send verification code." });
    }
  };

  // Handler for Password Reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      notification["warning"]({ message: "Passwords do not match!" });
      return;
    }
    if (!verificationCode) {
      notification["warning"]({ message: "Please enter the verification code." });
      return;
    }
    try {
      await props.verifyCode({ email, code: verificationCode });
      await props.resetPassword({ email, newPassword });
      notification["success"]({ message: "Password reset successful!" });
      setIsForgotPassword(false); // Go back to sign-in view
    } catch (error) {
      notification["error"]({ message: "Failed to reset password." });
    }
  };

  return (
    <Grid container className="signup-container">
      {/* Left Section */}
      <Grid item xs={6} className="left-section">
        <div className="branding">
          <Link to="/">
            <img alt="logo" src={Logo} className="logo" style={{ width: "150px" }}/>
          </Link>
          <Typography variant="h4" className="tagline">
            Welcome Back!
          </Typography>
          <Typography variant="body1" className="description">
            Log in to your account and continue your journey.
          </Typography>
          <img alt="signup" src={SignUpImage} className="signup-image" />
        </div>
      </Grid>

      {/* Right Section */}
      <Grid item xs={6} className="right-section">
        <div className="form-container">
          {!isForgotPassword ? (
            <>
              {/* Sign-In View */}
              <Typography variant="h4" className="form-heading">
                Login to Your Account
              </Typography>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    signInMail();
                  }
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    signInMail();
                  }
                }}
              />
              <Button
                variant="contained"
                fullWidth
                className="submit-button"
                style={{ padding: "0px 20px" }}
                type="primary"
                onClick={signInMail}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Typography
                variant="body2"
                className="forgot-password-link"
                onClick={() => setIsForgotPassword(true)}
                style={{ marginTop: "10px", cursor: "pointer" }}
              >
                Forgot password? Click here to reset.
              </Typography>
              <Link
                variant="body2"
                className="forgot-password-link"
                to="/signup"
                style={{ marginTop: "10px", cursor: "pointer" }}
              >
                New User? SignUp!
              </Link>
              <Typography variant="body2" className="or-divider" style={{ marginTop: "15px", display: "flex", justifyContent: "space-evenly" }}>
                OR
              </Typography>
              <GoogleSignInButton
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                clientId="752044554768-n169aibds88s15hp40eb619pc4h145fc.apps.googleusercontent.com"
          />
            </>
          ) : (
            <>
              {/* Forgot Password View */}
              <Typography variant="h4" className="form-heading">
                Reset Your Password
              </Typography>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Button
                variant="contained"
                fullWidth
                className="submit-button"
                style={{ padding: "0px 20px" }}
                onClick={handleSendVerification}
                disabled={codeSent}
              >
                {codeSent ? "Code Sent!" : "Send Verification Code"}
              </Button>

              {codeSent && (
                <>
                  <TextField
                    label="Verification Code"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    value={verificationCode}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    className="submit-button"
                    style={{ padding: "0px 20px" }}
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </Button>
                </>
              )}
              <Typography
                variant="body2"
                className="forgot-password-link"
                onClick={() => setIsForgotPassword(false)}
                style={{ marginTop: "10px", cursor: "pointer" }}
              >
                Back to Login
              </Typography>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

const mapActionWithProps = {
  signin,
  sendVerificationCode,
  verifyCode,
  resetPassword,
};

const mapPropsWithState = (state) => ({
  alert_message: state.user.alert_message,
  success_message: state.user.success_message,
});

export default connect(mapPropsWithState, mapActionWithProps)(SignIn);
