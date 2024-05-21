import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Customer from "./containers/Customer";
import Sales from "./containers/Sales";
import Inventory from "./containers/Inventory";
import { UserProvider, useUser } from "./containers/UserContext"; // Import and use the UserProvider and useUser hook
import Login from "./containers/Login";
import Register from "./containers/Register";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import ProtectedRoute from './PrivateRoute';
import { AuthProvider } from './containers/AuthContext';
import Purchase from "./containers/Purchase";
import Supplier from "./containers/Supplier";
import React, { useState, useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  const [toggle, setToggle] = useState(true); // Sidebar initially open

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // Adjust this value according to your design
        setToggle(false); // Close sidebar when screen size is reduced
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="container-fluid">
            <div className="row">
              {toggle && (
                <div className="col-2 vh-100">
                  <Sidebar />
                </div>
              )}
              <div className={toggle ? 'col-10' : 'col-12'}>
                <Navbar Toggle={Toggle} />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/inventories" element={<Inventory />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/products" element={<Supplier />} />
                  </Route>
                </Routes>
                <ToastContainer />
              </div>
            </div>
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
