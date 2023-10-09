import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./Car.css"
import { useNavigate } from "react-router-dom";


const UserProfile = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    let [carRentDetails, setcarRentDetails] = useState([])
    useEffect(() => {
        Axios.post("http://localhost:3000/fetchUserProfile",{
            useremail : localStorage.getItem("userId")
        })
        .then((response) => {
            console.log(response.data)
            setcarRentDetails(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

  return (
    <>
        <div className='profilemenu'>
                <button>
                    MyProfile
                </button>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        <section className='carlist'>
            {
                Object.keys(carRentDetails).map((_) => {
                    return (
                        <>
                        <div className='carElement'>
                            <article className = "car">
                                <h3>{carRentDetails[_]["name"]}</h3>
                                <p>StartDateTime : {carRentDetails[_]["startDateTime"]}</p>
                                <p>EndDateTime : {carRentDetails[_]["endDateTime"]}</p>
                            </article>
                        </div>
                        </>
                    )
                })
            }
        </section>
    </>
  )
}

export default UserProfile