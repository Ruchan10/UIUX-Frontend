import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import "../styles/home_page.css";
import "../tailwind.css";
import Footer from "./Footer";
import Navbar from "./logInNavbar";
import { GetAllJobs } from "./services/GetAllJobs";

const GuestHome = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [jobTime, setJobTime] = useState("Job Time");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  const handleJobTime = (option) => {
    setJobTime(option);
  };
  const fetchJobs = async () => {
    console.log("fetchJobs");
    const token = localStorage.getItem("accessToken");
    setIsUserLoggedIn(!!token);
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
  const getFilters = async () => {
    try {
      const formData = new FormData();
      formData.append("c", companyName);
      formData.append("j", jobTitle);
      formData.append("l", filterLocation);
      formData.append("jo", jobTime);
      const response = await axios.post("/search/filters", formData);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setJobs(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  //   fetchJobs();

  useEffect(() => {
    fetchJobs();
  }, []);
  const handleSearch = (searchResults) => {
    setJobs(searchResults);
  };
  return (
    <div class="bg-white">
      <Navbar onSearch={handleSearch} />

      <div class="spacer bg-white"></div>
      <div class="bg-white">
        <div className={`flexible-button ${isExpanded ? "expanded" : ""}`}>
          {/* <button class="btn btn-outline filter-btn" onClick={handleClick}>
            <BsFilter />
            Filter
          </button> */}
          {isExpanded && (
            <div class="btn-group btn-group-vertical lg:btn-group-horizontal filter-group-btn">
              <input
                type="text"
                placeholder="Company Name"
                class="filter-group-btn"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Job Title"
                class="input filter-group-btn"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <input
                data-testid="inHome"
                type="text"
                placeholder="Location"
                class="input filter-group-btn"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
              <div class="input-group filter-group-btn">
                <select class="select">
                  <option disabled selected>
                    Pick category
                  </option>
                  <option onClick={() => handleJobTime("Part Time")}>
                    Part Time
                  </option>
                  <option onClick={() => handleJobTime("Part Time")}>
                    Full Time
                  </option>
                </select>
              </div>
              <button
                class="btn btn-square filter-search-btn"
                onClick={getFilters}
              >
                <BsSearch
                  style={{
                    fontSize: "24px",
                    background: "none",
                    border: "none",
                  }}
                />
              </button>
            </div>
          )}
        </div>
        <div>
          <span
            style={{
              color: "#141414",
              fontSize: 40,
              fontFamily: "Noto Sans",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Find your{" "}
          </span>
          <span
            style={{
              color: "#0C9AAC",
              fontSize: 40,
              fontFamily: "Noto Sans",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            new job
          </span>
          <span
            style={{
              color: "#141414",
              fontSize: 40,
              fontFamily: "Noto Sans",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            {" "}
            today
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Job"
            class="input-bordered w-24 md:w-auto"
            //   value={searchQuery}
            //   onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            class="input-bordered w-24 md:w-auto"
            //   value={searchQuery}
            //   onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button data-testid="searchBtn" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <GetAllJobs jobsData={jobs} getJobs={fetchJobs} loggedIn={isUserLoggedIn} />
      </div>
      <Footer />
    </div>
  );
};

export default GuestHome;
