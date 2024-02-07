import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login_page.css";
import { useAuth } from "../utils/authContext";
import { setAdmin } from "./global.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email: email,
        password: password,
      };

      auth.setEmail(user.email);
      setAdmin(email);
      const response = await axios.post("/auth/login", user);

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      message.error("No response from the server");
    }
  };

  return (
    <div className="login-page dir=rtl">
      <dialog id="loginPage" className="modal">
        <div className="login-page dir=rtl modal-box bg-white">
          <div className="text-4xl font-bold">Hi!</div>

          <div className="text-4xl font fg-black">Welcome Back</div>
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
              />
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
              Forgot your password? <Link to="/reset-password">Reset</Link>
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
          <div className="divider-vertical">OR</div>

          {/* {getIcons()} */}

          <p className="signup-login-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default LoginPage;
