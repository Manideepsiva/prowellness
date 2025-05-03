import React from "react";
import clientstyle from "../assets/css/style.module.css"
import { Link } from "react-router-dom";
import images from "./importimag";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [errormsg,setErrormsg] =  useState('');
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(newPassword) || /\s/.test(newPassword)) {
      setErrormsg("invalid password format")
    }
   else{
    const token = localStorage.getItem('token');
        
    const decoded = jwtDecode(token);
    const userid = decoded.id;
    const response = await fetch(`http://localhost:3001/api/changepassword/${userid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include JWT token
      },
      body: JSON.stringify({
        oldpassword:oldPassword,
        newpassword:newPassword,
      }),
    });

   

    if(response.ok){
      console.log("this is good")
      setErrormsg("");
      setOldPassword(""); // Clear fields
      setNewPassword("");
      return navigate("/logout");

    }

    else{
      console.log("this is good 2")

      setErrormsg("incorrect old password");
    }
   }
  };

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const decoded = jwtDecode(token);
        const userid = decoded.id;
        const response = await fetch(`http://localhost:3001/api/getprofile/${userid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch profile details");
        }
        const data = await response.json();
        console.log(data)
        setProfile(data); // Set the profile data in state
      } catch (err) {
       console.log("some error")
      } 
    };

    fetchProfile();
  }, []); // Empty dependency array means it runs once when the component mounts



  return (
    <div className={clientstyle["profile-card"]}>
      <h3>Your Profile :</h3>
      <p>
        <strong>Name:</strong> {profile?.username}
      </p>
      <p>
        <strong>Age:</strong> {profile?.age}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
        <div>{errormsg}</div>
      </form>
    </div>
  );
}




function Clientnav(){
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const toggleProfile = () => {
    setIsProfileVisible((prev) => !prev);
  };



    return (
        <>

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
              <a href="/dashboard" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to = {'/authpage'}>Home</Link></a>
            </li>

            <li className={clientstyle['navbar-item']}>
              <a href="/dashboard/upcomingapplist" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to={"/authpage/appointmentsdashboard/upcoming"}>Appointments</Link></a>
            </li>

            <li className={clientstyle['navbar-item']}>
             <button  onClick={toggleProfile}> <a href="#" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}>
          Profile</a>
        </button>
            </li>

           

            <li className={clientstyle['navbar-item']}>
              <a href="#" className={`${clientstyle['navbar-link']} ${clientstyle['title-md']}`}><Link to={"/logout"}>logout</Link></a>
            </li>

            {isProfileVisible && <ProfileCard />}

           
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

        </>
    )
}


export default Clientnav;