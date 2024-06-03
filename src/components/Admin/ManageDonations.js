// src/components/ManageDonations.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaDonate,
  FaCalendarPlus,
  FaImage,
  FaUserCheck,
  FaBriefcase,
  FaSearch,
  FaSignOutAlt,
  FaEye,
} from "react-icons/fa";
import Modal from "react-modal";
import { listDonations } from "../Service/api"; // Ensure you import the necessary functions
import "chart.js/auto";

const ManageDonations = () => {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await listDonations();
      setDonations(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
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
          <input
            type="text"
            placeholder="Search..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch style={searchIconStyle} />
        </div>
        <button style={logoutButtonStyle} onClick={() => (window.location.href = "/")}>
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
        {loading ? (
          <p style={loadingStyle}>Loading...</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Alumni Name</th>
                <th style={tableHeaderStyle}>Amount</th>
                <th style={tableHeaderStyle}>Reason</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations
                .filter((donation) =>
                  donation.alumni.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((donation) => (
                  <tr key={donation.id}>
                    <td style={tableCellStyle}>{donation.alumni.name}</td>
                    <td style={tableCellStyle}>{donation.amount}</td>
                    <td style={tableCellStyle}>{donation.reason}</td>
                    <td style={tableCellStyle}>
                      <button
                        style={viewButtonStyle}
                        onClick={() => handleViewDetails(donation)}
                      >
                        <FaEye /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Donation Details"
        style={modalStyle}
      >
        {selectedDonation && (
          <div>
            <h2>Donation Details</h2>
            <p><strong>Alumni Name:</strong> {selectedDonation.alumni.name}</p>
            <p><strong>Amount:</strong> ${selectedDonation.amount}</p>
            <p><strong>Reason:</strong> {selectedDonation.reason}</p>
            {selectedDonation.proof && (
              <div>
                <h3>Proof:</h3>
                <img
                  src={`data:image/jpeg;base64,${selectedDonation.proof}`}
                  alt="Proof of Donation"
                  style={proofImageStyle}
                />
              </div>
            )}
            <button onClick={closeModal} style={modalButtonStyle}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#1e1e2f",
  minHeight: "100vh",
  color: "#eee",
  padding: "20px",
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

const loadingStyle = {
  textAlign: "center",
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

const viewButtonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#3f3f5f",
    color: "#fff",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "500px",
    width: "100%",
  },
};

const proofImageStyle = {
  maxWidth: "100%",
  maxHeight: "300px",
  marginTop: "10px",
};

const modalButtonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

export default ManageDonations;
