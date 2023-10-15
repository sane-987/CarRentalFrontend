import React, { useEffect, useState } from 'react';
import { json, useNavigate } from "react-router-dom";

import Car from './Car';
import "./Car.css";
import Axios from 'axios';
import ReactPaginate from "react-paginate"



function CarList() {

    useEffect(() => {
        if(localStorage.getItem("authenticated") !== "true")
            {
                alert("user not logged in")
                navigate("/")
            }
        else {
            getData()
        .then(result => {
            setCarDetails(result)
            setisLoading(false)
            
        })
        }
    }, [])

    const [isLoading, setisLoading] = useState(true)
    const [carDetails, setCarDetails] = useState([])
    
    
    const navigate = useNavigate()

    const UserProfile = () => {
        navigate("/profile")
    }

    //pagination variables
    const [pageNumber, setPageNumber] = useState(0)

    const carsPerPage = 10
    const pageVisited = pageNumber * carsPerPage
    const pageCount = Math.ceil(carDetails.length / carsPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }


    const currentRecords = carDetails.slice(pageVisited, pageVisited + carsPerPage)

    
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }
    
    async function getData() {
        const response = await Axios.get("http://127.0.0.1:3000/getcarDetails")
        //console.log(response.data)
        return response.data
    }
    
    
        return (
            <>
            <nav className='profilemenu'>
                <button onClick = {UserProfile}>
                    MyProfile
                </button>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            
            {(isLoading) ? <h1>Loading...</h1> : null}
            <section className = "carlist">
                {   
                    Object.keys(currentRecords).map(function(_) {
                        
                        return <Car key = {Math.random()} carid = {currentRecords[_]["id"]} carname = {currentRecords[_]["name"]} carkm={currentRecords[_]["km_driven"]} cartransmission={currentRecords[_]["transmission"]} caryear = {currentRecords[_]["year"]}/>
                        //return <Car key = {Math.random()} carname = {CarName[_]} carkm={CarKm[_]} cartransmission={CarTransmission[_]} caryear = {CarYear[_]} />
                    })
                }
            </section>
            <ReactPaginate
                previousLabel= {"prev"}
                nextLabel = {"next"}
                pageCount = {pageCount}
                onPageChange = {changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                activeClassName={"paginationActive"}
            />
            </>
          ) 
}

export default CarList