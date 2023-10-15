import React, { useState, createContext } from 'react'
import "./Car.css"
import "./Dashboard.css"
import Calendar from "react-calendar"

const Dashboard = () => {


    const [isShown, setisShown] = useState(false)

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const UserContext = createContext();

    const UserProfile = () => {
        navigate("/profile")
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    const handleDateChange = (date) => {
        if(!startDate)
            setStartDate(date)
        else if (!endDate)
            setEndDate(date)
        else
            {
                setStartDate(date)
                setEndDate(null)
            }
      };
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
        
            <div className = "welcome-msg">
                    <h2>Welcome {localStorage.getItem("userId")}</h2>
            </div>
            <div className='date-select-btn'>
                <p>hello</p><button onClick = {() => setisShown(!isShown)}>Select Date</button>
            </div>
            <div className='calendar'>
                
                    {
                        isShown ? <Calendar onChange={handleDateChange} value={date} selectRange={true}/> : null
                    }
            </div>
        {/* <UserContext.Provider value = {startDate}>
        </UserContext.Provider>
        <UserContext.Provider value= {endDate}/> */}
    </>
  )
}

export default Dashboard