import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login_page.css";
import { useAuth } from "../utils/authContext";
import { setAdmin } from "./global.js";

const TestPage = () => {
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
  // const dispatch = useDispatch()
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
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        message.error(response.data.error);
      }
    } catch (error) {
      message.error("No response from server");
    }
  };
  return (
    <div
      style={{
        height: "10px",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 40,
          display: "inline-flex",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            display: "flex",
          }}
        >
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
          <div
            style={{
              color: "rgba(0, 0, 0, 0.70)",
              fontSize: 15,
              fontFamily: "Poppins",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you.
          </div>
        </div>
        <div
          style={{
            width: 929,
            boxShadow: "2px 2px 22px rgba(0, 0, 0, 0.12)",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 50,
              padding: 18,
              background: "white",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              overflow: "hidden",
              border: "1px rgba(20, 20, 20, 0.10) solid",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
              display: "flex",
            }}
          >
            <div style={{ width: 24, position: "relative" }}>
              <div
                style={{
                  width: 17.25,
                  height: 17.25,
                  left: 2.25,
                  top: 2.25,
                  position: "absolute",
                  background: "rgba(20, 20, 20, 0.50)",
                }}
              ></div>
              <div
                style={{
                  width: 6.06,
                  left: 15.69,
                  top: 15.69,
                  position: "absolute",
                  background: "rgba(20, 20, 20, 0.50)",
                }}
              ></div>
            </div>
            <div
              style={{
                width: 67,
                height: 27,
                color: "rgba(20, 20, 20, 0.50)",
                fontSize: 16,
                fontFamily: "Poppins",
                fontWeight: "400",
                lineHeight: 3.84,
                wordWrap: "break-word",
              }}
            >
              Job Title
            </div>
          </div>
          <div
            style={{
              width: 420,
              height: 50,
              padding: 18,
              background: "white",
              border: "1px rgba(20, 20, 20, 0.10) solid",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
              display: "flex",
            }}
          >
            <div style={{ width: 24, height: 24, position: "relative" }}>
              <div
                style={{
                  width: 15,
                  height: 1.5,
                  left: 4.5,
                  top: 21,
                  position: "absolute",
                  background: "rgba(20, 20, 20, 0.50)",
                }}
              ></div>
              <div
                style={{
                  width: 7.5,
                  height: 7.5,
                  left: 8.25,
                  top: 6,
                  position: "absolute",
                  background: "rgba(20, 20, 20, 0.50)",
                }}
              ></div>
              <div
                style={{
                  width: 16.5,
                  height: 21,
                  left: 3.75,
                  top: 1.5,
                  position: "absolute",
                  background: "rgba(20, 20, 20, 0.50)",
                }}
              ></div>
            </div>
            <div
              style={{
                width: 68,
                height: 41,
                color: "rgba(20, 20, 20, 0.50)",
                fontSize: 16,
                fontFamily: "Poppins",
                fontWeight: "400",
                lineHeight: 3.84,
                wordWrap: "break-word",
              }}
            >
              Location
            </div>
          </div>
          <div
            style={{
              width: 186,
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 18,
              paddingBottom: 18,
              background: "#0C9AAC",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Noto Sans",
                fontWeight: "500",
                lineHeight: 24,
                wordWrap: "break-word",
              }}
            >
              Apply for Jobs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
