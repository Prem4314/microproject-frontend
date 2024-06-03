import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const ResponsiveNavbar = ({ isLoggedIn, userType, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateTo = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Button
            color="inherit"
            onClick={toggleDrawer}
            style={{ marginRight: "20px" }}
          >
            <MenuIcon />
          </Button>
          <Typography
            variant="h4"
            component="div"
            style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Alumni Tracking System
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              style={{ marginRight: "10px" }}
              onClick={() => navigateTo("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ marginRight: "10px" }}
              sx={{ "&:hover": { backgroundColor: "#6573c3" } }}
            >
              Login
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigateTo("/adminlogin")}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Admin
              </MenuItem>
              <MenuItem onClick={() => navigateTo("/alumnilogin")}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Alumni
              </MenuItem>
            </Menu>
            <Button
              color="inherit"
              startIcon={<PersonAddIcon />}
              onClick={() => navigateTo("/register")}
              style={{ marginRight: "10px" }}
              sx={{ "&:hover": { backgroundColor: "#6573c3" } }}
            >
              Register
            </Button>
            {isLoggedIn && (
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ "&:hover": { backgroundColor: "#6573c3" } }}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => navigateTo("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/adminlogin")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Login" />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/alumnilogin")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Alumni Login" />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/register")}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
          {isLoggedIn && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default ResponsiveNavbar;
