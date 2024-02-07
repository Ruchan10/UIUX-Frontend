import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { React, useEffect, useState } from "react";
import "../styles/application.css";
import "../tailwind.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { GetCreatedJobs } from "./services/GetAllJobs";

const ApplicationPage = () => {
  const [activeTab, setActiveTab] = useState("applied");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [resolvedApplicants, setResolvedApplicants] = useState([]);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [logoUrl, setLogoUrl] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const fetchJobs = async () => {
    console.log("fetchJobs");
    try {
      const response = await axios.get("/jobs");

      if (response.data.success) {
        setJobs(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAppliedJobs = async () => {
    try {
      // Get the access token from your authentication system
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        console.error("User not authenticated.");
        return;
      }

      // Set the Authorization header with the access token
      const headers = {
        Authorization: `${accessToken}`,
      };

      const response = await axios.get("/jobs/getAppliedJobs", { headers });
      if (response.data.success) {
        setAppliedJobs(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the delete job application action
  const handleDeleteJobApplication = async (jobId) => {};

  const getCreatedJobs = async () => {
    try {
      // Get the access token from your authentication system
      const accessToken = localStorage.getItem("token"); // You might need to adjust this based on how you store the access token
      const userId = jwtDecode(accessToken).userId;
      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }

      // Set the Authorization header with the access token
      const headers = {
        Authorization: `${accessToken}`,
      };

      const response = await axios.get(`/jobs/user/${userId}`, { headers });
      // Save the URL of the uploaded logo in the state
      setLogoUrl(response.data.data[0].logo);
      if (response.data.success) {
        setCreatedJobs(response.data.data);
        setApplicants(response.data.data.appliedBy);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAppliedJobs();
    fetchJobs();
  }, []);
  return (
    <div>
      <Navbar />
      <GetCreatedJobs
        createdJobsData={createdJobs}
        getCreatedJobs={getCreatedJobs}
        getJobs={fetchJobs}
      />

      <Footer />
    </div>
  );
};

export default ApplicationPage;
