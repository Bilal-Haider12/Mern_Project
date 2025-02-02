import React from 'react'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-caption" style={{ zIndex: "5" }}>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                    </form>
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
            </div>
        </div>
    )
}
