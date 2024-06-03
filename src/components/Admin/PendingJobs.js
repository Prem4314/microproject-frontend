// src/components/PendingJobs.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  approveJobPost,
  denyJobPost,
  listPendingJobPosts,
  listPendingJobRequests,
  approveJobRequest,
  denyJobRequest,
} from "../Service/api";
import Modal from "react-modal";
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
import ClipLoader from "react-spinners/ClipLoader"; // Using react-spinners for loading spinner

const PendingJobs = () => {
  const [loading, setLoading] = useState(true);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [pendingJobRequests, setPendingJobRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingJobs();
    fetchPendingJobRequests();
  }, []);

  const fetchPendingJobs = async () => {
    try {
      const data = await listPendingJobPosts();
      setPendingJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending job posts:", error);
      setLoading(false);
    }
  };

  const fetchPendingJobRequests = async () => {
    try {
      const data = await listPendingJobRequests();
      setPendingJobRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending job requests:", error);
      setLoading(false);
    }
  };

  const handleApprovePost = async (id) => {
    try {
      await approveJobPost(id);
      setNotification("Job post has been approved and will be posted soon.");
      setIsModalOpen(true);
      fetchPendingJobs();
    } catch (error) {
      console.error("Error approving job post:", error);
    }
  };

  const handleDenyPost = async (id, reason) => {
    try {
      await denyJobPost(id, reason);
      setNotification("Job post has been denied.");
      setIsModalOpen(true);
      fetchPendingJobs();
    } catch (error) {
      console.error("Error denying job post:", error);
    }
  };

  const handleApproveRequest = async (id) => {
    try {
      await approveJobRequest(id);
      setNotification("Job request has been approved.");
      setIsModalOpen(true);
      fetchPendingJobRequests();
    } catch (error) {
      console.error("Error approving job request:", error);
    }
  };

  const handleDenyRequest = async (id, reason) => {
    try {
      await denyJobRequest(id, reason);
      setNotification("Job request has been denied.");
      setIsModalOpen(true);
      fetchPendingJobRequests();
    } catch (error) {
      console.error("Error denying job request:", error);
    }
  };

  const handleLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    window.location.href = "/";
  };

  const closeLogoutConfirmModal = () => {
    setIsLogoutConfirmOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNotification("");
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
        {loading ? (
          <div style={loadingContainerStyle}>
            <ClipLoader color="#4caf50" loading={loading} size={50} />
          </div>
        ) : (
          <>
            <h2>Pending Job Posts</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Company Name</th>
                  <th style={tableHeaderStyle}>Job Description</th>
                  <th style={tableHeaderStyle}>Location</th>
                  <th style={tableHeaderStyle}>Job Type</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingJobs.map((job) => (
                  <tr key={job.id}>
                    <td style={tableCellStyle}>{job.companyName}</td>
                    <td
                      style={{
                        ...tableCellStyle,
                        maxWidth: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {job.jobDescription}
                    </td>
                    <td style={tableCellStyle}>{job.location}</td>
                    <td style={tableCellStyle}>{job.jobType}</td>
                    <td style={tableCellStyle}>{job.status}</td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => handleApprovePost(job.id)}
                        style={approveButtonStyle}
                      >
                        <FaCheck size={12} /> Approve
                      </button>
                      <button
                        onClick={() => handleDenyPost(job.id, "Some reason")}
                        style={denyButtonStyle}
                      >
                        <FaTimes size={12} /> Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2>Pending Job Requests</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>Qualifications</th>
                  <th style={tableHeaderStyle}>Completed Year</th>
                  <th style={tableHeaderStyle}>Contact Details</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingJobRequests.map((request) => (
                  <tr key={request.id}>
                    <td style={tableCellStyle}>{request.name}</td>
                    <td style={tableCellStyle}>{request.qualifications}</td>
                    <td style={tableCellStyle}>{request.completedYear}</td>
                    <td style={tableCellStyle}>{request.contactDetails}</td>
                    <td style={tableCellStyle}>{request.status}</td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        style={approveButtonStyle}
                      >
                        <FaCheck size={12} /> Approve
                      </button>
                      <button
                        onClick={() =>
                          handleDenyRequest(request.id, "Some reason")
                        }
                        style={denyButtonStyle}
                      >
                        <FaTimes size={12} /> Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        Go Back
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Approval Notification"
        style={modalStyle}
      >
        <h2>{notification}</h2>
        <button onClick={closeModal} style={modalButtonStyle}>
          Close
        </button>
      </Modal>
      <Modal
        isOpen={isLogoutConfirmOpen}
        onRequestClose={closeLogoutConfirmModal}
        contentLabel="Logout Confirmation"
        style={modalStyle}
      >
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <button onClick={confirmLogout} style={modalButtonStyle}>
          Yes, Logout
        </button>
        <button onClick={closeLogoutConfirmModal} style={modalButtonStyle}>
          Cancel
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
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "12px",
};

const denyButtonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
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

export default PendingJobs;
