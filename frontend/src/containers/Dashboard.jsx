import React from 'react'
import Sidebar from '../components/Sidebar'
import Cards from './Cards'
import Sales from './Sales'
// import Sidebar from ''

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div className='px-3'>
                <Cards />
            </div>
        </>
    )
}

export default Dashboard
