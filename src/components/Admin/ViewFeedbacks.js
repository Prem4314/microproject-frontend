// src/components/ViewFeedback.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { listFeedbacks } from "../Service/api";
import ClipLoader from "react-spinners/ClipLoader";
import {
  FaSignOutAlt,
  FaUserCheck,
  FaBriefcase,
  FaDonate,
  FaCalendarPlus,
  FaImage,
  FaComments,
  FaSearch,
} from "react-icons/fa";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await listFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>{greeting()}, Admin</h1>
        <div style={searchContainerStyle}>
          <input type="text" placeholder="Search..." style={searchInputStyle} />
          <FaSearch style={searchIconStyle} />
        </div>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          <FaSignOutAlt style={logoutIconStyle} /> Logout
        </button>
      </header>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/admin/alumni" style={navLinkStyle}>
              <FaUserCheck size={20} /> Pending Alumni
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/admin/pendingjobs" style={navLinkStyle}>
              <FaBriefcase size={20} /> Pending Job Posts
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/admin/donations" style={navLinkStyle}>
              <FaDonate size={20} /> Donations
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/admin/events" style={navLinkStyle}>
              <FaCalendarPlus size={20} /> Events
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/admingallery" style={navLinkStyle}>
              <FaImage size={20} /> Gallery
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/admin/feedbacks" style={navLinkStyle}>
              <FaComments size={20} /> Feedbacks
            </Link>
          </li>
        </ul>
      </nav>
      <div style={contentStyle}>
        <h2>Feedbacks</h2>
        {loading ? (
          <div style={loadingContainerStyle}>
            <ClipLoader color="#4caf50" loading={loading} size={50} />
            <p>Please wait, loading feedbacks...</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Alumni Name</th>
                <th style={tableHeaderStyle}>Message</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td style={tableCellStyle}>{feedback.alumni.name}</td>
                  <td style={tableCellStyle}>{feedback.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Go Back
      </button>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  backgroundColor: "#333",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  color: "#fff",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#2e2e3f",
  padding: "20px",
  borderRadius: "10px",
};

const headerTitleStyle = {
  fontSize: "24px",
};

const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const searchInputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  outline: "none",
  marginRight: "10px",
  backgroundColor: "#2e2e3f",
  color: "#fff",
};

const searchIconStyle = {
  color: "#888",
};

const logoutButtonStyle = {
  backgroundColor: "#d32f2f",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const logoutIconStyle = {
  marginRight: "5px",
};

const navStyle = {
  backgroundColor: "#3949ab",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  justifyContent: "space-around",
};

const navItemStyle = {
  display: "inline",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

const navLinkStyleHover = {
  backgroundColor: "#3f51b5",
};

const contentStyle = {
  padding: "20px",
  backgroundColor: "#2e2e3f",
  borderRadius: "10px",
  marginTop: "20px",
};

const loadingContainerStyle = {
  textAlign: "center",
  padding: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#3e3e4f",
  borderRadius: "10px",
  overflow: "hidden",
};

const tableHeaderStyle = {
  borderBottom: "1px solid #444",
  padding: "10px",
  color: "#fff",
  textAlign: "left",
  backgroundColor: "#3949ab",
};

const tableCellStyle = {
  borderBottom: "1px solid #444",
  padding: "10px",
};

const backButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3949ab",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ViewFeedback;
