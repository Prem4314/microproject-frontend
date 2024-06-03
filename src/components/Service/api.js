import axios from "axios";

const API_BASE_URL = "http://localhost:1234";

// Set the default configuration for axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle errors
const handleError = (error) => {
  console.error("API call failed:", error);
  throw error;
};

// Admin API calls
const adminLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/admin/login`, credentials);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const listPendingAlumni = async () => {
  try {
    const response = await axiosInstance.get(`/admin/alumni/pending`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listPendingJobPosts = async () => {
  try {
    const response = await axiosInstance.get(`/admin/jobPost/pending`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listPendingJobRequests = async () => {
  try {
    const response = await axiosInstance.get(`/admin/jobRequest/pending`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const approveAlumni = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/alumni/approve/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const denyAlumni = async (id, reason) => {
  try {
    const response = await axiosInstance.get(`/admin/alumni/deny/${id}`, {
      params: { reason },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const approveJobPost = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/jobPost/approve/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const denyJobPost = async (id, reason) => {
  try {
    const response = await axiosInstance.get(`/admin/jobPost/deny/${id}`, {
      params: { reason },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const approveJobRequest = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/jobRequest/approve/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const denyJobRequest = async (id, reason) => {
  try {
    const response = await axiosInstance.get(`/admin/jobRequest/deny/${id}`, {
      params: { reason },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const addEvent = async (eventData) => {
  const formData = new FormData();
  formData.append("name", eventData.name);
  formData.append("description", eventData.description);
  formData.append("date", eventData.date);
  formData.append("image", eventData.image);

  try {
    const response = await axiosInstance.post(`/admin/event/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateEvent = async (id, eventData) => {
  const formData = new FormData();
  formData.append("name", eventData.name);
  formData.append("description", eventData.description);
  formData.append("date", eventData.date);
  if (eventData.image) {
    formData.append("image", eventData.image);
  }

  try {
    const response = await axiosInstance.put(
      `/admin/event/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/event/delete/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const addImage = async (formData) => {
  try {
    const response = await axiosInstance.post(`/admin/gallery/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
const deleteImage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/gallery/delete/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listFeedbacks = async () => {
  try {
    const response = await axiosInstance.get(`/admin/feedback/list`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listDonations = async () => {
  try {
    const response = await axiosInstance.get(`/admin/donation/list`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listGalleries = async () => {
  try {
    const response = await axiosInstance.get(`/admin/galleries`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Alumni API calls
const registerAlumni = async (alumniData) => {
  try {
    const response = await axiosInstance.post(`/alumni/register`, alumniData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listAlumni = async () => {
  try {
    const response = await axiosInstance.get(`/alumni/list`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const loginAlumni = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/alumni/login`, credentials);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const postJob = async (jobPostData) => {
  const formData = new FormData();
  Object.keys(jobPostData).forEach((key) =>
    formData.append(key, jobPostData[key])
  );

  try {
    const response = await axiosInstance.post(`/alumni/postjob`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const requestJob = async (jobRequestData) => {
  const formData = new FormData();
  Object.keys(jobRequestData).forEach((key) =>
    formData.append(key, jobRequestData[key])
  );

  try {
    const response = await axiosInstance.post(`/alumni/requestjob`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listEvents = async () => {
  try {
    const response = await axiosInstance.get(`/alumni/events`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listGalleriesForAlumni = async () => {
  try {
    const response = await axiosInstance.get(`/alumni/galleries`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const submitFeedback = async (feedbackData) => {
  try {
    const response = await axiosInstance.post(`/alumni/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listAlumniJobRequests = async (alumniId) => {
  try {
    const response = await axiosInstance.get(`/alumni/jobrequests`, {
      params: { alumniId },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const listJobPosts = async () => {
  try {
    const response = await axiosInstance.get(`/alumni/jobposts`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export {
  adminLogin,
  listPendingAlumni,
  listPendingJobPosts,
  listPendingJobRequests, // New function added here
  approveAlumni,
  denyAlumni,
  approveJobPost,
  denyJobPost,
  approveJobRequest,
  denyJobRequest,
  addEvent,
  updateEvent,
  deleteEvent,
  addImage,
  deleteImage,
  listFeedbacks,
  listDonations,
  listGalleries, // New function added here
  registerAlumni,
  listAlumni,
  loginAlumni,
  postJob,
  requestJob,
  listEvents, // New function added here
  listGalleriesForAlumni, // New function added here
  submitFeedback,
  listAlumniJobRequests,
  listJobPosts,
};
