import React, { useState,useEffect } from 'react';
import { useLoaderData,Link,Form, useNavigate} from 'react-router-dom';

import herobg from "../assets/images/clientpics/hero-bg.png"
import maxxy from "../assets/images/clientpics/maxxy.png"
import clientstyle from "../assets/css/style.module.css"
import images from "./importimag"


function Landingpage(){


    return(<>

<header className={clientstyle['header']} data-header>
      <div className={clientstyle['container']}>

        <a href="#" className={clientstyle['logo']}>
          <img src={images["log02.svg"]} width="50" height="46" alt="wellness" />
        </a>

        <nav className={clientstyle['navbar']} data-navbar>

          <div className={clientstyle['navbar-top']}>

            <a href="#" className={clientstyle['logo']}>
              <img src={images["log02.svg"]} width="50" height="46" alt="welness" />
            </a>

            <button className={clientstyle['nav-close-btn']} aria-label="close menu" data-nav-toggler>
              <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
            </button>

          </div>

          <ul className={clientstyle['navbar-list']}>

            <li className={clientstyle['navbar-item']}>
              <a href="/dashboard" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to = {'/login'}>Client login</Link></a>
            </li>

            <li className={clientstyle['navbar-item']}>
              <a href="/dashboard/upcomingapplist" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to={"/hospitallogin"}>Hospital login</Link></a>
            </li>


           

            <li className={clientstyle['navbar-item']}>
              <a href="#" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to={"/adminlogin"}>Admin login</Link></a>
            </li>

        

           
          </ul>

          <ul className={clientstyle['social-list']}>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>

          </ul>

        </nav>

        <button className={clientstyle['nav-open-btn']} aria-label="open menu" data-nav-toggler>
          <ion-icon name="menu-outline"></ion-icon>
        </button>

        <div className={clientstyle['overlay']} data-nav-toggler data-overlay></div>

      </div>
    </header>

    

    <section
  className={clientstyle['section'] + ' ' + clientstyle['hero']}
  style={{ backgroundImage: `url(${herobg})` }}
  aria-label="home"
>
  <div className={clientstyle['container']}>
    <div className={clientstyle['hero-content']}>
      <p className={clientstyle['hero-subtitle'] + ' ' + clientstyle['has-before']} >
        Welcome To Nexus
      </p>

      <h1 className={clientstyle['headline-lg'] + ' ' + clientstyle['hero-title']} >
        Make your booking <br /> Easier!
      </h1>

      <div className={clientstyle['hero-card']} data-reveal="left">
    
    
        <p className={clientstyle['title-lg'] + ' ' + clientstyle['card-text']}>
 
          Search for flexible appointments
        </p>
        <br />
      </div>
    </div>

    <figure className={clientstyle['hero-banner']}>
      <img src= {`${maxxy}`} width="590" height="517" loading="eager" alt="hero banner" className={clientstyle['w-100']} />
    </figure>
  </div>
</section>

    
    </>)
}


export default Landingpage