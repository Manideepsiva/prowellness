import React, { useState, useEffect } from 'react';
import { useLoaderData, Link, Form,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setDiaTestName } from '../slices/testnameslice';
import { setHospName,setHospAdd,setHospTestPrice, removeNotification,setHospitalId} from '../slices/booktestslice';
import clientstyle from "../assets/css/style.module.css"
import Clientnav from './client-navbar'
import Clienttest from './client-dashboard-test';
import Clientfind2 from './client-find-2';
import Clientfooter from './client-footer';
import herobg from "../assets/images/clientpics/hero-bg.png"
import maxxy from "../assets/images/clientpics/maxxy.png"
import images from './importimag'
import { useLocation } from 'react-router-dom';






function Clientsearchorgans() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || '';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notification = useSelector((state)=>(state.appBook.notification))

    const [testName, setTestName] = useState('');
    const [suggesions1, setSuggestion1] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const reduxTestName = useSelector((state) => (state.test.testName));
    const statevalue = useSelector((state) => (state.test.testState));
    const districtvalue = useSelector((state) => (state.test.testLocation));
   const [organdata,setOrganData] = useState([]);



    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
        padding: "20px",
      };
    
      const testBoxStyle = {
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        padding: "15px",
        position: "relative",
      };
    
      const testImageStyle = {
        width: "60px",
        height: "auto",
        marginInline: "auto",
        marginBottom: "10px",
      };
    
      const testNameStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
      };
    
      const testPriceStyle = {
        fontSize: "14px",
        color: "#333",
      };
    
      const discountPriceStyle = {
        color: "red",
        fontWeight: "bold",
      };
    
      const originalPriceStyle = {
        textDecoration: "line-through",
        color: "#aaa",
        fontSize: "13px",
        marginLeft: "5px",
      };
    
      
     
    


   



    const handleFindClick = async () => {
        if (testName.length < 1) {
            setError("Please Enter Diasgnostic Test name ");
        }
        else {
            const response = await fetch('https://prowellness-liart.vercel.app/api/Testcheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ testName: testName }),
            });

            if (response.ok) {
                setError('');
                dispatch(setDiaTestName(testName));


            }
            else {

                setError("Test name was not found ");


            }







        }

    };





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
        console.log(navbar, navTogglers, overlay)

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


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://prowellness-liart.vercel.app/api/getnamesbyorgans/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              setError('');
              console.log("hi there from response");
              const Organdata = await response.json();
              console.log(Organdata);
              
              const resultarray = [];
              for (const [key, value] of Object.entries(Organdata)) {
                resultarray.push({ [key]: value });
              }
    
              setOrganData(resultarray);
            } else {
              console.log("failed to fetch");
              setError("Can't fetch right now");
            }
          } catch (err) {
            console.log('Error:', err);
            setError("Can't fetch right now");
          }
        };
    
        fetchData();
      }, []);


   





    return (
        <>
            <Clientnav />

       
            <main><article>

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


                                <p className={clientstyle['title-lg'] + ' ' + clientstyle['card-text']}>

                                    Search for flexible appointments
                                </p>
                                <br />

                                <div className={clientstyle['wrapper']}>






                                    <Clienttest testName={testName} setTestName={setTestName} suggesions1={suggesions1} setSuggestion1={setSuggestion1} setError={setError} />

                                </div>



                                <div className={clientstyle['find']}>

                                    <Clientfind2 onFindClick={handleFindClick} />


                                </div>

                                <div className={clientstyle['feedbackloc']}>{error}</div>
                            </div>
                        </div>

                        <figure className={clientstyle['hero-banner']} data-reveal="right">
                            <img src={`${maxxy}`} width="590" height="517" loading="eager" alt="hero banner" className={clientstyle['w-100']} />
                        </figure>
                    </div>
                </section>


                <section>
                <div style={gridContainerStyle}>
      {organdata.map((organ,index) => (
        
        <div style={testBoxStyle} key={index}>
          <img src={images[`${Object.values(organ)[0]}`]} alt={Object.keys(organ)[0]} style={testImageStyle} />
          <h3 style={testNameStyle}>{Object.keys(organ)[0]}</h3>
          <p style={testPriceStyle}>
        
            <button className={`${clientstyle["btnCircle"]}`} aria-label="read more about psychiatry">
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
          </p>
        
          
        </div>
      ))}
    </div>                

                  
                </section>
            </article></main>


            <Clientfooter />


        </>
    )

}


export default Clientsearchorgans;