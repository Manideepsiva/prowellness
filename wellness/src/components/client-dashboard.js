import React, { useState,useEffect } from 'react';
import { useLoaderData,Link,Form, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDiaTestName,setDiaLocation,setDiaState } from '../slices/testnameslice';

import clientstyle from "../assets/css/style.module.css"
import  Clientnav from './client-navbar'
import Clientdashcont from './client-dash-const';
import Clienttest from './client-dashboard-test';
import Clientfind2 from './client-find-2';
import Clientfind1 from './client-find-1';
import Clientfooter from './client-footer';
import herobg from "../assets/images/clientpics/hero-bg.png"
import maxxy from "../assets/images/clientpics/maxxy.png"
import Clientstate from './client-dashboard-state';

function Clientdashboard(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testName, setTestName] = useState('');
  const [state, setStatefield] = useState('');

  const [district, setDistrict] = useState('');
  const [error, setError] = useState('');
  const [suggesions1, setSuggestion1] = useState([]);
  const [suggestions2, setSuggestion2] = useState([]);
  const [suggestions3, setSuggestion3] = useState([]);

 

  const [currentComponent, setCurrentComponent] = useState('test');


const handleclick2 = async () =>{
  if(state.length<1 || district.length<1)
    setError("Please Enter State And District")
  else{
    console.log("state and dist ",state,district)

    const response = await fetch('http://localhost:3001/api/bothcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ state:state,district:district }),
    });
    if(response.ok){
      const data = await response.json();
      console.log("hello this ",data);
      if(data.both == 1) setError('State and District was not found');
      else if(data.state == 1) setError('The Entered state name was not found');
      else if(data.district == 1) setError('The Entered district was not found');
      else{
        console.log("bull shit part was completed",testName,district);
        console.log(setTestName)
        dispatch(setDiaTestName(testName));
        dispatch(setDiaState(state));
        dispatch(setDiaLocation(district))
        navigate('/authpage/showrates');
        

      }
    }

  }
}




  const handleFindClick = async () => {
    if(testName.length<1){
      setError("Please Enter Diasgnostic Test name ");
    }
  else{
    const response = await fetch('http://localhost:3001/api/Testcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ testName: testName }),
    });

    if(response.ok){
      setError('');
      setCurrentComponent('location');
       

    }
    else{

      setError("Test name was not found ");


    }





   

  }
    
  };

  const goback = ()=>{
    setCurrentComponent('test');

  }

  useEffect(() => {
    /**
     * Helper function to add event listeners on multiple elements
     */
    const addEventOnElements = (elements, eventType, callback) => {
      for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
      }
    };

 

    /**
     * Mobile Navbar toggle logic
     */
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");
    const overlay = document.querySelector("[data-overlay]");
    console.log(navbar,navTogglers,overlay)

    const toggleNav = () => {
      navbar?.classList.toggle(clientstyle["active"]);
      overlay?.classList.toggle(clientstyle["active"]);
      document.body.classList.toggle(clientstyle["nav-active"]);
    };

    addEventOnElements(navTogglers, "click", toggleNav);

    /**
     * Header and Back-to-Top Button behavior on scroll
     */
    const header = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");

    const activeElementOnScroll = () => {
      if (window.scrollY > 100) {
        header?.classList.add(clientstyle["active"]);
        backTopBtn?.classList.add(clientstyle["active"]);
      } else {
        header?.classList.remove(clientstyle["active"]);
        backTopBtn?.classList.remove(clientstyle["active"]);
      }
    };

    window.addEventListener("scroll", activeElementOnScroll);

    /**
     * Reveal elements on scroll
     */
    const revealElements = document.querySelectorAll("[data-reveal]");
    

    const revealElementOnScroll = () => {
      for (let i = 0, len = revealElements.length; i < len; i++) {
        console.log("mama this is not for as it its working ")
        if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
          revealElements[i].classList.add(clientstyle["revealed"]);
          console.log("hi bro")
        } else {
          revealElements[i].classList.remove(clientstyle["revealed"]);
          console.log("hi bro sdfwi hdvwieubdvq wiehfviw dcwi")
        }
      }
    };

    window.addEventListener("scroll", revealElementOnScroll);
    window.addEventListener("load", revealElementOnScroll);

    // Cleanup function to remove all event listeners when component unmounts
    return () => {
     
      window.removeEventListener("scroll", activeElementOnScroll);
      window.removeEventListener("scroll", revealElementOnScroll);
      window.removeEventListener("load", revealElementOnScroll);
      for (let i = 0; i < navTogglers.length; i++) {
        navTogglers[i].removeEventListener("click", toggleNav);
      }
    };
  }, []);

    return(
        <>


        <Clientnav/>
      





        <main>
    <article>
    <section
  className={clientstyle['section'] + ' ' + clientstyle['hero']}
  style={{ backgroundImage: `url(${herobg})` }}
  aria-label="home"
>
  <div className={clientstyle['container']}>
    <div className={clientstyle['hero-content']}>
      <p className={clientstyle['hero-subtitle'] + ' ' + clientstyle['has-before']} data-reveal="left">
        Welcome To Nexus
      </p>

      <h1 className={clientstyle['headline-lg'] + ' ' + clientstyle['hero-title']} data-reveal="left">
        Make your booking <br /> Easier!
      </h1>

      <div className={clientstyle['hero-card']} data-reveal="left">
        {currentComponent == "location" && (
            <button className={clientstyle['btn-circle']} style={{ marginTop: '1rem',display:"inline" }} aria-label="read more about psychiatry" onClick={goback}>
            <ion-icon name="arrow-back" aria-hidden="true"></ion-icon>
          </button>
        )}
    
        <p className={clientstyle['title-lg'] + ' ' + clientstyle['card-text']}>
 
          Search for flexible appointments
        </p>
        <br />

        <div className={clientstyle['wrapper']}>
         
        

         

         {currentComponent === 'test' && (
        <Clienttest testName={testName} setTestName={setTestName} suggesions1 = {suggesions1} setSuggestion1 = {setSuggestion1} setError = {setError} />
      )}
   
      {currentComponent === 'location' && (
        <Clientstate state = {state} district = {district} setStatefield = {setStatefield}  setDistrict = {setDistrict} suggestions2 = {suggestions2} setSuggestion2 = {setSuggestion2} setError = {setError} suggestions3 = {suggestions3} setSuggestion3 ={setSuggestion3} />
      )}
        </div>

      

        <div className={clientstyle['find']}>
        {currentComponent === 'test' && (
        <Clientfind2 onFindClick={handleFindClick} />
      )}

     {currentComponent === 'location' && (
        <Clientfind1 onFindClick = {handleclick2} />
      )}

      {console.log(state,district,testName)}
        </div>

        <div className={clientstyle['feedbackloc']}>{error}</div>
      </div>
    </div>

    <figure className={clientstyle['hero-banner']} data-reveal="right">
      <img src= {`${maxxy}`} width="590" height="517" loading="eager" alt="hero banner" className={clientstyle['w-100']} />
    </figure>
  </div>
</section>




      <Clientdashcont/>
    </article>
  </main>

  

  <Clientfooter/>

  <a href="#top" className={clientstyle['back-top-btn']} aria-label="back to top" data-back-top-btn>
      <ion-icon name="chevron-up"></ion-icon>
    </a>






        
        
        
        </>
    )
    


}


export default Clientdashboard;