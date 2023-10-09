import React from 'react';
import "./Car.css";
import Axios from "axios"
const Car = (props) => {
    const {carid, carname, carkm, cartransmission, caryear} = props
    const handleClick = (e) => {
      e.preventDefault();
      const user = localStorage.getItem("userId")
      console.log(user)
      console.log(carname)
      console.log(carkm)
      console.log(carid)
      const resp = Axios.post("http://localhost:3000/carBooking",{
        carid : carid,
        useremail : user
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
    <div className='carElement'>
        <article className = "car">
            <h3>{carname}</h3>
            <p>Year : {caryear}</p>
            <p>Km Driven : {carkm}</p>
            <p>Transmission type : {cartransmission}</p>
        </article>
        <button onClick={handleClick}>BOOK</button>
    </div>
    </>
  )
}

export default Car