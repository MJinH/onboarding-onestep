import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleSignInButton = ({ onSuccess, onFailure, clientId }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Box textAlign="center" marginTop={2}>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setLoading(true);
              renderProps.onClick();
            }}
            // disabled={loading || renderProps.disabled}
            startIcon={<GoogleIcon />}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Single Sign On with Google"
            )}
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy="single_host_origin"
      />
    </Box>
  );
};

export default GoogleSignInButton;
