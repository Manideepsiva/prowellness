import React, { useState } from 'react';
import { Form, useLocation } from 'react-router-dom';
import Showerror from './showerror';
import { Link } from 'react-router-dom';

function Hospitallogin() {
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
      backgroundImage: 'url("https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg")', // Replace with your image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1,
      filter: 'blur(2px)'
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
      fontFamily: '"Arial", sans-serif'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontFamily: '"Verdana", sans-serif'
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
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    buttonHover: {
      backgroundColor: '#127776', // Darker shade of Prismarine
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Hospital Login</h2>
        <Form method="post" action="/hospitallogin">
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
          <div style={{color:"black",cursor:"pointer"}}><Link to={"/hospitalregistration"}>new user?</Link></div>

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

export default Hospitallogin;
