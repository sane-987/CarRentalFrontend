import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarList from './CarList'
import Login from './Login'
import Register from './Register'
import Car from './Car'
import UserProfile from "./UserProfile"
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login />}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/dashboard" element = {<CarList/>}/>
        <Route path = "/profile" element = {<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
