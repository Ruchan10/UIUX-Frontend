import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddJob from "./components/AddJob";
import BookmarkPage from "./components/Bookmark";
import EditProfile from "./components/Edit_profile";
import GuestHome from "./components/GuestHome";
import ApplicationPage from "./components/apaplications_page";
import HomePage from "./components/home_page";
import { default as LoginPage } from "./components/login_page";
import SignupPage from "./components/signup_page";
import TestPage from "./components/test";
import { RequireAuth } from "./utils/RequireAuth";
import { AuthProvider } from "./utils/authContext";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div class="bg-white">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<GuestHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="/home"
            element={
              authenticated ? (
                <HomePage />
              ) : (
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              )
            }
          />
          <Route
            path="/application"
            element={
              authenticated ? (
                <ApplicationPage />
              ) : (
                <RequireAuth>
                  <ApplicationPage />
                </RequireAuth>
              )
            }
          />
          <Route
            path="/bookmark"
            element={
              authenticated ? (
                <BookmarkPage />
              ) : (
                <RequireAuth>
                  <BookmarkPage />
                </RequireAuth>
              )
            }
          />
          <Route
            path="/addjob"
            element={
              authenticated ? (
                <AddJob />
              ) : (
                <RequireAuth>
                  <AddJob />
                </RequireAuth>
              )
            }
          />
          <Route
            path="/editProfile"
            element={
              authenticated ? (
                <EditProfile />
              ) : (
                <RequireAuth>
                  <EditProfile />
                </RequireAuth>
              )
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
