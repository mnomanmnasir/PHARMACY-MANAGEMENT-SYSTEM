import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        fetchPurchases();
    }, []);
    const [searchQuery, setsearchQuery] = useState("");
    const fetchPurchases = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/purchase/purchases');
            if (!response.ok) {
                throw new Error('Failed to fetch purchases');
            }
            const data = await response.json();
            // Format the expireDate to YYYY-MM-DD
            const formattedData = data.map(purchase => ({
                ...purchase,
                expireDate: new Date(purchase.expireDate).toISOString().split('T')[0]
            }));
            setPurchases(formattedData); // Set the state once with the formatted data
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    const handleSearchChange = (e) => {
        setsearchQuery(e.target.value);
      };
      const filteredPurchases = purchases.filter((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return (
        <>
            <div className="main-content container-fluid px-4">
                <div className="row mt-4">
                    <div className="col table-responsive rounded p-3 border bg-white">
                    <div className='d-flex gap-2 pb-4'>
                        <input
                         type="text"
                          name="" 
                          className='seacrh-input flex-fill'
                           placeholder="Search"
                           value={searchQuery}
                           onChange={handleSearchChange}
                           />
                        <Button variant="info border-rounded" className='addItem-button'  >+ Add Item</Button>
                        </div>
                      
                        <h2 className='pb-4'>Purchase</h2>
                        <table className="table  table-striped table-hover">
                            <thead className=''>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Supplier</th>
                                    <th>Total Price</th>
                                    <th>Expire Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPurchases.map((purchase, index) => (
                                    <tr key={index}>
                                        <td>{purchase.productName}</td>
                                        <td>{purchase.category}</td>
                                        <td>{purchase.quantity}</td>
                                        <td>{purchase.supplier}</td>
                                        <td>{purchase.costPrice}</td>
                                        <td>{purchase.expireDate}</td>
                                        <td>
                                            <Button variant="light" className='btn-sm'>
                                                <BsPencilSquare />
                                            </Button>
                                            <Button variant="light" className='btn-sm'>
                                                <BsTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default Purchase;
