// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/MainPage/HomePage";
import AdminLogin from "./components/Admin/AdminLogin";
import AlumniLogin from "./components/Alumni/AlumniLogin";
import AlumniRegister from "./components/Alumni/AluminiRegister";
import AlumniDashboard from "./components/Alumni/AlumniDashboard";
import AlumniProfiles from "./components/Alumni/AlumniProfiles";
import Jobs from "./components/Alumni/Jobs";
import PendingAlumni from "./components/Admin/PendingAlumni";
import PendingJobs from "./components/Admin/PendingJobs";
import ManageGallery from "./components/Admin/ManageGallery";
import ManageEvents from "./components/Admin/ManageEvents";
import ManageDonation from "./components/Admin/ManageDonations";
import ViewFeedback from "./components/Admin/ViewFeedbacks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/alumnilogin" element={<AlumniLogin />} />
        <Route path="/register" element={<AlumniRegister />} />
        <Route path="/alumnidashboard" element={<AlumniDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/alumniprofiles" element={<AlumniProfiles />} />
        <Route path="/admin/alumni" element={<PendingAlumni />} />
        <Route path="/admin/pendingjobs" element={<PendingJobs />} />
        <Route path="/admingallery" element={<ManageGallery />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/donations" element={<ManageDonation />} />
        <Route path="/admin/feedbacks" element={<ViewFeedback/>} />
      </Routes>
    </Router>
  );
};

export default App;
