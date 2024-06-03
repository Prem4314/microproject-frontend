// src/components/ManageEvents.js
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
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import { listEvents, addEvent, updateEvent, deleteEvent } from "../Service/api"; // Make sure to import the necessary functions
import "chart.js/auto";

const ManageEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    image: null,
  });
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await listEvents();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
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
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, newEvent);
      } else {
        await addEvent(newEvent);
      }
      fetchEvents();
      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      name: event.name,
      description: event.description,
      date: event.date,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
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
        <button
          style={addEventButtonStyle}
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>
        {loading ? (
          <p style={loadingStyle}>Loading...</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events
                .filter((event) =>
                  event.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((event) => (
                  <tr key={event.id}>
                    <td style={tableCellStyle}>{event.name}</td>
                    <td style={tableCellStyle}>{event.description}</td>
                    <td style={tableCellStyle}>{event.date}</td>
                    <td style={tableCellStyle}>
                      <button
                        style={editButtonStyle}
                        onClick={() => handleEditEvent(event)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <FaTrashAlt />
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
        contentLabel="Event Modal"
        style={modalStyle}
      >
        <h1>{selectedEvent ? "Edit Event" : "Add Event"}</h1>
        <form onSubmit={handleEventSubmit}>
          <div style={formGroupStyle}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              style={formInputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label>Description</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              style={formInputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              style={formInputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              style={formInputStyle}
              accept="image/*"
            />
          </div>
          <button type="submit" style={modalButtonStyle}>
            {selectedEvent ? "Update" : "Add"} Event
          </button>
          <button type="button" onClick={closeModal} style={modalButtonStyle}>
            Cancel
          </button>
        </form>
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

const addEventButtonStyle = {
  backgroundColor: "#4caf50",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px",
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

const editButtonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "5px",
};

const deleteButtonStyle = {
  backgroundColor: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
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

const formGroupStyle = {
  marginBottom: "15px",
};

const formInputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  outline: "none",
  backgroundColor: "#2e2e3f",
  color: "#fff",
};

const modalButtonStyle = {
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  marginRight: "10px",
};

export default ManageEvents;
