import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Car.css"
import "./CarBooking.css"
import Calendar from 'react-calendar'
import Axios from "axios"

const CarBooking = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }
    const UserProfile = () => {
        navigate("/profile")
    }

    const [date, setDate] = useState(new Date())

    const [isShown, setisShown] = useState(false)

    const showCalendar = () => {
        setisShown(!isShown)
    }

    const handleClick = (e) => {
        e.preventDefault()

        console.log(date[1].toLocaleString())
        const resp = Axios.post("http://localhost:3000/carBooking",{
        carid : location.state.carid,
        useremail : localStorage.getItem("userId"),     
        startDate : date[0].toLocaleString(),
        endDate : date[1].toLocaleString()
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
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


        <div className='carBookingSection'>
           <div className='carDetails'>
                <h2>{location.state.carname}</h2>
                <h4>Year : {location.state.caryear}</h4>
                <p>Km Drive : {location.state.carkm}</p>
                <p>Transmission type : {location.state.cartransmission}</p>
           </div>
           
           <button onClick={showCalendar}>Select Dates</button>
           {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )}
            {isShown ? <Calendar value = {date} onChange = {setDate} selectRange={true}/> : null}
            <button onClick = {handleClick}>Get Car</button>
        </div>
        
    
    </>
  )
}

export default CarBooking