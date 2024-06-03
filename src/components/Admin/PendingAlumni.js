// src/components/PendingAlumni.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { approveAlumni, denyAlumni, listPendingAlumni } from "../Service/api";
import Modal from "react-modal";
import ClipLoader from "react-spinners/ClipLoader";
import {
  FaCheck,
  FaTimes,
  FaSignOutAlt,
  FaUserCheck,
  FaBriefcase,
  FaDonate,
  FaCalendarPlus,
  FaImage,
  FaComments,
  FaSearch,
} from "react-icons/fa";

const PendingAlumni = () => {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingAlumni();
  }, []);

  const fetchPendingAlumni = async () => {
    try {
      const data = await listPendingAlumni();
      setPendingAlumni(data);
    } catch (error) {
      console.error("Error fetching pending alumni:", error);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await approveAlumni(id);
      setNotification("Alumni has been approved and email sent.");
      setIsApproveModalOpen(true);
      fetchPendingAlumni();
    } catch (error) {
      console.error("Error approving alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async (id, reason) => {
    setLoading(true);
    try {
      await denyAlumni(id, reason);
      setNotification("Alumni has been denied.");
      setIsDenyModalOpen(true);
      fetchPendingAlumni();
    } catch (error) {
      console.error("Error denying alumni:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setNotification("");
  };

  const closeDenyModal = () => {
    setIsDenyModalOpen(false);
    setNotification("");
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
        <h2>Pending Alumni</h2>
        {loading ? (
          <div style={loadingContainerStyle}>
            <ClipLoader color="#4caf50" loading={loading} size={50} />
            <p>Please wait, processing...</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Age</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Graduation Year</th>
                <th style={tableHeaderStyle}>Company Name</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingAlumni.map((alumni) => (
                <tr key={alumni.id}>
                  <td style={tableCellStyle}>{alumni.name}</td>
                  <td style={tableCellStyle}>{alumni.age}</td>
                  <td style={tableCellStyle}>{alumni.email}</td>
                  <td style={tableCellStyle}>{alumni.graduationYear}</td>
                  <td style={tableCellStyle}>{alumni.currentEmployment}</td>
                  <td style={tableCellStyle}>{alumni.status}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => handleApprove(alumni.id)}
                      style={approveButtonStyle}
                    >
                      <FaCheck size={12} /> Approve
                    </button>
                    <button
                      onClick={() => handleDeny(alumni.id, "Some reason")}
                      style={denyButtonStyle}
                    >
                      <FaTimes size={12} /> Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Go Back
      </button>
      <Modal
        isOpen={isApproveModalOpen}
        onRequestClose={closeApproveModal}
        contentLabel="Approval Notification"
        style={modalStyle}
      >
        <h2>{notification}</h2>
        <button onClick={closeApproveModal} style={modalButtonStyle}>
          Close
        </button>
      </Modal>
      <Modal
        isOpen={isDenyModalOpen}
        onRequestClose={closeDenyModal}
        contentLabel="Deny Notification"
        style={modalStyle}
      >
        <h2>{notification}</h2>
        <button onClick={closeDenyModal} style={modalButtonStyle}>
          Close
        </button>
      </Modal>
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

const approveButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#4caf50",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "12px",
  marginRight: "5px",
};

const denyButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#f44336",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "12px",
};

const backButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3949ab",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
};

const modalButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3949ab",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

export default PendingAlumni;
