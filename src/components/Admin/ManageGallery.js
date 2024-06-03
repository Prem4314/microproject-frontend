import React, { useEffect, useState } from "react";
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
  FaTrashAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { listGalleries, addImage, deleteImage } from "../Service/api";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await listGalleries();
      setImages(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
      Swal.fire("Error", "Error fetching images. Please try again.", "error");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await addImage(formData);
      Swal.fire("Success", "Image added successfully.", "success");
      fetchImages(); // Refresh the gallery after uploading
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire("Error", "Error uploading image. Please try again.", "error");
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await deleteImage(id);
      Swal.fire("Success", "Image deleted successfully.", "success");
      fetchImages(); // Refresh the gallery after deleting
    } catch (error) {
      console.error("Error deleting image:", error);
      Swal.fire("Error", "Error deleting image. Please try again.", "error");
    }
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    window.location.href = "/";
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <li>
            <Link to="/admin/alumni" style={navLinkStyle}>
              <FaUserCheck size={20} /> Pending Alumni
            </Link>
          </li>
          <li>
            <Link to="/admin/pendingjobs" style={navLinkStyle}>
              <FaBriefcase size={20} /> Pending Job Posts
            </Link>
          </li>
          <li>
            <Link to="/admin/donations" style={navLinkStyle}>
              <FaDonate size={20} /> Donations
            </Link>
          </li>
          <li>
            <Link to="/admin/events" style={navLinkStyle}>
              <FaCalendarPlus size={20} /> Events
            </Link>
          </li>
          <li>
            <Link to="/admin/gallery" style={navLinkStyle}>
              <FaImage size={20} /> Gallery
            </Link>
          </li>
          <li>
            <Link to="/admin/feedbacks" style={navLinkStyle}>
              <FaComments size={20} /> Feedbacks
            </Link>
          </li>
        </ul>
      </nav>
      <div style={contentStyle}>
        <h2 style={sectionTitleStyle}>Add New Images to the Gallery</h2>
        <form onSubmit={handleImageUpload} style={formStyle}>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={fileInputStyle}
            required
          />
          <button type="submit" style={uploadButtonStyle}>
            Upload Image
          </button>
        </form>
        <h2 style={sectionTitleStyle}>Current Images</h2>
        {loading ? (
          <p style={loadingStyle}>Loading...</p>
        ) : (
          <div style={gridStyle}>
            {images.map((image) => (
              <div key={image.id} style={imageContainerStyle}>
                <img
                  src={`data:image/jpeg;base64,${image.imageData}`}
                  alt={image.imageName}
                  style={imageStyle}
                />
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  style={deleteButtonStyle}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        style={modalStyle}
      >
        <h1>Want to logout?</h1>
        <button onClick={confirmLogout} style={modalButtonStyle}>
          Yes
        </button>
        <button onClick={closeModal} style={modalButtonStyle}>
          No
        </button>
      </Modal>
    </div>
  );
};

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#1e1e2f",
  minHeight: "100vh",
  padding: "20px",
  color: "#eee",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#283593",
  color: "#fff",
  borderRadius: "10px",
};

const headerTitleStyle = {
  margin: 0,
};

const searchContainerStyle = {
  position: "relative",
};

const searchInputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  outline: "none",
  width: "200px",
  backgroundColor: "#333",
  color: "#fff",
};

const searchIconStyle = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  color: "#888",
};

const logoutButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#d32f2f",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const logoutIconStyle = {
  marginRight: "5px",
};

const navStyle = {
  backgroundColor: "#333",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "20px",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  display: "flex",
  justifyContent: "space-around",
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
};

const contentStyle = {
  padding: "20px",
  backgroundColor: "#2e2e3f",
  borderRadius: "10px",
  marginTop: "20px",
};

const sectionTitleStyle = {
  color: "#fff",
  marginBottom: "10px",
  textAlign: "center",
};

const loadingStyle = {
  textAlign: "center",
  color: "#fff",
};

const formStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
  gap: "10px",
};

const fileInputStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #444",
  cursor: "pointer",
};

const uploadButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3949ab",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "20px",
};

const imageContainerStyle = {
  position: "relative",
  border: "1px solid #444",
  borderRadius: "10px",
  overflow: "hidden",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
};

const deleteButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#d32f2f",
  border: "none",
  color: "#fff",
  borderRadius: "50%",
  cursor: "pointer",
  padding: "5px",
};

const modalStyle = {
  content: {
    width: "300px",
    height: "150px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
};

const modalButtonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#3949ab",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ManageGallery;
