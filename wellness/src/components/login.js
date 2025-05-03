import React, { useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import Showerror from './showerror';

function Login() {
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: ''
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Inline CSS styles
  const styles = {
    page: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      overflow: 'hidden'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1,
      filter: 'blur(8px)'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: -1
    },
    quote: {
      position: 'absolute',
      top: '10%',
      fontSize: '28px',
      fontWeight: 'bold',
      fontFamily: '"Lucida Handwriting"', // Updated to Lucida Handwriting
  fontStyle: 'italic', // Added font style for the quotation
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      color: '#fff',
      textAlign: 'center'
    },
    formContainer: {
      width: '400px',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      position: 'absolute',
      right: '12%',
      transform: 'translateY(-50%)',
      top: '50%',
      zIndex: 1,
      fontFamily: '"Arial", sans-serif' // Added font style for the container text
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontFamily: '"Verdana", sans-serif' // Custom font for heading
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#2a9d8f', // Prismarine color
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#127776', // Darker shade of Prismarine
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
    
    buttonHover: {
      backgroundColor: '#0056b3',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div style={styles.quote}>
        " Take care of your body. It's the only place you have to live."
      </div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login here</h2>
        <Form method="post" action="/login">
          <div>
            <label htmlFor="loginId" style={styles.label}>
              Login ID
            </label>
            <input
              type="text"
              id="loginId"
              name="loginId"
              value={credentials.loginId}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
           <div style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{color:"black",cursor:"pointer"}}><Link to={"/forgotpass"}>Forgot password?</Link></div>
          <div style={{color:"black",cursor:"pointer"}}><Link to={"/register"}>new user?</Link></div>

          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
              e.target.style.boxShadow = styles.button.boxShadow;
            }}
          >
            Login
          </button>
          <Showerror message={message} />
        </Form>
      </div>
    </div>
  );
}

export default Login;
