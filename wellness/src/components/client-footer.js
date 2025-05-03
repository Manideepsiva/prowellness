import React from "react";
import clientstyle from "../assets/css/style.module.css"
import images from "./importimag"

function Clientfooter(){
    return(
        <>
           

           <footer className={clientstyle['footer']} style={{ backgroundImage: "url('./assets/images/footer-bg.png')" }}>
      <div className={clientstyle['container']}>

        <div className={clientstyle['section'] + ' ' + clientstyle['footer-top']}>

          <div className={clientstyle['footer-brand']} data-reveal="bottom">
            <a href="#" className={clientstyle['logo']}>
              <img src= {images["logo.jpg"]} width="80" height="40" style={{ objectFit: 'fill' }} alt="Doclab home" />
              <p style={{ fontStyle: 'italic', fontSize: 'larger' }}>Wellness Nexus</p>
            </a>
            <ul className={clientstyle['contact-list'] + ' ' + clientstyle['has-after']}>

              <li className={clientstyle['contact-item']}>
                <div className={clientstyle['item-icon']}>
                  <ion-icon name="mail-open-outline"></ion-icon>
                </div>
                <div>
                  <p>
                    Main Email : <a href="mailto:contact@website.com" className={clientstyle['contact-link']}>contact@&shy;website.com</a>
                  </p>
                  <p>
                    Inquiries : <a href="mailto:Info@mail.com" className={clientstyle['contact-link']}>Info@mail.com</a>
                  </p>
                </div>
              </li>

              <li className={clientstyle['contact-item']}>
                <div className={clientstyle['item-icon']}>
                  <ion-icon name="call-outline"></ion-icon>
                </div>
                <div>
                  <p>
                    Office Telephone : <a href="tel:0029129102320" className={clientstyle['contact-link']}>0029129102320</a>
                  </p>
                  <p>
                    Mobile : <a href="tel:000232439493" className={clientstyle['contact-link']}>(+91)987 654 3210</a>
                  </p>
                </div>
              </li>

            </ul>
          </div>

          <div className={clientstyle['footer-list']} data-reveal="bottom">
            <p className={clientstyle['headline-sm'] + ' ' + clientstyle['footer-list-title']}>About Us</p>
            <p className={clientstyle['text']}>
              Crafted with passion and expertise, our web project seamlessly blends innovation and functionality to deliver an exceptional user experience.
            </p>
            <address className={clientstyle['address']}>
              <ion-icon name="map-outline"></ion-icon>
              <span className={clientstyle['text']}>
                IIIT Sricity <br />
                Chittor, Andhra Pradesh 517646
              </span>
            </address>
          </div>

          <ul className={clientstyle['footer-list']} data-reveal="bottom">
            <li>
              <p className={clientstyle['headline-sm'] + ' ' + clientstyle['footer-list-title']}>Services</p>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Conditions</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Listing</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>How It Works</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>What We Offer</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Latest News</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Contact Us</a>
            </li>
          </ul>

          <ul className={clientstyle['footer-list']} data-reveal="bottom">
            <li>
              <p className={clientstyle['headline-sm'] + ' ' + clientstyle['footer-list-title']}>Useful Links</p>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Conditions</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Terms of Use</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Our Services</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>Join as a Doctor</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>New Guests List</a>
            </li>
            <li>
              <a href="#" className={clientstyle['text'] + ' ' + clientstyle['footer-link']}>The Team List</a>
            </li>
          </ul>

          <div className={clientstyle['footer-list']} data-reveal="bottom">
            <p className={clientstyle['headline-sm'] + ' ' + clientstyle['footer-list-title']}>Subscribe</p>
            <form action="" className={clientstyle['footer-form']}>
              <input type="email" name="email" placeholder="Email" className={clientstyle['input-field'] + ' ' + clientstyle['title-lg']} />
              <button type="submit" className={clientstyle['btn'] + ' ' + clientstyle['has-before'] + ' ' + clientstyle['title-md']}>Subscribe</button>
            </form>
            <p className={clientstyle['text']}>
              Get the latest updates via email. Any time you may unsubscribe
            </p>
          </div>

        </div>

        <div className={clientstyle['footer-bottom']}>
          <p className={clientstyle['text'] + ' ' + clientstyle['copyright']}>
            &copy; Wellness Nexus 2024 | All Rights Reserved by Wellness Nexus
          </p>
          <ul className={clientstyle['social-list']}>
            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-google"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
            <li>
              <a href="#" className={clientstyle['social-link']}>
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
        
        </>
    )
}

export default Clientfooter;