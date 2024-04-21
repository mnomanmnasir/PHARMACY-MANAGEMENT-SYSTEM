
import React, { useEffect } from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { BiShoppingBag, BiPackage, BiArchive, BiTrafficCone, BiMessageAltEdit, BiSupport, BiLogoProductHunt, BiSolidUserAccount, BiPieChart, BiPurchaseTag, BiCube, BiCart } from 'react-icons/bi';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa'
// import { UserButton } from "@clerk/clerk-react";
import Navbar from './Navbar';
import logo from '../assests/pharmacy_logo.jpg'; // Import the image file



const Sidebar = () => {

    return (
        <>
            <Navbar />
            <div className="sidebar" style={{}}>
                {/* <BiCube className="bi my-1 me-2 fs-3" /> */}
                <div className='text-center m-3'>
                    <img src={logo} alt="Logo" width={100} height={100} />
                    <span className="brand-name fs-4">PHARMACIST</span>
                </div>
                <hr className="text-dark" />
                <div className="list-group list-group-flush">
                    <Link to='/dashboard' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <MdOutlineDashboard className="bi my-1 me-2 fs-5" />
                        <span>Dashboard</span>
                    </Link>
                    {/* <Link to='/warehouse' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                    <BiPurchaseTag className="fs-5 me-2 my-1 bi" />
                    <span >Warehouse</span>
                </Link> */}
                    <Link to='/inventories' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiArchive className='bi my-1 me-2 fs-5' />
                        <span >Inventory List</span>
                    </Link>
                    <Link to='/sales' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiLogoProductHunt className="bi-outline my-1 me-2 fs-5" />
                        <span >Sales</span>
                    </Link>

                    <Link to='/purchase' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiShoppingBag className="fs-5 me-2 my-1" />
                        <span >Purchase Order</span>
                    </Link>
                    <Link to='/customer' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiCart className='bi my-1 me-2 fs-5' />
                        <span>Customer List</span>
                    </Link>
                    <Link to='/supplier' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiCart className='bi my-1 me-2 fs-5' />
                        <span>Supplier List</span>
                    </Link>
                    <Link to='/setting' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                        <BiPackage className="fs-5 me-2 my-1" />
                        <span>Setting</span>
                    </Link>


                    {/* <Link to='piechart' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                    <BiPieChart className="fs-5 me-3" />
                    <span>Pie Chart</span>
                </Link> */}
                    {/* <Link to='barchart' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                    <BiBarChart className="fs-5 me-3" />
                    <span>Bar Chart</span>
                </Link>
                <Link to='linechart' className="list-group-item list-group-item-action d-flex align-items-center mb-2 ">
                    <BiBarChart className="fs-5 me-3" />
                    <span >Line Chart</span>
                </Link> */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;