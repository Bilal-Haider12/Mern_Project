import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(data[0], data[1]);

    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-caption" style={{ zIndex: "5" }}>
                    <div className="d-flex justify-content-center">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                    </div> 
                </div>

                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-item active">
                        <img src="https://loremflickr.com/900/700/fastfood" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="food" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://loremflickr.com/900/700/barbque" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="food" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://loremflickr.com/900/700/pastry" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="food" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container'>
                {
                    // foodCat is used to show data from mongoDB by using map function(it will verify the data from database) in which we use return to give the result of foodCat.
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                {/* in return we will call the name of data in a div like data.CategoryName from MongoDB  */}
                                <div key={data._id} className='fs-3 m-3' >{data.CategoryName}</div>
                                <hr />
                                {
                                    // foodItem is a return in  a return which we are calling the 
                                    foodItem !== []
                                        ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) ) 
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3' >
                                                        <Card foodItem= {filterItems}
                                                            options={filterItems.options[0]}
                                                            // imgSrc={filterItems.img}
                                                        ></Card>
                                                    </div>
                                                )
                                            }

                                            ) : <div> No data here </div>
                                }
                            </div>)
                        }) : <div>No categories available</div>
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}

