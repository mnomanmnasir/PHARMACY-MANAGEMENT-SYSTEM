// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/js/dist/dropdown';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import Dashboard from './containers/Dashboard';
// import Customer from './containers/Customer';
// import Sales from './containers/Sales';
// import Inventory from './containers/Inventory';
// import { UserProvider } from './containers/UserContext';
// import Login from './containers/Login';
// import Register from './containers/Register';
// import ProtectedRoute from './ProtectedRoute';
// import { AuthProvider } from './containers/AuthContext';
// import Purchase from './containers/Purchase';
// import Supplier from './containers/Supplier';
// import Product from './containers/Product';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import './App.css';

// const App = () => {
//   const [toggle, setToggle] = useState(true);

//   const Toggle = () => {
//     setToggle(!toggle);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setToggle(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
 
//   return (
//     <Router>
//       <AuthProvider>
//         <UserProvider>
//           <MainContent toggle={toggle} Toggle={Toggle} />
//         </UserProvider>
//       </AuthProvider>
//     </Router>
//   );
// };

// const MainContent = ({ toggle, Toggle }) => {
//   const location = useLocation();
//   const hideSidebarAndNavbar = location.pathname === '/login' || location.pathname === '/register';

//   return (
//     <div className="container-lg container-xl container-fluid-md container-fluid-sm container-fluid mt-4 mb-4 bg-white c-container">
//       <div className="row l-grey rounded border-40 ">
//         {!hideSidebarAndNavbar && toggle && (
//           <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-12 p-0 rounded bg-white" >
//             <Sidebar />
//           </div>
//         )}
//         <div className={toggle && !hideSidebarAndNavbar ? 'col-lg-10 col-lg-10 col-md-8 col-sm-8 col-12 p-0 ' : 'col-12 p-0 '}>
//           {!hideSidebarAndNavbar && <Navbar Toggle={Toggle} />}
//           <UserProvider>
//           <AuthProvider> 
//               <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route element={<ProtectedRoute />}>
//                 <Route path="/dashboard" element={<Dashboard />}  />
//                 <Route path="/customer" element={<Customer />} />
//                 <Route path="/sales" element={<Sales />} />
//                 <Route path="/inventories" element={<Inventory />} />
//                 <Route path="/purchase" element={<Purchase />} />
//                 <Route path="/supplier" element={<Supplier />} />
//                 <Route path="/products" element={<Product />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//             </AuthProvider>
//           </UserProvider>
//           <ToastContainer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './containers/Dashboard';
import Customer from './containers/Customer';
import Sales from './containers/Sales';
import Inventory from './containers/Inventory';
import { UserProvider } from './containers/UserContext';
import Login from './containers/Login';
import Register from './containers/Register';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './containers/AuthContext';
import Purchase from './containers/Purchase';
import Supplier from './containers/Supplier';
import Product from './containers/Product';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToggle(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <MainContent toggle={toggle} Toggle={Toggle} />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

const MainContent = ({ toggle, Toggle }) => {
  const location = useLocation();
  const hideSidebarAndNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="container-lg container-xl container-fluid-md container-fluid-sm container-fluid mt-4 mb-4 bg-white c-container">
      <div className="row l-grey rounded border-40 ">
        {!hideSidebarAndNavbar && toggle && (
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-12 p-0 rounded bg-white">
            <Sidebar />
          </div>
        )}
        <div className={toggle && !hideSidebarAndNavbar ? 'col-lg-10 col-lg-10 col-md-8 col-sm-8 col-12 p-0' : 'col-12 p-0'}>
          {!hideSidebarAndNavbar && <Navbar Toggle={Toggle} />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/inventories" element={<Inventory />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/products" element={<Product />} />
            {/* </Route> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
