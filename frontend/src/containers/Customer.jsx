import React from 'react'
import Sidebar from '../components/Sidebar'
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';



const Customer = () => {
    return (
        <>
            <div className="main-content container-fluid px-4">
                <div className="row mt-4">
                    <div className="col table-responsive rounded p-3 border bg-white">
                    <div className='d-flex gap-2 pb-4'>
                        <input type="text" name="" className='seacrh-input flex-fill' placeholder="Search"/>
                        <Button variant="info border-rounded" className='addItem-button' >+ Add Customer</Button>
                        </div>
                      
                        <h2 className='pb-4'>Customer</h2>
                        <table className="table  table-striped table-hover">
                            <thead className=''>
                                <tr>
                                    <th className='text-center'>Name</th>
                                    <th className='text-center'>Contact Number</th>
                                    <th className='text-center'>Email</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td className='text-center'>{ }</td>
                                    <td className='text-center'>{ }</td>
                                    <td className='text-center'>{ }</td>
                                    <td className='text-center'>
                                        <Button variant="light" className='btn-sm' >
                                            <BsPencilSquare />
                                        </Button>
                                        <Button
                                            variant="light" className='btn-sm'
                                        >
                                            <BsTrash />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customer
