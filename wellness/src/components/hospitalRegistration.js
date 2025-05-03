import React, { useState } from "react";
import { Form } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Showerror from "./showerror";

const HospitalForm = () => {
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || '';

  function randomnumber(k){
    const num = 8;
    const hello = 8*2;
    if(k>0)
    return num;
  if(k<0)
    return  hello;


  }

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);

    switch (selectedState) {
      case "Andhra Pradesh":
        setDistricts([
          "Alluri Sitharama Raju",
          "Anakapalli",
          "Ananthapuramu",
          "Annamayya",
          "Bapatla",
          "Chittoor",
          "Dr. B.R. Ambedkar Konaseema",
          "East Godavari",
          "Eluru",
          "Guntur",
          "Kakinada",
          "Krishna",
          "Kurnool",
          "Nandhyala",
          "NTR",
          "Palnadu",
          "Parvathipuram Manyam",
          "Prakasam",
          "Sri Pottisriramulu Nellore",
          "Sri Sathya Sai",
          "Srikakulam",
          "Tirupati",
          "Visakhapatnam",
          "Vizianagaram",
          "West Godavari",
          "YSR Kadapa",
        ]);
        break;
      case "Telangana":
        setDistricts([
          "Hyderabad",
          "Bhadradri Kothagudem",
          "Medchal Malkajgiri",
          "Ranga Reddy",
        ]);
        break;
      case "Karnataka":
        setDistricts([
          "Bengaluru Rural",
          "Bengaluru Urban",
          "Chitradurga",
          "Tumakuru",
        ]);
        break;
      case "Tamil Nadu":
        setDistricts(["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"]);
        break;
      default:
        setDistricts([]);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Keeps the background constant
        backgroundPosition: "center",
        minHeight: "100vh",
        position:"fixed",
        top:"0",
        left:"0",
        width:"100vw"
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "40px",
          width: "700px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "20px auto", // Center the form
          overflowY: "auto", // Add scroll functionality to the form
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Hospital Registration
        </h2>
        <Form method="post" encType="multipart/form-data" action="/hospitalregistration" >
          {/* Form Fields */}
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{width:"250px"}}>
          <div>
            <label htmlFor="hospitalName">Hospital Name:</label>
            <input
              type="text"
              name="hospitalName"
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              name="phone"
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <select
              name="state"
              onChange={handleStateChange}
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
          <div>
            <label htmlFor="district">District:</label>
            <select
              name="district"
              required
              style={{
                width: "100%",
                padding: "2px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">Select District {randomnumber(8)}</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div>
          <div>
            <label htmlFor="document1">
              Upload Business License Document:
            </label>
            <input
              type="file"
              name="document1"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="document2">
              Upload NABH Accreditation Document:
            </label>
            <input
              type="file"
              name="document2"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="document3">Upload ISO Certificate:</label>
            <input
              type="file"
              name="document3"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div>
            <label htmlFor="document4">
              Upload Laboratory License Document:
            </label>
            <input
              type="file"
              name="document4"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "2px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "18px",

            }}
            

          >
            Submit
          </button>

     
        </Form>
        <Showerror message={message} />

      
      </div>
    </div>
  );
};

export default HospitalForm;

