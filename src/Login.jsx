import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "./Car.css";
import Axios from 'axios';

const Login = () => {

  const [userLog, setuserLog] = useState("")
  const [passwordLog, setpasswordLog] = useState("")
  const [status, setStatus] = useState("")

  const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated") || false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/login",{
      email : userLog,
      password : passwordLog,
    })
    .then((response) => {
      if(response) {
        setStatus("Login Successful")
        localStorage.setItem("authenticated", true)
        localStorage.setItem("userId", userLog)
        navigate("/carlist")
      }
    })
    .catch((err) => {
      if(err) {
        setStatus("Invalid username/password")
        localStorage.setItem("authenticated", false)
        navigate("/")
      }
    })
  }

  return (
    <div className="logindiv">
        <p>{status}</p>
        <h2>Login</h2>
        <form action="" method="POST" className='loginform' onSubmit = {handleSubmit}>
            <input type="email" name="email" placeholder='Enter email' onChange={(e) => {
              setuserLog(e.target.value)
            }}/>
            <input type="password" placeholder='Enter password' onChange={(e) => {
              setpasswordLog(e.target.value)
            }}/>
            <button>Login</button>
        </form>
        <p>Dont have an account? <a href="/Register">Register</a></p>
    </div>
  )
}

export default Login;