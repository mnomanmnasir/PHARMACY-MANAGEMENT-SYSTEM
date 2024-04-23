import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Cards from './Cards'
import Sales from './Sales'
// import Sidebar from ''

const Dashboard = () => {
    const [toggle, setToggle] = useState([])
const Toggle = () => {
    setToggle(!toggle)
}
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {toggle && <div className="col-2 vh-100">
                        <Sidebar />
                    </div>}
                    <div className='col'>
                        {/* <Navbar /> */}
                        <Cards Toggle={Toggle} />
                        {/* <Sales Toggle={Toggle}/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
