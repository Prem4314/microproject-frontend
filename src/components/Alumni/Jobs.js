import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Modal,
  Form,
  Table,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import {
  FaHome,
  FaBriefcase,
  FaEnvelope,
  FaUniversity,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  listJobPosts,
  listAlumniJobRequests,
  postJob,
  requestJob,
} from "../Service/api";
import Swal from "sweetalert2";

const Jobs = () => {
  const [alumni, setAlumni] = useState({});
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showRequestJobModal, setShowRequestJobModal] = useState(false);
  const [jobPosts, setJobPosts] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);
  const [postJobData, setPostJobData] = useState({
    companyName: "",
    jobDescription: "",
    contactDetails: "",
    referralId: "",
    location: "",
    jobType: "",
  });
  const [requestJobData, setRequestJobData] = useState({
    name: "",
    qualifications: "",
    completedYear: "",
    contactDetails: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });
  const [postJobSubmitted, setPostJobSubmitted] = useState(false);
  const [requestJobSubmitted, setRequestJobSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alumniData = sessionStorage.getItem("alumniData");
    if (alumniData) {
      try {
        const parsedData = JSON.parse(alumniData);
        setAlumni(parsedData);
        setPostJobData((prevState) => ({
          ...prevState,
          alumniId: parsedData.id,
        }));
        setRequestJobData((prevState) => ({
          ...prevState,
          alumniId: parsedData.id,
        }));
      } catch (error) {
        console.error("Failed to parse alumni data from sessionStorage", error);
      }
    }

    listJobPosts()
      .then((response) => {
        setJobPosts(response);
      })
      .catch((error) => {
        console.error("Failed to fetch job posts", error);
      });

    if (alumni && alumni.id) {
      listAlumniJobRequests(alumni.id)
        .then((response) => {
          setJobRequests(response);
        })
        .catch((error) => {
          console.error("Failed to fetch job requests", error);
        });
    }
  }, [alumni.id]);

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    setPostJobSubmitted(true);
    const {
      companyName,
      jobDescription,
      contactDetails,
      referralId,
      location,
      jobType,
    } = postJobData;
    if (
      !companyName ||
      !jobDescription ||
      !contactDetails ||
      !referralId ||
      !location ||
      !jobType
    ) {
      setAlert({
        show: true,
        message: "Please fill in all the fields.",
        variant: "danger",
      });
      return;
    }

    postJob(postJobData)
      .then(() => {
        setShowPostJobModal(false);
        setPostJobData({
          companyName: "",
          jobDescription: "",
          contactDetails: "",
          referralId: "",
          location: "",
          jobType: "",
          alumniId: alumni.id,
        });
        setPostJobSubmitted(false);
        setAlert({
          show: true,
          message:
            "Job Posted successfully. Your job is posted after admin approval.",
          variant: "success",
        });
        return listJobPosts();
      })
      .then((response) => {
        setJobPosts(response);
      })
      .catch((error) => {
        console.error("Failed to post job", error);
        setAlert({
          show: true,
          message: "Failed to post job.",
          variant: "danger",
        });
      });
  };

  const handleJobRequestSubmit = (e) => {
    e.preventDefault();
    setRequestJobSubmitted(true);
    const { name, qualifications, completedYear, contactDetails } =
      requestJobData;
    if (!name || !qualifications || !completedYear || !contactDetails) {
      setAlert({
        show: true,
        message: "Please fill in all the fields.",
        variant: "danger",
      });
      return;
    }

    requestJob(requestJobData)
      .then(() => {
        setShowRequestJobModal(false);
        setRequestJobData({
          name: "",
          qualifications: "",
          completedYear: "",
          contactDetails: "",
          alumniId: alumni.id,
        });
        setRequestJobSubmitted(false);
        setAlert({
          show: true,
          message:
            "Job request submitted successfully. Your response will be sent to the admin for approval.",
          variant: "success",
        });
        return listAlumniJobRequests(alumni.id);
      })
      .then((response) => {
        setJobRequests(response);
      })
      .catch((error) => {
        console.error("Failed to request job", error);
        setAlert({
          show: true,
          message: "Failed to request job.",
          variant: "danger",
        });
      });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("alumniData");
    navigate("/");
  };

  const renderJobPosts = () => {
    return (jobPosts || []).map((job, index) => (
      <Col key={index} md={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>{job.companyName}</Card.Title>
            <Card.Text>{job.jobDescription}</Card.Text>
            <Card.Text>
              <strong>Contact:</strong> {job.contactDetails}
            </Card.Text>
            <Card.Text>
              <strong>Referral ID:</strong> {job.referralId}
            </Card.Text>
            <Card.Text>
              <strong>Location:</strong> {job.location}
            </Card.Text>
            <Card.Text>
              <strong>Job Type:</strong> {job.jobType}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const renderJobRequests = () => {
    return (jobRequests || []).map((request, index) => (
      <tr key={index}>
        <td>{request.name}</td>
        <td>{request.qualifications}</td>
        <td>{request.completedYear}</td>
        <td>{request.contactDetails}</td>
      </tr>
    ));
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
            <Nav.Link as={Link} to="/alumnidashboard">
              <FaHome style={{ fontSize: "1.5rem" }} /> Home
            </Nav.Link>
            <Nav.Link onClick={() => setShowPostJobModal(true)}>
              <FaBriefcase style={{ fontSize: "1.5rem" }} /> Post a Job
            </Nav.Link>
            <Nav.Link onClick={() => setShowRequestJobModal(true)}>
              <FaEnvelope style={{ fontSize: "1.5rem" }} /> Job Request
            </Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="outline-light"
              onClick={handleLogout}
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
      <Container>
        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
        <div className="text-center mb-4">
          <h2
            className="font-weight-bold"
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "2rem", // Reduced the font size here
              color: "#f8f9fa",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            Welcome to the Alumni Job Portal
          </h2>
          <h4>
            Here you can post job opportunities and request jobs from our alumni
            network. Sharing job opportunities within our network can provide
            numerous benefits, such as:
          </h4>
        </div>
        <ul style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
          <li>Helping fellow alumni find suitable employment</li>
          <li>Building a stronger alumni network</li>
          <li>
            Increasing the visibility of your company within the alumni
            community
          </li>
        </ul>
        <h3
          className="text-center mb-4 font-weight-bold"
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "2rem",
            color: "#f8f9fa",
            textShadow: "1px 1px 2px #000000",
          }}
        >
          Job Openings from our Alumni
        </h3>
        <Row>{renderJobPosts()}</Row>
        <h2 className="my-4">Job Requests</h2>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qualifications</th>
              <th>Completed Year</th>
              <th>Contact Details</th>
            </tr>
          </thead>
          <tbody>{renderJobRequests()}</tbody>
        </Table>
        {/* Post Job Modal */}
        <Modal
          show={showPostJobModal}
          onHide={() => setShowPostJobModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Post a Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePostJobSubmit}>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={postJobData.companyName}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      companyName: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.companyName}
                />
              </Form.Group>
              <Form.Group controlId="formJobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={postJobData.jobDescription}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      jobDescription: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.jobDescription}
                />
              </Form.Group>
              <Form.Group controlId="formContactDetails">
                <Form.Label>Contact Details</Form.Label>
                <Form.Control
                  type="text"
                  value={postJobData.contactDetails}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      contactDetails: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.contactDetails}
                />
              </Form.Group>
              <Form.Group controlId="formReferralId">
                <Form.Label>Referral ID</Form.Label>
                <Form.Control
                  type="text"
                  value={postJobData.referralId}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      referralId: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.referralId}
                />
              </Form.Group>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={postJobData.location}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      location: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.location}
                />
              </Form.Group>
              <Form.Group controlId="formJobType">
                <Form.Label>Job Type</Form.Label>
                <Form.Control
                  type="text"
                  value={postJobData.jobType}
                  onChange={(e) =>
                    setPostJobData({
                      ...postJobData,
                      jobType: e.target.value,
                    })
                  }
                  isInvalid={postJobSubmitted && !postJobData.jobType}
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowPostJobModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Request Job Modal */}
        <Modal
          show={showRequestJobModal}
          onHide={() => setShowRequestJobModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Request a Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleJobRequestSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={requestJobData.name}
                  onChange={(e) =>
                    setRequestJobData({
                      ...requestJobData,
                      name: e.target.value,
                    })
                  }
                  isInvalid={requestJobSubmitted && !requestJobData.name}
                />
              </Form.Group>
              <Form.Group controlId="formQualifications">
                <Form.Label>Qualifications</Form.Label>
                <Form.Control
                  type="text"
                  value={requestJobData.qualifications}
                  onChange={(e) =>
                    setRequestJobData({
                      ...requestJobData,
                      qualifications: e.target.value,
                    })
                  }
                  isInvalid={
                    requestJobSubmitted && !requestJobData.qualifications
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCompletedYear">
                <Form.Label>Completed Year</Form.Label>
                <Form.Control
                  type="text"
                  value={requestJobData.completedYear}
                  onChange={(e) =>
                    setRequestJobData({
                      ...requestJobData,
                      completedYear: e.target.value,
                    })
                  }
                  isInvalid={
                    requestJobSubmitted && !requestJobData.completedYear
                  }
                />
              </Form.Group>
              <Form.Group controlId="formContactDetails">
                <Form.Label>Contact Details</Form.Label>
                <Form.Control
                  type="text"
                  value={requestJobData.contactDetails}
                  onChange={(e) =>
                    setRequestJobData({
                      ...requestJobData,
                      contactDetails: e.target.value,
                    })
                  }
                  isInvalid={
                    requestJobSubmitted && !requestJobData.contactDetails
                  }
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowRequestJobModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Container>
    </Container>
  );
};

export default Jobs;
