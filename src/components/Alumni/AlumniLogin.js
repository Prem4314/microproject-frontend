import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAlumni } from "../Service/api";
import alumniImage from "../Images/AlumniLogin.jpg";

const AlumniLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = alumniImage;
    img.onload = () => {
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginAlumni({ username, password });

      if (response.status === 200) {
        const alumniData = response.data;
        sessionStorage.setItem("alumniData", JSON.stringify(alumniData));
        alert("Login successful");
        window.location.href = "/alumnidashboard";
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Invalid credentials.");
            break;
          case 403:
            if (err.response.data === "Account is pending approval") {
              setError(
                "Please wait, your account is under verification. Check your email."
              );
            }
            break;
          case 404:
            if (err.response.data === "Account has been denied") {
              setError(
                "Your account is denied. Please contact college management."
              );
            }
            break;
          default:
            setError("Server error. Please try again later.");
        }
      } else {
        setError("Invalid credentials or server error");
      }
      setUsername("");
      setPassword("");
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${alumniImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {imageError && (
        <div>
          {window.alert(
            "Failed to load background image. Please try again later."
          )}
        </div>
      )}
      {!imageError && (
        <Container
          maxWidth="xs"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              <strong>Welcome Alumni..!</strong>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </form>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => (window.location.href = "/")}
            >
              Back to Home
            </Button>
          </Box>
          <Box mt={5} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              <strong>
                "The future depends on what you do today." - Mahatma Gandhi
              </strong>
            </Typography>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default AlumniLogin;
