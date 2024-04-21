import React, { useEffect } from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
// import avatarImage from '../assests/avatarImg.png';
import { Link } from 'react-router-dom';
// import { useAuth } from '../container/AuthContext';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import { FaChevronDown } from 'react-icons/fa';
// import Cookies from 'js-cookie';
import { UserButton, useUser } from "@clerk/clerk-react";
// import { Input } from 'react-bootstrap'

const Navbar = () => {

  //   useEffect(() => {
  //     AOS.init();
  //   }, [])
  const { user } = useUser();

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li> */}
            </ul>
            <form className="d-flex gap-3">
              <span className="nav-link m-1">{user ? user.fullName : 'User not found'}</span> 
              <UserButton />
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
              {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;