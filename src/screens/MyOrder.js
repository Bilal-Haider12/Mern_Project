import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log('Email from localStorage:', email);
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Fetched order data:', JSON.stringify(data, null, 2));
    
            // Ensure the orderData is set correctly
            if (data.orderData && Array.isArray(data.orderData.order_data)) {
                setOrderData(data.orderData.order_data);
            } else {
                console.error('Order data is not in expected format:', data);
            }
    
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((order, index) => {
                            const orderDate = order[0]?.Order_date || 'Order Date Not Available'; // Access the order date
                            const items = order.slice(1); // Get all items starting from index 1

                            return (
                                <div key={index}>
                                    <div className='m-auto mt-5'>
                                        {orderDate}
                                        <hr />
                                    </div>
                                    {items && Array.isArray(items) && items.length > 0 ? ( // Check if items exist
                                        items.map((item, idx) => (
                                            <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No items found for this order</div> // Fallback for missing items
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyOrder;
