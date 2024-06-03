import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Service/api";
import adminBackground from "../Images/Admin.jpg"; // Background image path
import swal from "sweetalert"; // Import SweetAlert

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin({ username, password });

      if (response.data === "Admin logged in") {
        swal("Success", "Admin logged in successfully!", "success").then(() => {
          navigate("/admin/alumni");
        });
      } else {
        setError("Invalid credentials or server error");
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 2000);
      setUsername(""); // Reset username
      setPassword(""); // Reset password
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${adminBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
            <strong>Welcome Admin..!</strong>
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
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            <strong>
              "Great things in business are never done by one person. They're
              done by a team of people." - Steve Jobs
            </strong>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;
