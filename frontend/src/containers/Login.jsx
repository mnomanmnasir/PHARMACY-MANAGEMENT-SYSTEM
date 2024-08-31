import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";
import { useUser } from "../containers/UserContext";
import "../styles/register.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, updateUser } = useUser();

  const { login } = useAuth(); // Use the login function from AuthContext
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      navigate("/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Invalid email");
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response:", response); // Log response

      const data = await response.json();
      console.log("Response Data:", data); // Log response data

      // Check if login was successful
      if (response.ok) {
        login(data.token);
        updateUser(data.user); // Update user context with user details

        console.log("Login successful:", data);
        // Show toast notification
        toast.success("Login successful");
        // Navigate to dashboard after toast closes
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data);
        // Show toast notification for failure
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network or other errors
      // Show toast notification for error
      toast.error("Invalid Email and Password");
    }
  };

  return (
    <>
    <div className="bgs-gradient "> </div>
      <div className=" custom-box ">
    <div className="wrap">
        <div className="col-md-6 d-md-flex  white-box pt-5 pb-5  d-flex align-items-center justify-content-center flex-column">
          <svg
            className="pb-3"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
          <h2 className="fw-bold text-center pb-3">
            Welcome <br></br> Back!
          </h2>
          <p className=" text-center">Sign in to manage your account</p>
        </div>
        <div className="col-md-6  pt-5 pb-5  blue-box">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="r-form">
            <div className="mb-3">
              
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
             
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange}
                className="form-control"
                minLength={6}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn light-blue-btn text-white">
                Login
              </button>
            </div>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </div>
      </div>
      </>
  
  );
};

export default Login;