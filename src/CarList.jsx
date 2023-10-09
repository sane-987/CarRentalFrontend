import React, { useEffect, useState } from 'react';
import { json, useNavigate } from "react-router-dom";

import Car from './Car';
import "./Car.css";
import Axios from 'axios';

const CarJson = {"Car_Name": {"0": "ritz", "1": "sx4", "2": "ciaz", "3": "wagon r", "4": "swift", "5": "vitara brezza", "6": "ciaz", "7": "s cross", "8": "ciaz", "9": "ciaz", "10": "alto 800", "11": "ciaz", "12": "ciaz", "13": "ertiga", "14": "dzire", "15": "ertiga", "16": "ertiga", "17": "ertiga", "18": "wagon r", "19": "sx4", "20": "alto k10", "21": "ignis", "22": "sx4", "23": "alto k10", "24": "wagon r", "25": "swift", "26": "swift", "27": "swift", "28": "alto k10", "29": "ciaz"}, "Year": {"0": 2014, "1": 2013, "2": 2017, "3": 2011, "4": 2014, "5": 2018, "6": 2015, "7": 2015, "8": 2016, "9": 2015, "10": 2017, "11": 2015, "12": 2015, "13": 2015, "14": 2009, "15": 2016, "16": 2015, "17": 2016, "18": 2015, "19": 2010, "20": 2016, "21": 2017, "22": 2011, "23": 2014, "24": 2013, "25": 2011, "26": 2013, "27": 2017, "28": 2010, "29": 2015}, "Selling_Price": {"0": 3.35, "1": 4.75, "2": 7.25, "3": 2.85, "4": 4.6, "5": 9.25, "6": 6.75, "7": 6.5, "8": 8.75, "9": 7.45, "10": 2.85, "11": 6.85, "12": 7.5, "13": 6.1, "14": 2.25, "15": 7.75, "16": 7.25, "17": 7.75, "18": 3.25, "19": 2.65, "20": 2.85, "21": 4.9, "22": 4.4, "23": 2.5, "24": 2.9, "25": 3.0, "26": 4.15, "27": 6.0, "28": 1.95, "29": 7.45}, "Present_Price": {"0": 5.59, "1": 9.54, "2": 9.85, "3": 4.15, "4": 6.87, "5": 9.83, "6": 8.12, "7": 8.61, "8": 8.89, "9": 8.92, "10": 3.6, "11": 10.38, "12": 9.94, "13": 7.71, "14": 7.21, "15": 10.79, "16": 10.79, "17": 10.79, "18": 5.09, "19": 7.98, "20": 3.95, "21": 5.71, "22": 8.01, "23": 3.46, "24": 4.41, "25": 4.99, "26": 5.87, "27": 6.49, "28": 3.95, "29": 10.38}, "Kms_Driven": {"0": 27000, "1": 43000, "2": 6900, "3": 5200, "4": 42450, "5": 2071, "6": 18796, "7": 33429, "8": 20273, "9": 42367, "10": 2135, "11": 51000, "12": 15000, "13": 26000, "14": 77427, "15": 43000, "16": 41678, "17": 43000, "18": 35500, "19": 41442, "20": 25000, "21": 2400, "22": 50000, "23": 45280, "24": 56879, "25": 20000, "26": 55138, "27": 16200, "28": 44542, "29": 45000}, "Fuel_Type": {"0": "Petrol", "1": "Diesel", "2": "Petrol", "3": "Petrol", "4": "Diesel", "5": "Diesel", "6": "Petrol", "7": "Diesel", "8": "Diesel", "9": "Diesel", "10": "Petrol", "11": "Diesel", "12": "Petrol", "13": "Petrol", "14": "Petrol", "15": "Diesel", "16": "Diesel", "17": "Diesel", "18": "CNG", "19": "Petrol", "20": "Petrol", "21": "Petrol", "22": "Petrol", "23": "Petrol", "24": "Petrol", "25": "Petrol", "26": "Petrol", "27": "Petrol", "28": "Petrol", "29": "Diesel"}, "Seller_Type": {"0": "Dealer", "1": "Dealer", "2": "Dealer", "3": "Dealer", "4": "Dealer", "5": "Dealer", "6": "Dealer", "7": "Dealer", "8": "Dealer", "9": "Dealer", "10": "Dealer", "11": "Dealer", "12": "Dealer", "13": "Dealer", "14": "Dealer", "15": "Dealer", "16": "Dealer", "17": "Dealer", "18": "Dealer", "19": "Dealer", "20": "Dealer", "21": "Dealer", "22": "Dealer", "23": "Dealer", "24": "Dealer", "25": "Dealer", "26": "Dealer", "27": "Individual", "28": "Dealer", "29": "Dealer"}, "Transmission": {"0": "Manual", "1": "Manual", "2": "Manual", "3": "Manual", "4": "Manual", "5": "Manual", "6": "Manual", "7": "Manual", "8": "Manual", "9": "Manual", "10": "Manual", "11": "Manual", "12": "Automatic", "13": "Manual", "14": "Manual", "15": "Manual", "16": "Manual", "17": "Manual", "18": "Manual", "19": "Manual", "20": "Manual", "21": "Manual", "22": "Automatic", "23": "Manual", "24": "Manual", "25": "Manual", "26": "Manual", "27": "Manual", "28": "Manual", "29": "Manual"}}
const CarName = CarJson["Car_Name"]
const CarKm = CarJson["Kms_Driven"]
const CarTransmission = CarJson["Transmission"]
const CarYear = CarJson["Year"]



function CarList() {

    const [authenticated, setauthenticated] = useState(null)
    const [carDetails, setCarDetails] = useState([])
    let [carName, setcarName] = useState([])
    let [carKm, setcarKm] = useState([])
    let [carTransmission, setcarTransmission] = useState([])
    let [carYear, setcarYear] = useState([])
    let [carId, setCarId] = useState([])
    const navigate = useNavigate()

    const UserProfile = () => {
        navigate("/profile")
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    async function getData() {
        const response = await Axios.get("http://127.0.0.1:3000/getcarDetails")
        //console.log(response.data)
        return response.data
    }

    useEffect(() => {
        if(localStorage.getItem("authenticated") !== "true")
            {
                alert("user not logged in")
                navigate("/")
            }
        else {
            getData()
        .then(result => {
            //console.log(result)
            setCarDetails(result)
            //console.log(carDetails[50]["id"])
            //console.log(carDetails[0]["name"])
            // setcarName(result["name"])
            // setcarYear(result["year"])
            // setcarKm(result["km_driven"])
            // setcarTransmission(result["transmission"])
            // setCarId(result["id"])
        })
        }
    }, [])

        return (
            <>
            <div className='profilemenu'>
                <button onClick = {UserProfile}>
                    MyProfile
                </button>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className = "welcome-msg">
                <h2>Welcome {localStorage.getItem("userId")}</h2>
            </div>
            <section className = "carlist">
                {   
                    Object.keys(carDetails).filter(e => carDetails[e]["Booking_Status"] === "unbooked").map(function(_) {
                        
                        return <Car key = {Math.random()} carid = {carDetails[_]["id"]} carname = {carDetails[_]["name"]} carkm={carDetails[_]["km_driven"]} cartransmission={carDetails[_]["transmission"]} caryear = {carDetails[_]["year"]}/>
                        //return <Car key = {Math.random()} carname = {CarName[_]} carkm={CarKm[_]} cartransmission={CarTransmission[_]} caryear = {CarYear[_]} />
                    })
                }
            </section>
            </>
          ) 
}

export default CarList