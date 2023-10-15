import React, { useState } from 'react';
import "./Car.css";
import Axios from "axios"
import Calendar from "react-calendar";
import { useNavigate } from 'react-router-dom';


const Car = (props) => {
    const {carid, carname, carkm, cartransmission, caryear} = props
    
    const navigate = useNavigate()
    const handleClick = (e) => {
      e.preventDefault();

      navigate("/carbooking", {
        state : {
          carid : carid,
          carname : carname,
          carkm : carkm,
          cartransmission : cartransmission,
          caryear : caryear
        }
      })
      //const user = localStorage.getItem("userId")
      
      // const resp = Axios.post("http://localhost:3000/carBooking",{
      //   carid : carid,
      //   useremail : user,
        
      // })
      // .then((response) => {
      //   console.log(response)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }
  return (
    <>
    
    <div className='carElement'>
        <article className = "car">
            <h3>{carname}</h3>
            <p>Year : {caryear}</p>
            <p>Km Driven : {carkm}</p>
            <p>Transmission type : {cartransmission}</p>
        </article>
        <div className = "countBtn">
          <button onClick={handleClick}>BOOK</button>
        </div>
    </div>
    </>
  )
}

export default Car