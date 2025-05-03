import React, { useState, useEffect } from 'react';
import { Form, useLocation } from 'react-router-dom';
import Showerror from './showerror';

function Register() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message') || '';

  const [credentials, setCredentials] = useState({
    loginId: '',
    password: '',
    username: '',
    age: ''
  });

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
      top: '5%',
      fontSize: '28px',
      fontWeight: 'bold',
      fontFamily: '"Lucida Handwriting"',
      fontStyle: 'italic',
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
      backgroundColor: '#2a9d8f',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#127776',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
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
        <h2 style={styles.heading}>Register here</h2>
        <Form method="post" action="/register">
          <div>
            <label htmlFor="loginId" style={styles.label}>
              Mail Id
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

          <div>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="age" style={styles.label}>
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={credentials.age}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <Showerror message={message} />

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
            Register
          </button>
        
        </Form>
        <p>Note:After clicking Register please check your mail to verify </p>
      </div>
    </div>
  );
}

export default Register;
