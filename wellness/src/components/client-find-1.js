import React from "react";
import clientstyle from "../assets/css/style.module.css"
function Clientfind1({onFindClick}){

  
  
  


    return (
    <>
    <div className={clientstyle['locationsub']}>
            <button className={clientstyle['btn'] + ' ' + clientstyle['has-before']} id="locationSubmitButton"  onClick={onFindClick}>
              <ion-icon name="search"></ion-icon>
              <span className={clientstyle['span'] + ' ' + clientstyle['title-md']}>Find Now</span>
            </button>
          </div>

       
    
    
    </>
    )
}


export default Clientfind1;