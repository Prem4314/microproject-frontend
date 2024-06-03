import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Carousel,
  Offcanvas,
} from "react-bootstrap";
import {
  FaDonate,
  FaSignOutAlt,
  FaUser,
  FaBriefcase,
  FaComments,
  FaEnvelope,
  FaUniversity,
} from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:1234";

const AlumniDashboard = () => {
  const [alumni, setAlumni] = useState({});
  const [events, setEvents] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [donation, setDonation] = useState({
    amount: "",
    paymentId: "",
    reason: "",
    proof: null,
  });
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [showAlumniProfilesModal, setShowAlumniProfilesModal] = useState(false);
  const [alumniProfiles, setAlumniProfiles] = useState([]);

  const donationSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const alumniData = sessionStorage.getItem("alumniData");

    if (alumniData) {
      try {
        const parsedData = JSON.parse(alumniData);
        setAlumni(parsedData);
      } catch (error) {
        console.error("Failed to parse alumni data from sessionStorage", error);
      }
    }

    axios
      .get(`${API_BASE_URL}/alumni/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch events", error);
      });

    axios
      .get(`${API_BASE_URL}/alumni/galleries`)
      .then((response) => {
        setGalleryImages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch gallery images", error);
      });

    axios
      .get(`${API_BASE_URL}/alumni/list`)
      .then((response) => {
        setAlumniProfiles(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch alumni profiles", error);
      });
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);

    if (!feedback) {
      return;
    }

    axios
      .post(`${API_BASE_URL}/alumni/feedback`, {
        message: feedback,
        alumniId: alumni.id,
      })
      .then(() => {
        setShowFeedbackModal(false);
        setFeedback("");
        setFeedbackSubmitted(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Feedback submitted successfully.",
        });
      })
      .catch((error) => {
        console.error("Failed to submit feedback", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit feedback.",
        });
      });
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setDonationSubmitted(true);

    if (
      !donation.amount ||
      !donation.paymentId ||
      !donation.reason ||
      !donation.proof
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("amount", donation.amount);
    formData.append("paymentId", donation.paymentId);
    formData.append("reason", donation.reason);
    formData.append("proof", donation.proof);
    formData.append("alumniId", alumni.id);

    axios
      .post(`${API_BASE_URL}/alumni/donate`, formData)
      .then(() => {
        setShowDonationModal(false);
        setDonation({
          amount: "",
          paymentId: "",
          reason: "",
          proof: null,
        });
        setDonationSubmitted(false);
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Donation made successfully.",
        });
      })
      .catch((error) => {
        console.error("Failed to submit donation", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit donation.",
        });
      });
  };

  const scrollToDonationSection = () => {
    window.scrollTo({
      top: donationSectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const scrollToContactSection = () => {
    window.scrollTo({
      top: contactSectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("alumniData");
    window.location.href = "/";
  };

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetailsModal(true);
  };

  const handleViewAlumniProfiles = () => {
    navigate("/alumniprofiles");
  };

  const navigateToJobs = () => {
    navigate("/jobs");
  };

  const getProfileInitials = (name) => {
    if (!name) return "U";
    const nameArray = name.split(" ");
    if (nameArray.length < 2) return nameArray[0].charAt(0).toUpperCase();
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[1].charAt(0).toUpperCase()
    );
  };

  return (
    <Container
      fluid
      style={{
        fontFamily: "'Roboto', sans-serif",
        padding: "0",
        backgroundColor: "#212529",
        color: "#fff",
      }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="mb-4"
        style={{ fontSize: "1.5rem" }}
      >
        <Navbar.Brand href="#">
          <FaUniversity style={{ marginRight: "10px" }} />
          Alumni Tracking System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" onClick={handleViewAlumniProfiles}>
              <FaUser style={{ fontSize: "1.5rem" }} />
              Alumni Details
            </Nav.Link>
            <Nav.Link href="#" onClick={navigateToJobs}>
              <FaBriefcase style={{ fontSize: "1.5rem" }} /> Jobs
            </Nav.Link>
            <Nav.Link href="#" onClick={scrollToDonationSection}>
              <FaDonate style={{ fontSize: "1.5rem" }} /> Donate
            </Nav.Link>
            <Nav.Link href="#" onClick={() => setShowFeedbackModal(true)}>
              <FaComments style={{ fontSize: "1.5rem" }} /> Feedback
            </Nav.Link>
            <Nav.Link href="#" onClick={scrollToContactSection}>
              <FaEnvelope style={{ fontSize: "1.5rem" }} /> Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="outline-light"
              onClick={() => setShowProfileDrawer(true)}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#17a2b8",
                color: "#000",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2em",
                }}
              >
                {getProfileInitials(alumni.name)}
              </div>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="text-center mb-4">
        <h6
          className="font-weight-bold"
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "2rem",
            color: "#f8f9fa",
          }}
        >
          Welcome to the Alumni Club
        </h6>
        <h5>
          Good initiative to join in this Alumni Club. Together, we can make a
          difference!
        </h5>
      </div>

      <Carousel
        className="mb-4"
        interval={3000}
        style={{ maxWidth: "80%", margin: "0 auto", overflow: "hidden" }}
      >
        {galleryImages.map((image) => (
          <Carousel.Item key={image.id}>
            <img
              src={`data:image/jpeg;base64,${image.imageData}`}
              alt={image.imageName}
              className="d-block w-100"
              style={{ objectFit: "cover", height: "500px" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          color: "#f8f9fa",
          fontFamily: "'Times New Roman', serif",
        }}
      />
       <div style={{ textAlign: "center", padding: "20px" }}>
  <h1
    style={{
      fontWeight: "bold",
      fontSize: "2.5rem",
      marginBottom: "1rem",
      textShadow: "2px 2px 4px #000000",
    }}
  >
    College Achievements
  </h1>
  <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
    We are delighted to announce that our College has recently achieved an A+
    score in the National Assessment and Accreditation Council (NAAC)
    evaluation. This recognition underscores our steadfast commitment to
    academic excellence and highlights the dedication of our esteemed faculty
    and the diligence of our students.
  </p>
</div>

      <h3
        className="text-center mb-4 font-weight-bold"
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: "2rem",
          color: "#f8f9fa",
          textShadow: "1px 1px 2px #000000",
        }}
      >
        Upcoming Events
      </h3>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
        Alumni events provide a platform for alumni to reconnect, network, and
        build relationships with each other and with the institution. These
        connections can lead to collaborations, mentorship opportunities, and
        even business partnerships.
      </p>
      <Row>
        {events.map((event) => (
          <Col md={4} key={event.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${event.imageData}`}
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>
                  <i>"Join us for an unforgettable experience!"</i>
                </Card.Text>
                <Button
                  variant="info"
                  onClick={() => handleViewEventDetails(event)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group>
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                isInvalid={feedbackSubmitted && !feedback}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your feedback.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDonationModal}
        onHide={() => setShowDonationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make a Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDonationSubmit}>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={donation.amount}
                onChange={(e) =>
                  setDonation({ ...donation, amount: e.target.value })
                }
                isInvalid={donationSubmitted && !donation.amount}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid amount.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment ID</Form.Label>
              <Form.Control
                type="text"
                value={donation.paymentId}
                onChange={(e) =>
                  setDonation({ ...donation, paymentId: e.target.value })
                }
                isInvalid={donationSubmitted && !donation.paymentId}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid payment ID.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                value={donation.reason}
                onChange={(e) =>
                  setDonation({ ...donation, reason: e.target.value })
                }
                isInvalid={donationSubmitted && !donation.reason}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a reason for donation.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Proof of Payment</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setDonation({ ...donation, proof: e.target.files[0] })
                }
                isInvalid={donationSubmitted && !donation.proof}
              />
              <Form.Control.Feedback type="invalid">
                Please upload proof of payment.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEventDetailsModal}
        onHide={() => setShowEventDetailsModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        {selectedEvent && (
          <Modal.Body>
            <h5>{selectedEvent.name}</h5>
            <p>{selectedEvent.description}</p>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <img
              src={`data:image/jpeg;base64,${selectedEvent.imageData}`}
              alt={selectedEvent.imageName}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Modal.Body>
        )}
      </Modal>

      <section
        ref={donationSectionRef}
        id="donation-section"
        className="mt-5 p-5"
        style={{ backgroundColor: "#343a40" }}
      >
        <h2 className="text-center">Make a Donation</h2>
        <p className="text-center">
          Your generous contributions help us grow and support various
          initiatives. Please attach the Proof of Payment.
        </p>
        <div className="text-center">
          <Button variant="success" onClick={() => setShowDonationModal(true)}>
            <FaDonate /> Donate Now
          </Button>
        </div>
        <div className="mt-4 text-center">
          <h5>Bank Details for Donation</h5>
          <Row>
            <Col md={15}>
              <Card className="p-3 bg-dark text-white">
                <p>
                  <strong>Bank Name:</strong> ABC Bank
                </p>
                <p>
                  <strong>Account Number:</strong> 123456789
                </p>
                <p>
                  <strong>IFSC Code:</strong> ABCD0123456
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <footer
        ref={contactSectionRef}
        className="text-center mt-4 p-4"
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        <p>&copy; 2024 Alumni Club Association. All rights reserved.</p>
        <p>Your College, 123 Main Street, City, Country</p>
        <p>Email: info@yourcollege.edu | Phone: +123 456 7890</p>
      </footer>

      <Offcanvas
        show={showProfileDrawer}
        onHide={() => setShowProfileDrawer(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center">
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#007bff",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2em",
                color: "#fff",
              }}
            >
              {getProfileInitials(alumni.name)}
            </div>
          </div>
          <h4 className="text-center mt-3">{alumni.name}</h4>
          <p className="text-center">{alumni.email}</p>
          <Button
            variant="outline-danger"
            className="w-100 mt-3"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default AlumniDashboard;
