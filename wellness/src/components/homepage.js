import { Link } from "react-router-dom";
import React from 'react';

function Homepage() {
  // Inline CSS styles
  const styles = {
    page: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the content
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
      backgroundImage: 'url("https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg")', // Add your background image URL here
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
      zIndex: -1
    },
    heading: {
      fontSize: '36px',
      fontWeight: 'bold',
      fontFamily: '"Lucida Handwriting", cursive', // Updated font
      textAlign: 'center',
      color: '#fff',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      marginTop: '20px'
    },
    
    quote: {
        fontSize: '28px',
        fontWeight: 'bold',
        fontStyle: 'italic', // Italic font style
        fontFamily: '"Lucida Handwriting", cursive',
        color: '#fff',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        position: 'absolute', // Added absolute positioning
        top: '10%', // Move quote to the top
        left: '50%', // Center the quote horizontally
        transform: 'translateX(-50%)', // Ensure it is perfectly centered horizontally
        marginBottom: '20px' // Space between the quote and heading
      },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center', // Center buttons
      gap: '20px',
      position: 'absolute',
      top: '60%', // Adjust top position for buttons
      transform: 'translateY(-50%)',
      zIndex: 1
    },
    button: {
      padding: '15px 30px',
      fontSize: '18px',
      backgroundColor: '#00bfae', // Prismarine color
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textDecoration: 'none',
      textAlign: 'center',
    },
    buttonHover: {
      backgroundColor: '#00a28f', // Darker prismarine shade for hover
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div style={styles.quote}>
        "Take care of your body. It's the only place you have to live."
      </div>
      <div style={styles.heading}>
        Welcome to Wellness Nexus
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.boxShadow = styles.buttonHover.boxShadow;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.boxShadow = styles.button.boxShadow;
          }}>
          Login
        </Link>

        <Link to="/register" style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.boxShadow = styles.buttonHover.boxShadow;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.boxShadow = styles.button.boxShadow;
          }}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
