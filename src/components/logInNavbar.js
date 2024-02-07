import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/login_page.css";
import "../styles/signup_page.css";
import "../tailwind.css";
import { useAuth } from "../utils/authContext";
import { setAdmin } from "./global.js";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword0, setShowPassword0] = useState(false);

  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const [profileImage, setProfileImage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [filterQuery, setFilterQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [notis, setNotis] = useState([]);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email: email,
        password: password,
      };
      console.log(user);

      auth.setEmail(user.email);
      setAdmin(email);
      const response = await axios.post("/auth/login", user);
      console.log(response);
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/home");
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      message.error("No response from server");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPassword0 = () => {
    setShowPassword0(!showPassword0);
  };
  const handleSignup = async () => {
    console.log("in signup page");
    if (!email || !password || !confirmPassword) {
      message.error("Fields cannot be left empty");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    const user = {
      email: email,
      password: password,
    };
    try {
      //   dispatch(ShowLoading());
      const response = await axios.post("/auth/signup", user);
      //   dispatch(ShowLoading())
      console.log(response);
      if (response.status === 201) {
        message.success(response.data.message);
        navigate("/");
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      message.error("No response from server");
    }
  };

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };

  const isButtonActive = (path) => {
    return activeButton === path;
  };
  const getSearched = async () => {
    try {
      const response = await axios.post(`/search/mainSearch/${searchQuery}`);
      if (response.status === 200) {
        setJobs(response.data.data);
        onSearch(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserProfile = async () => {
    console.log("INSIDE GETuserprofile");
    try {
      const accessToken = localStorage.getItem("token");
      const userId = jwtDecode(accessToken).userId;

      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await axios.get(`/users/profile/${userId}`, {
        headers,
      });

      if (response.status === 200) {
        setProfileImage(response.data.data.profile);
        setEmail(response.data.data.email);
        console.log(response.data);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const getNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      console.log("In getNoti");
      const response = await axios.get("/users/getNoti", {
        headers,
      });
      if (response.status === 200) {
        setNotis(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const clearNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      console.log("In getNoti");
      const response = await axios.post("/users/clearNoti", null, {
        headers,
      });
      if (response.status === 200) {
        console.log(response.data.message);
        getNotifications();
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const deleteAccount = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        // If the access token is not available, handle the authentication error
        console.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const response = await axios.post(
        `/users/profile/`,
        { password },
        {
          headers,
        }
      );
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/signup");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        message.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const pws = {
        currentPassword: password,
        newPassword: newPassword,
        reenterNewPassword: confirmPassword,
      };
      const response = await axios.post("/auth/changePassword", pws, {
        headers,
      });
      console.log(response.data);
      if (response.data.success) {
        message.success(response.data.message);
        logOut();
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const changeEmail = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        message.error("User not authenticated.");
        return;
      }
      const headers = {
        Authorization: `${accessToken}`,
      };
      const emails = {
        email: newEmail,
        confirmEmail: confirmEmail,
      };
      const response = await axios.post("/users/changeEmail", emails, {
        headers,
      });
      if (response.data.success) {
        logOut();

        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Function to render notifications
  const renderNotifications = () => {
    if (notis.length === 0) {
      return (
        <li>
          <a>Empty</a>
        </li>
      );
    } else {
      return notis.map((notification, index) => (
        <li key={index}>
          <a>{notification}</a>
        </li>
      ));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    getUserProfile();
    getNotifications();
  }, []);

  const openLogin = async (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const openSignup = async (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  return (
    <div>
      <div className={`navbar bg-white ${menuOpen ? "menu-open" : ""}`}>
        <div className="navbar-start"></div>
        <div class="navbar-center">
          <div class="text-3xl font-bold">The Job Finder</div>
        </div>
        <div class="navbar-end">
          <div className="flex flex-row items-start justify-start gap-[22px]">
            <Link onClick={() => window.loginPage.showModal()}>Login</Link>
            <Link onClick={() => window.signupPage.showModal()}>
              {/* <div className="relative font-medium" onClick={openSignup}> */}
              Signup
              {/* </div> */}
            </Link>
          </div>
        </div>
        <dialog id="signupPage" className="modal">
          <div className="signup-page modal-box bg-white">
            <div class="text-4xl font-bold">Hi!</div>
            <div class="text-4xl font-bold">Welcome to The Job Finder</div>
            <hr class="gap"></hr>
            <h4 className="text-4xl font-bold">Sign Up</h4>
            <hr class="gap"></hr>

            <div className="signup-form">
              <input
                type="text"
                placeholder="Email"
                class="input-primary input-bordered w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div class="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  class="input-primary input-bordered w-full password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  data-testId="togglePass"
                  className={`password-toggle-button ${
                    showPassword ? "visible" : ""
                  }`}
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <div class="password-input-container">
                <input
                  type={showPassword0 ? "text" : "password"}
                  placeholder="Confirm Password"
                  class="input-primary input-bordered w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
                <button
                  data-testId="togglePass0"
                  className={`password-toggle-button ${
                    showPassword0 ? "visible" : ""
                  }`}
                  onClick={toggleShowPassword0}
                >
                  <FontAwesomeIcon icon={showPassword0 ? faEyeSlash : faEye} />
                </button>
              </div>

              <button
                class="btn btn-primary h-10 w-60 rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>

            <div class=" divider-vertical">OR</div>

            {/* {getIcons()} */}
            <p className="signup-login-link">
              Already have an account?{" "}
              <Link onClick={() => window.loginPage.showModal()}>
                <a href="/login">Log In</a>
              </Link>
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="loginPage" className="modal">
          <div className="login-page dir=rtl modal-box bg-white">
            <div className="text-4xl font-bold">Hi!</div>

            <div className="text-4xl font">Welcome Back</div>
            <hr className="gap"></hr>
            <h4 className="text-4xl font-bold">Log In</h4>
            <hr className="gap"></hr>

            <div className="login-form">
              <input
                type="text"
                placeholder="Email"
                className="input-primary input-bordered w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input-primary input-bordered w-full password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  className={`password-toggle-button ${
                    showPassword ? "visible" : ""
                  }`}
                  onClick={toggleShowPassword}
                  data-testid="password-toggle-button"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <p className="signup-login-link">
                Forgot your password?{" "}
                <Link>
                  <a href="/signup">Reset</a>
                </Link>
              </p>
              <div className="label">
                <p className="forget-your-password">
                  <span className="text-wrapper"> </span>

                  <span className="span"></span>
                </p>
              </div>
              <button
                className="btn btn-primary h-10 w-60 rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </div>
            <div className=" divider-vertical">OR</div>

            {/* {getIcons()} */}

            <p className="signup-login-link">
              Don't have an account?{" "}
              <Link onClick={() => window.signupPage.showModal()}>
                <a href="/signup">Sign Up</a>
              </Link>
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div class="spacer"></div>
    </div>
  );
};

export default Navbar;
