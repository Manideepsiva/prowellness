import React from "react";

import Clientfooter from "./client-footer";
import clientstyle from "../assets/css/style.module.css"
import hairfall from "../assets/images/clientpics/Hair-Fall-Package.jpg"
import hellot from "../assets/images/clientpics/heelot.png"
import images from './importimag'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Clientdashcont(){
  const navigate = useNavigate();
 

  
    return(

        <>


     
      



<section className={clientstyle['service']} aria-label="service">
  <div className={clientstyle['container']}>
    <ul className={clientstyle['service-list']}>
      <li className={clientstyle['full-width-item']}>
        <h2>Find Tests By Organs</h2>
      </li>

      <li>
        <div className={`${clientstyle['service-card']} ${clientstyle['add-border']}`} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["brain-1.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Brain</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=0')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
            
          
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["lungs-2.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Lungs</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry"  onClick={()=>navigate('/authpage/searchbyorgans?id=1')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["liver-1.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Liver</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=2')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["kidney-1.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Kidney</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=3')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["heart-1.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Heart</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=4')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["bone.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Bone</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=5')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["spinal-cord.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Spinal-cord</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=6')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["small-intestine.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">small-intestine</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=7')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src=  {images["thyroid.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Thyroid</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=8')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>

      <li>
        <div className={clientstyle['service-card']} data-reveal="bottom">
          <div className={clientstyle['card-icon']}>
            <img src= {images["thymus-gland.png"]} width="71" height="71" loading="lazy" alt="icon" />
          </div>
          <h3 className={clientstyle['headline-sm']} style={{ fontSize: '1.5rem' }}>
            <a href="#">Thymus-gland</a>
          </h3>
          <br />
          <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry" onClick={()=>navigate('/authpage/searchbyorgans?id=9')}>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </li>
    </ul>
  </div>
</section>






<section className={`${clientstyle['section']} ${clientstyle['about']}`} aria-labelledby="about-label">
      <div className={clientstyle['container']}>

        <div className={clientstyle['about-content']}>

          <p className={`${clientstyle['section-subtitle']} ${clientstyle['title-lg']} ${clientstyle['has-after']}`} id="about-label" data-reveal="left">
            About Us
          </p>

         

          <p className={clientstyle['section-text']} data-reveal="left">
            Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus dapibus est. Aliquam
          </p>

          <ul className={clientstyle['tab-list']} data-reveal="left">

            <li>
              <button className={`${clientstyle['tab-btn']} ${clientstyle['active']}`}>Vision</button>
            </li>

            <li>
              <button className={clientstyle['tab-btn']}>Mission</button>
            </li>

            <li>
              <button className={clientstyle['tab-btn']}>Strategy</button>
            </li>

          </ul>

          <p className={clientstyle['tab-text']} data-reveal="left">
            Aliquam faucibus, odio nec commodo aliquam, neque felis placerat dui, a porta ante lectus dapibus est. Aliquam a bibendum mi, sed condimentum
          </p>

          <div className={clientstyle['wrapper']}>

            <ul className={clientstyle['about-list']}>

              <li className={clientstyle['about-item']} data-reveal="left">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span className={clientstyle['span']}>Sonsectetur adipisicing elit</span>
              </li>

              <li className={clientstyle['about-item']} data-reveal="left">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span className={clientstyle['span']}>Exercitation ullamco laboris</span>
              </li>

              <li className={clientstyle['about-item']} data-reveal="left">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span className={clientstyle['span']}>Eiusmod tempor incididunt</span>
              </li>

              <li className={clientstyle['about-item']} data-reveal="left">
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span className={clientstyle['span']}>Aolore magna aliqua</span>
              </li>

            </ul>

          </div>

        </div>

        <figure className={clientstyle['about-banner']} data-reveal="right">
          <img src= {`${hellot}`} width="400" height="300" loading="lazy" alt="about banner" className={clientstyle['w-10']} />
        </figure>

      </div>
    </section>





    <section className={`${clientstyle['section']} ${clientstyle['listing']}`} aria-labelledby="listing-label">
      <div className={clientstyle['container']}>

        <ul className={clientstyle['grid-list']}>

          <li>
            <h2 className={clientstyle['headline-md']} data-reveal="left">Most Popular Tests</h2>
          </li>

          <li>
            <div className={clientstyle['listing-card']} data-reveal="bottom">
              <div className={clientstyle['card-icon']}>
                <img src={images["Blood-Cells-300x300.jpg"]} width="71" height="71" loading="lazy" alt="icon" />
              </div>
              <div>
                <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`}>Allergy Panel 7 Drugs</h3>
                <p className={clientstyle['card-text']}>given information about how uoy doings iubd soud osdb isudb s d</p>
                <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry">
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className={clientstyle['listing-card']} data-reveal="bottom">
              <div className={clientstyle['card-icon']}>
                <img src={images["antibody-300x300.jpg"]} width="71" height="71" loading="lazy" alt="icon" />
              </div>
              <div>
                <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`}>Haptoglobin Test</h3>
                <p className={clientstyle['card-text']}>given information about how uoy doings iubd soud osdb isudb s d</p>
                <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry">
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className={clientstyle['listing-card']} data-reveal="bottom">
              <div className={clientstyle['card-icon']}>
                <img src= {images["Insulin-Random-Serum-300x300.jpg"]} width="71" height="71" loading="lazy" alt="icon" />
              </div>
              <div>
                <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`}>Insulin Serum Test</h3>
                <p className={clientstyle['card-text']}>given information about how uoy doings iubd soud osdb isudb s d</p>
                <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry">
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className={clientstyle['listing-card']} data-reveal="bottom">
              <div className={clientstyle['card-icon']}>
                <img src={images["liver-300x300.jpg"]} width="71" height="71" loading="lazy" alt="icon" />
              </div>
              <div>
                <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`}>Zinc, Serum Test</h3>
                <p className={clientstyle['card-text']}>given information about how uoy doings iubd soud osdb isudb s d</p>
                <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry">
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>
          </li>

          <li>
            <div className={clientstyle['listing-card']} data-reveal="bottom">
              <div className={clientstyle['card-icon']}>
                <img src= {images["kidney-3-300x300.jpg"]} width="71" height="71" loading="lazy" alt="icon" />
              </div>
              <div>
                <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`}>Urea, Urine 24H Test</h3>
                <p className={clientstyle['card-text']}>given information about how uoy doings iubd soud osdb isudb s d</p>
                <button className={clientstyle['btn-circle']} aria-label="read more about psychiatry">
                  <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
                </button>
              </div>
            </div>
          </li>

        </ul>

      </div>
    </section>




    







    <section className= {`${clientstyle['section']} ${clientstyle['blog']}`}
    aria-labelledby="blog-label">
      <div className={clientstyle['container']}>

        <p className={`${clientstyle['section-subtitle']} ${clientstyle['title-lg']} ${clientstyle['text-center']}`} id="blog-label" data-reveal="bottom">
          News & Article
        </p>

        <h2 className={`${clientstyle['section-title']} ${clientstyle['headline-md']} ${clientstyle['text-center']}`} data-reveal="bottom">
          Latest Diagnostic Health Tests
        </h2>

        <ul className={clientstyle['grid-list']}>
          <li>
            <div className={`${clientstyle['blog-card']} ${clientstyle['has-before']} ${clientstyle['has-after']}`} data-reveal="bottom">
            <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`} style={{ marginLeft: '15px', marginTop: '8px' }}>
            Troponin-I Test  Test
</h3>

              <p className={clientstyle['card-text']}>
              This test measures the level of troponin I in the blood, which helps diagnose heart muscle damage, particularly in patients with suspected heart attacks.
              </p>

              <button className={clientstyle['btn-circle']} style={{ marginTop: '1rem' }} aria-label="read more about psychiatry">
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </div>  
          </li>

          <li>
            <div className={`${clientstyle['blog-card']} ${clientstyle['has-before']} ${clientstyle['has-after']}`} data-reveal="bottom">
              
          <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`} style={{ marginLeft: '15px', marginTop: '8px' }}>
          Troponin-T Quantitative
</h3>


              <p className={clientstyle['card-text']}>
              This test quantifies the level of troponin T in the blood, which is a biomarker for heart injury and is used to assess heart attacks and other cardiovascular conditions.
              </p>

              <button className={clientstyle['btn-circle']} style={{ marginTop: '1rem' }} aria-label="read more about psychiatry">
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </div>
          </li>

          <li>
            <div className={`${clientstyle['blog-card']} ${clientstyle['has-before']} ${clientstyle['has-after']}`} data-reveal="bottom">
            <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`} style={{ marginLeft: '15px', marginTop: '8px' }}>
            Troponin-T Test
</h3>

              <p className={clientstyle['card-text']}>
              A blood test to measure troponin T levels, commonly used to detect damage to the heart muscle, such as in the case of a myocardial infarction (heart attack).
              </p>

              <button className={clientstyle['btn-circle']} style={{ marginTop: '1rem' }} aria-label="read more about psychiatry">
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </div>
          </li>

          <li>
            <div className={`${clientstyle['blog-card']} ${clientstyle['has-before']} ${clientstyle['has-after']}`} data-reveal="bottom">
            <h3 className={`${clientstyle['headline-sm']} ${clientstyle['card-title']}`} style={{ marginLeft: '15px', marginTop: '8px' }}>
            ECLIA Serum
</h3>

              <p className={clientstyle['card-text']}>
              This test measures the level of thyroid-stimulating hormone (TSH) in the blood, indicator of thyroid function, helping diagnose hypothyism or hyperthyroidism.
              </p>

              <button className={clientstyle['btn-circle']} style={{ marginTop: '1rem' }} aria-label="read more about psychiatry">
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </div>
          </li>
        </ul>

      </div>
    </section>

    




        
        
        
        
        </>
    )


}



export default Clientdashcont;
