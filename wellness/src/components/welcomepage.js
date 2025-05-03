import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    // Redirect based on the selected role
    if (role === 'client') {
      navigate('/client-dashboard');
    } else if (role === 'hospital-admin') {
      navigate('/hospital-admin-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Wellness Nexus</h1>
        <p>Choose your role to proceed:</p>
        <div className="role-buttons">
          <button onClick={() => handleSelection('client')}>Client</button>
          <button onClick={() => handleSelection('hospital-admin')}>Hospital Admin</button>
          <button onClick={() => handleSelection('admin')}>Admin</button>
        </div>
      </div>

      {/* CSS styles */}
      <style jsx>{`
        .welcome-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('https://www.swg.com/can/wp-content/uploads/sites/38/2019/04/Hospital-Case-Study-Banner-Daniel.png'); /* Replace with your image URL */
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
        }

        .welcome-content {
          background: rgba(0, 0, 0, 0.5); /* Adds a translucent black background for text visibility */
          padding: 30px;
          border-radius: 10px;
        }

        .welcome-content h1 {
          font-size: 3em;
          margin-bottom: 20px;
        }

        .welcome-content p {
          font-size: 1.2em;
          margin-bottom: 30px;
        }

        .role-buttons button {
          background-color: #ff8c00;
          border: none;
          padding: 10px 20px;
          margin: 10px;
          color: white;
          font-size: 1.1em;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .role-buttons button:hover {
          background-color: #e07b00;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
