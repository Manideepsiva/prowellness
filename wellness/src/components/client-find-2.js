import React from "react";
import clientstyle from "../assets/css/style.module.css"
function Clientfind2({ onFindClick }){
    return (
    <>
          <div className={clientstyle['treatsub']}>
            <button className={clientstyle['btn'] + ' ' + clientstyle['has-before']} id="treatmentSubmitButton" onClick={onFindClick}>
              <ion-icon name="search"></ion-icon>
              <span className={clientstyle['span'] + ' ' + clientstyle['title-md']}>Find Now</span>
            </button>
          </div>
    
    
    </>
    )
}


export default Clientfind2