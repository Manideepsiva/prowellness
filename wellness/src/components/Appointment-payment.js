import React from "react";
import appPayStyle from "../assets/css/appointmentpayclient.module.css"
import { Form } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../slices/booktestslice";
import { jwtDecode } from "jwt-decode";



function Appointmentpayment(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Testname = useSelector((state) => (state.test.testName));
    const TestPrice = useSelector((state) => (state.appBook.testprice));
    const hospname = useSelector((state) => (state.appBook.nameofhospital));
    const hospadd = useSelector((state) => (state.appBook.hospitaladdress));
    const patientname = useSelector((state)=>(state.patbook.patientName));      
    const gendername = useSelector((state)=>(state.patbook.gender));   
   const emailname = useSelector((state)=>(state.patbook.email));
   const phonename = useSelector((state)=>(state.patbook.phoneNo));
   const Areaname = useSelector((state)=>(state.patbook.Area));
   const cityname = useSelector((state)=>(state.patbook.city));
   const patstatename = useSelector((state)=>(state.patbook.patstate));
   const postcodena = useSelector((state)=>(state.patbook.postalcode));
   const appdatename = useSelector((state)=>(state.patbook.appdate));
   const slotname = useSelector((state)=>(state.patbook.slot));
   const additi = useSelector((state)=>(state.patbook.additionalinfo));
   const hospid = useSelector((state)=>(state.appBook.hospitalid));                    

  
    const handlepayment = async(event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedPaymentMethod = formData.get('payment-method'); 

        const token = localStorage.getItem('token');
        
          const decoded = jwtDecode(token);
          const userid = decoded.id;

        const Total = TestPrice+10;
        const appointmentData = {
            patientName: patientname, 
            testprice:TestPrice,
            testname: Testname,
            gender: gendername,
            email: emailname,
            phone: phonename,
            area:Areaname,
            city: cityname,
            state: patstatename,
            postalCode: postcodena,
            appointmentDate: appdatename, 
            timeSlot: slotname,
            additionalInfo:additi,
            hospitalid:hospid ,
            hospitalname:hospname,
            amount: Total,
            paymentMethod: selectedPaymentMethod,
            userid:userid
        };
    
      
   
    
        try {
            const response = await fetch('http://localhost:3001/api/bookappointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(appointmentData),
            });
    
            if (!response.ok) {
                
                dispatch(setNotification(2));
                return navigate("/authpage/showrates");

            }
    
            const result = await response.json();
            console.log('Appointment successfully booked:', result);
            dispatch(setNotification(1));
           return  navigate("/authpage/showrates");
        } catch (error) {
            console.error('Error booking appointment:', error);
            dispatch(setNotification(2));
            return navigate("/authpage/showrates");
        }

    }



    return (
        <>
        

        <div className={appPayStyle.iphone}>
      <header className={appPayStyle.header}>
        <h1>Checkout</h1>
      </header>

      <Form  className={appPayStyle.form} method="POST" onSubmit={handlepayment} id="paymentForm">
        <div>
          <h2>Summary</h2>

          <div className={appPayStyle.card}>
            <address>
           <pre>Type of Test     :<span style={{display:"inline"}}>{Testname}</span></pre>
           <pre>Test Price       :<span style={{display:"inline"}}>{TestPrice}</span>/-</pre>
           <pre>Hospital name    :<span style={{display:"inline"}}>{hospname}</span></pre>
           <pre>Hospital Address :<span style={{display:"inline"}}>{hospadd}</span></pre>
            </address>
          </div>
        </div>

        <fieldset>
          <legend>Payment Method</legend>

          <div className={appPayStyle['form__radios']}>
            <div className={appPayStyle['form__radio']}>
              <label htmlFor="visa">
                <i className="fa-brands fa-cc-mastercard"></i>Visa Payment
              </label>
              <div>
              <input defaultChecked id="visa" name="payment-method" type="radio" value = "Visa"/>
              </div>
            </div>

            <div className={appPayStyle['form__radio']}>
              <label htmlFor="paypal">
                <i className="fa-brands fa-google-pay"></i>PayPal
              </label>
              <div>
              <input id="paypal" name="payment-method" type="radio" value = "Google-pay" />
              </div>
            </div>

            <div className={appPayStyle['form__radio']}>
              <label htmlFor="mastercard">
                <i className="fa-brands fa-cc-visa"></i>Master Card
              </label>
              <div>
              <input id="mastercard" name="payment-method" type="radio"  value = "Master-Card" />
              </div>
            </div>
          </div>
        </fieldset>

        <div>
          <h2>Payment Details</h2>

          <table>
            <tbody>
              <tr>
                <td>Test fee</td>
                <td align="right">{TestPrice}/-</td>
              </tr>
              <tr>
                <td>Platform fee</td>
                <td align="right">10/-</td>
              </tr>
              
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td align="right">{TestPrice+10}/-</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <button className={`${appPayStyle.button} ${appPayStyle['button--full']}`}>
            <svg className={appPayStyle.icon}>
              <use xlinkHref="#icon-shopping-bag" />
            </svg>
            Proceed
          </button>
        </div>
      </Form>
    
    </div>
         



        </>
    )
}

export default Appointmentpayment;