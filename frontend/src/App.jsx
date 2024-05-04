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
import ProtectedRoute from './PrivateRoute'
import { AuthProvider } from './containers/AuthContext';



const App = () => {
  return (
    <Router>
      {/* <AuthProvider> */}
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* /* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/inventories" element={<Inventory />} />
            </Route>
          </Routes>
        </UserProvider>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
