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
import Clientstate from './client-dashboard-state';
import appPayStyle from "../assets/css/appointmentpayclient.module.css"


function Clientshowrates() {
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

    useEffect(()=>{

        if(notification == 1){
        var x = document.getElementById("toast")
         x.classList.add(appPayStyle['show']);
        setTimeout(function(){ x.classList.remove(appPayStyle['show']) }, 4000);
    dispatch(removeNotification(0));
  }

  else if(notification == 2){
    var x = document.getElementById("toast2")
         x.classList.add(appPayStyle['show']);
        setTimeout(function(){ x.classList.remove(appPayStyle['show']) }, 4000);
    dispatch(removeNotification(0));

  }


    },[]);

    useEffect(() => {
        const fetchdata = async () => {

            const baseUrl = 'https://prowellness-eight.vercel.app/api/getratesclient';
            const params = {
                state: statevalue,
                district: districtvalue,
                test: reduxTestName,
            };

            // Create a query string
            const queryString = new URLSearchParams(params).toString();
            const urlWithParams = `${baseUrl}?${queryString}`;

            try {
                const response = await fetch(urlWithParams, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                setError(error.message);
            }







        }


        if (reduxTestName) {
            console.log("one time");
            setTestName(reduxTestName);
            fetchdata();


        }

    }, [reduxTestName])



    const handleFindClick = async () => {
        if (testName.length < 1) {
            setError("Please Enter Diasgnostic Test name ");
        }
        else {
            const response = await fetch('https://prowellness-eight.vercel.app/api/Testcheck', {
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


    const openappoint = (e)=>{
        const key = e.target.dataset.key;
        dispatch(setHospName(data[key]["nameOfHospital"]));
        dispatch(setHospAdd(data[key]["address"]));
        dispatch(setHospTestPrice(data[key]["price"]));
        dispatch(setHospitalId(data[key]["id"]));
       navigate('/authpage/showrates/book')

        



    }





    return (
        <>
            <Clientnav />

            <div className={appPayStyle.toast} id="toast">
  <div className={appPayStyle.img}><i class="fa-solid fa-circle-check"></i></div>
  <div className={appPayStyle.desc}>Successfully Booked</div>
</div>

<div className={appPayStyle.toast2} id="toast2">
  <div className={appPayStyle.img2}><i class="fa-solid fa-xmark"></i></div>
  <div className={appPayStyle.desc2}>Something went wrong</div>
</div>

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


                <section className={clientstyle['resultsdata']}>
                    <div className={clientstyle['container']}>
                        <div className={clientstyle['displaydata']}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>NAME OF HOSPITAL</th>
                                        <th>ADDRESS</th>
                                        <th>PRICE</th>
                                        <th>PHONE NUMBER</th>
                                        <th>BOOK AN APPOINTMENT</th>
                                    </tr>
                                </thead>
                               
                                <tbody className={clientstyle['tabledata']}>


                                    {data.map((hospital, index) => (
                                        <tr key={index}>
                                            <td>{hospital.nameOfHospital}</td>
                                            <td>{hospital.address}</td>
                                            <td>{hospital.price}</td>
                                            <td>{hospital.mitraContactNumber}</td>
                                            <td> <button className={clientstyle['btn'] + ' ' + clientstyle['has-before']} style={{ textWrap: 'nowrap' }} onClick={openappoint} data-key = {index}> 
                                                Book Now
                                            </button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan="5">END OF THIS PAGE TABLE</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className={clientstyle['feedbackhosp']}></div>
                        <div className={clientstyle['paignation']}></div>
                    </div>
                </section>
            </article></main>


            <Clientfooter />


        </>
    )

}


export default Clientshowrates;