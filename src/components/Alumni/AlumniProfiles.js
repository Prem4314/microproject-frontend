import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaSearch,
  FaUniversity,
  FaDonate,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:1234";

const AlumniProfiles = () => {
  const [alumniProfiles, setAlumniProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/alumni/list`)
      .then((response) => {
        setAlumniProfiles(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch alumni profiles", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAlumni = alumniProfiles.filter((alumni) =>
    Object.values(alumni)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    sessionStorage.removeItem("alumniData");
    window.location.href = "/";
  };

  return (
    <Container
      fluid
      style={{
        padding: "0",
        backgroundColor: "#212529",
        color: "#fff",
        fontFamily: "'Roboto', sans-serif",
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
          Alumni Club Association
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" onClick={() => navigate("/alumniprofiles")}>
              <FaUser style={{ fontSize: "1.5rem" }} /> Alumni Profiles
            </Nav.Link>
            <Nav.Link href="#" onClick={() => navigate("/jobs")}>
              <FaBriefcase style={{ fontSize: "1.5rem" }} /> Jobs
            </Nav.Link>
            <Nav.Link href="/alumnidashboard" onClick={() => navigate("/donate")}>
              <FaDonate style={{ fontSize: "1.5rem" }} /> Donate
            </Nav.Link>
            <Nav.Link href="/alumnidashboard" onClick={() => navigate("/feedback")}>
              <FaComments style={{ fontSize: "1.5rem" }} /> Feedback
            </Nav.Link>
            <Nav.Link href="/alumnidashboard" onClick={() => navigate("/contact")}>
              <FaEnvelope style={{ fontSize: "1.5rem" }} /> Contact Us
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
              <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container
        fluid
        style={{
          padding: "20px",
          backgroundColor: "#343a40",
          fontFamily: "Arial, sans-serif",
          borderRadius: "15px",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ fontSize: "2rem", color: "#fff" }}
        >
          Alumni Profiles
        </h2>
        <p
          className="text-center"
          style={{ fontSize: "1.2rem", color: "#ddd" }}
        >
          The below are the stay connected Alumni
        </p>
        <InputGroup
          className="mb-3"
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search Alumni"
            value={searchTerm}
            onChange={handleSearch}
            style={{ fontSize: "0.9rem" }}
          />
        </InputGroup>
        <Table
          bordered
          hover
          responsive
          style={{
            backgroundColor: "#212529",
            color: "#fff",
            borderRadius: "15px",
          }}
        >
          <thead style={{ backgroundColor: "#343a40", color: "#fff" }}>
            <tr>
              <th>
                <FaUser /> Name
              </th>
              <th>
                <FaUser /> Age
              </th>
              <th>
                <FaUser /> Gender
              </th>
              <th>
                <FaGraduationCap /> Department
              </th>
              <th>
                <FaGraduationCap /> Graduation Year
              </th>
              <th>
                <FaBriefcase /> Current Employment
              </th>
              <th>
                <FaMapMarkerAlt /> Address
              </th>
              <th>
                <FaEnvelope /> Email
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumni.map((alumni) => (
              <tr key={alumni.id}>
                <td>{alumni.name}</td>
                <td>{alumni.age}</td>
                <td>{alumni.gender}</td>
                <td>{alumni.department}</td>
                <td>{alumni.graduationYear}</td>
                <td>{alumni.currentEmployment}</td>
                <td>{alumni.address}</td>
                <td>{alumni.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => navigate("/alumnidashboard")}
          >
            Go Back
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default AlumniProfiles;
