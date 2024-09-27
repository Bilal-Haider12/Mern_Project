import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer'
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (!data) {
        return <div>Loading...</div>; // Handle loading state if needed
    }

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
    
        if (!userEmail) {
            console.error("User email is missing");
            return; // Exit if email is not available
        }
    
        console.log("User Email:", userEmail); // Debugging line
    
        try {
            let response = await fetch("http://localhost:5000/api/auth/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                }),
            });
    
            console.log("Order response:", response.status);
    
            if (response.ok) { // Use response.ok to check for 200-299 status codes
                dispatch({ type: "DROP" });
            } else {
                console.error("Failed to place order, response status:", response.status);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };
    

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div> <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr>
                            <th scope='row' className='text-white'>{index + 1}</th>
                            <td className='text-white'>{food.name}</td>
                            <td className='text-white'>{food.qty}</td>
                            <td className='text-white'>{food.size}</td>
                            <td className='text-white'>{food.price}</td>
                            <td ><button type='button' className='btn p-0'><DeleteIcon color="error" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>     </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2 text-white'>Total Price:{totalPrice}/-</h1></div>
             <div>
                <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
             </div>

        </div>



        </div>
    )


}