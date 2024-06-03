// File: src/components/AlumniRegister.js

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerAlumni } from "../Service/api";
import {
  AccountCircle,
  Email,
  Lock,
  Home,
  Work,
  Phone,
  School,
} from "@mui/icons-material";
import backgroundImage from "../Images/Alumni Register.jpg"; // Ensure you have an image in your assets folder

const AlumniRegister = () => {
  const navigate = useNavigate();
  const [alumniData, setAlumniData] = useState({
    name: "",
    age: "",
    gender: "",
    mobileNumber: "",
    address: "",
    currentEmployment: "",
    graduationYear: "",
    department: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumniData({ ...alumniData, [name]: value });
  };

  const validateForm = () => {
    const {
      name,
      age,
      gender,
      mobileNumber,
      address,
      currentEmployment,
      graduationYear,
      department,
      username,
      email,
      password,
    } = alumniData;

    if (
      !name ||
      !age ||
      !gender ||
      !mobileNumber ||
      !address ||
      !currentEmployment ||
      !graduationYear ||
      !department ||
      !username ||
      !email ||
      !password
    ) {
      return "All fields are required.";
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return "Invalid mobile number. It should be a 10-digit number.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email address.";
    }

    if (!/^\d{2}$/.test(age)) {
      return "Invalid age. It should be a two-digit number.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await registerAlumni(alumniData);
      setMessage(response);
      setAlumniData({
        name: "",
        age: "",
        gender: "",
        mobileNumber: "",
        address: "",
        currentEmployment: "",
        graduationYear: "",
        department: "",
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/"); // Redirect to homepage
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
      }}
    >
      <Card sx={{ boxShadow: 3, maxWidth: 800, width: "100%", margin: "20px" }}>
        <CardContent
          sx={{ px: 4, py: 3, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Alumni
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Please fill out the form to register as an alumni.
          </Typography>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={alumniData.name}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <AccountCircle position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="age"
                  value={alumniData.age}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputProps: { min: 10, max: 99 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  name="gender"
                  value={alumniData.gender}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  name="mobileNumber"
                  value={alumniData.mobileNumber}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Phone position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={alumniData.address}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Home position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Current Employment"
                  variant="outlined"
                  fullWidth
                  name="currentEmployment"
                  value={alumniData.currentEmployment}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Work position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Graduation Year"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="graduationYear"
                  value={alumniData.graduationYear}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputProps: { min: 1900, max: new Date().getFullYear() },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  name="department"
                  value={alumniData.department}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <School position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={alumniData.username}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <AccountCircle position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
                  value={alumniData.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Email position="start" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={alumniData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <Lock position="start" />,
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{" "}
              <Link href="/alumnilogin" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AlumniRegister;
