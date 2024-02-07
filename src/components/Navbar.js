import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { message } from "antd";
import axios from "axios";
import { React, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoDocumentsOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "../tailwind.css";
import { isAdmin } from "./global.js";
import { GetAllUsers } from "./services/GetUserData";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [filterQuery, setFilterQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [notis, setNotis] = useState([]);

  const handleButtonClick = (path) => {
    setActiveButton(path);
  };
  const logOut = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div class="bg-white">
      <div className={`navbar bg-white ${menuOpen ? "menu-open" : ""}`}>
        <div className="navbar-start">
          <div className="menu-dropdown" onClick={toggleMenu}>
            <div className="dropdown-icon"></div>
            {menuOpen && (
              <div className="dropdown-content">
                <Link to="/home" onClick={() => handleButtonClick("/home")}>
                  Home
                </Link>
              </div>
            )}
          </div>
          <div
            className={`tabs-boxed bg-white ${
              menuOpen ? "menu-open" : "menu-closed"
            }`}
          >
            <Link to="/home">
              <div
                className={`tab ${isButtonActive("/home") ? "tab-active" : ""}`}
                onClick={() => handleButtonClick("/home")}
              >
                <AiOutlineHome className="tab-icon" />
                <span>Home</span>
              </div>
            </Link>
            <Link to="/bookmark">
              <div
                className={`tab ${
                  isButtonActive("/bookmark") ? "tab-active" : ""
                }`}
                onClick={() => handleButtonClick("/bookmark")}
              >
                <BsBookmark className="tab-icon" />
                <span>Bookmark</span>
              </div>
            </Link>
            <Link to="/application">
              <div
                className={`tab ${
                  isButtonActive("/application") ? "tab-active" : ""
                }`}
                onClick={() => handleButtonClick("/application")}
              >
                <IoDocumentsOutline className="tab-icon" />
                <span>Applications</span>
              </div>
            </Link>
          </div>
        </div>
        <div class="navbar-center">
          <div class="text-3xl font-bold">The Job Finder</div>
        </div>
        <div class="navbar-end">
          <div class="form-control">
            <input
              type="text"
              placeholder="Search"
              class="input-bordered w-24 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            data-testid="searchBtn"
            class="btn btn-ghost"
            onClick={getSearched}
          >
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
          <div class="dropdown dropdown-end" data-testId="profileBtn">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src={profileImage} alt="pp" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
            >
              <li>
                <a tabIndex="0" onClick={() => navigate("/editProfile")}>
                  Profile
                </a>
              </li>
              <li>
                <a tabIndex="0" onClick={() => window.my_modal_3.showModal()}>
                  Change Password
                </a>
              </li>
              <li>
                {isAdmin() && (
                  <a
                    tabIndex="0"
                    onClick={() => window.userListModal.showModal()}
                  >
                    View Users
                  </a>
                )}
                {!isAdmin() && (
                  <a tabIndex="0" onClick={() => window.my_modal_1.showModal()}>
                    Change Email
                  </a>
                )}
              </li>
              <li>
                <a tabIndex="1" onClick={() => window.my_modal_5.showModal()}>
                  Delete Account
                </a>
              </li>
              <li>
                <a tabIndex="1" onClick={() => window.my_modal.showModal()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <dialog id="my_modal_3" className=" bg-white modal">
          <form method="dialog" className=" bg-white modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3
              className="font-bold text-lg"
              style={{ "margin-bottom": "20px" }}
            >
              Change Password
            </h3>
            <input
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Current Password"
              class="input-primary input-bordered w-full password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="New Password"
              class="input-primary input-bordered w-full password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Re-enter New Password"
              class="input-primary input-bordered w-full password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div className="modal-action">
              <button className="btn bg-white">Change</button>
            </div>
          </form>
        </dialog>
        <dialog id="my_modal_1" className="modal bg-white">
          <form method="dialog" className="bg-white modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3
              className="font-bold text-lg"
              style={{ "margin-bottom": "20px" }}
            >
              Change Email
            </h3>
            <div class="text-2xl font" style={{ "margin-bottom": "10px" }}>
              Current Email:- {email}
            </div>

            <input
              style={{ marginBottom: "10px" }}
              type="text"
              placeholder="New Email"
              class="input-primary input-bordered w-full"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Re-enter New Email"
              class="input-primary input-bordered w-full"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            ></input>
            <p
              className="mt-1 text-sm leading-6 text-gray-600"
              style={{ marginBottom: "20px" }}
            >
              *This email will be used as your login email.
            </p>
            <div className="modal-action">
              <button className="btn bg-white">Change</button>
            </div>
          </form>
        </dialog>
        <dialog
          id="my_modal_5"
          className=" bg-white modal modal-bottom sm:modal-middle"
        >
          <form method="dialog" className="bg-white modal-box">
            <h3 className="font-bold text-lg">Delete Account !!!</h3>
            <p className="py-4">Are you sure you want to delete?</p>
            <input
              style={{ marginBottom: "10px" }}
              type="password"
              placeholder="Enter Password"
              class="input-primary input-bordered w-full password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-white">No</button>
              <button className="btn bg-white">Yes</button>
            </div>
          </form>
        </dialog>{" "}
        <dialog
          id="userListModal"
          className=" bg-white modal modal-bottom sm:modal-middle"
        >
          <form method="dialog" className="bg-white modal-box">
            <h3 className="font-bold text-lg">List of Users </h3>
            <GetAllUsers />
            <div className="modal-action">
              <button className="btn bg-white">Close</button>
            </div>
          </form>
        </dialog>
        <dialog
          id="my_modal"
          className="bg-white modal modal-bottom sm:modal-middle"
        >
          <form method="dialog" className="bg-white modal-box">
            <h3 className="font-bold text-lg">Log Out !!!</h3>
            <p className="py-4">Are you sure you want to Log Out?</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-white">No</button>
              <button className="btn bg-white" onClick={logOut}>
                Yes
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <div class="spacer"></div>
    </div>
  );
};

export default Navbar;
