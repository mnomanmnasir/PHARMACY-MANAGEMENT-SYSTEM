import React, { useState, useEffect } from 'react'
// import ReactApexChart from 'react-apexcharts';
import '../styles/card.css'
// import { BiPackage } from 'react-icons/bi';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Axios from 'axios';
// import { baseUrl } from '../App';


const Card = () => {
    const [counts, setCounts] = useState({}); // Loading state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state



    return (

        <div className="container-fluid">
            <div className="row g-1 my-2">
                <div className="col-md-4">
                    <div className="p-3 bg-green d-flex justify-content-around align-items-center shadow-sm rounded">
                        <div>
                            <h3 className='fs-2'>
                                {counts ? counts.products : 0}
                            </h3>
                            <h3 className='fs-5'>
                                Products
                            </h3>
                        </div>
                        <i class="bi bi-cash-coin p-3 fs-1"></i>

                    </div>
                </div>
                <div className="col-md-4">
                    <div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="700" className="p-3 bg-orange shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                {counts ? counts.orders : 0}
                            </h3>
                            <h3 className='fs-5'>
                                Sales
                            </h3>
                        </div>
                        <i className="bi bi-currency-dollar p-3 fs-1"></i>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 bg-pink shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                {counts ? counts.purchases : 0}
                            </h3>
                            <h3 className='fs-5'>
                                Purchases
                            </h3>
                        </div>
                        <i className="bi bi-truck p-3 fs-1"></i>
                    </div>
                </div>
                {/* <div className="col-md-3">
                    <div className="p-3 bg-aqua shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className='fs-2'>
                                {counts ? counts.shipments : 0}
                            </h3>
                            <h3 className='fs-5'>
                                Shipments
                            </h3>
                        </div>
                        {/* <i className="bi bi-graph-up-arrow p-3 fs-1"></i> */}
                {/* <i class="bi bi-truck p-3 fs-1"></i>
            </div>
            </div> */}
        </div>
        </div>
    )

}
export default Card;