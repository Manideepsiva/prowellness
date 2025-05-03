import React from "react";
import { useEffect,useState } from "react";
import { Form } from "react-router-dom";
import appstyle from "../assets/css/appointmentclient.module.css"

function Appointmentclient(){


    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
  
    useEffect(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
  
      const oneMonthLater = new Date(tomorrow);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  
     
      const formatDate = (date) => {
        return date.toISOString().split('T')[0];
      };
  
      setMinDate(formatDate(tomorrow)); 
      setMaxDate(formatDate(oneMonthLater)); 
    }, []);


    return(
        <>


<div className={appstyle['wrap-app']}>
      <div className={appstyle.container}>
        <h1>ENTER YOUR DETAILS</h1>
        <Form id="appointmentForm"  method="post">
          <label htmlFor="name">Patient Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter Patient Name" required />

          <div className={appstyle.genderabout}>
            <select id="gender" name="gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <label htmlFor="email">Patient E-Mail:</label>
          <input type="email" id="email" name="email" placeholder="Enter Patient Email" required />

          <label htmlFor="phone">Patient Phone no:</label>
          <input type="number" id="phone" name="phone" placeholder="Enter Patient Phone Number" required />

          <label htmlFor="addressDetails">Address Details:</label>
          <div className={appstyle['address-details']}>
            <input type="text" id="area" name="area" placeholder="Enter Area" required />
            <input type="text" id="city" name="city" placeholder="Enter City" required />
            <input type="text" id="state" name="state" placeholder="Enter State" required />
            <input type="text" id="postalCode" name="postalCode" placeholder="Enter Postal Code" required />
          <input type="text"id="number" name />
          </div>

          <label htmlFor="date">Appointment Date and Time:</label>
          <div className={appstyle['time-slots']}>
            <input type="date" id="date" name="date" min={minDate} max={maxDate} required />
            <select id="time" name="time" required>
              <option value="9-10 AM">9-10 AM</option>
              <option value="10-11 AM">10-11 AM</option>
              <option value="11-12 PM">11-12 PM</option>
              <option value="12-1 PM">12-1 PM</option>
              <option value="1-2 PM">1-2 PM</option>
              <option value="2-3 PM">2-3 PM</option>
              <option value="3-4 PM">3-4 PM</option>
              <option value="4-5 PM">4-5 PM</option>
              <option value="5-6 PM">5-6 PM</option>
              <option value="6-7 PM">6-7 PM</option>
              <option value="7-8 PM">7-8 PM</option>
            </select>
          </div>

          <label htmlFor="message">Additional Information:</label>
          <textarea id="message" name="message" placeholder="Enter Additional Information"></textarea>

          <input type="submit" value="Book Appointment" style={{textAlign:"center"}} />
        </Form>
      </div>
    </div>
        
        
        
        
        
        </>
    )
}




export default Appointmentclient;
