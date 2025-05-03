import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || "";
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
      return "Password must be alphanumeric with no spaces.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePassword();
    if (validationError) {
      setErrors(validationError);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/reset-password",
        { token, newPassword }
      );
      setMessage(response.data.message);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setErrors(error.response?.data?.message || "An error occurred.");
    }
  };

  // Inline CSS styles
  const styles = {
    page: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
      overflow: "hidden",
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage:
        'url("https://img.freepik.com/free-photo/close-up-doctor-with-copy-space_23-2148814244.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1,
      filter: "blur(8px)",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: -1,
    },
    quote: {
      position: "absolute",
      top: "10%",
      fontSize: "28px",
      fontWeight: "bold",
      fontFamily: '"Lucida Handwriting"',
      fontStyle: "italic",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
      color: "#fff",
      textAlign: "center",
    },
    formContainer: {
      width: "400px",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      position: "absolute",
      right: "12%",
      transform: "translateY(-50%)",
      top: "50%",
      zIndex: 1,
      fontFamily: '"Arial", sans-serif',
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontFamily: '"Verdana", sans-serif',
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
    },
    error: {
      color: "red",
      marginBottom: "10px",
      fontSize: "14px",
      textAlign: "center",
    },
    success: {
      color: "green",
      marginBottom: "10px",
      fontSize: "14px",
      textAlign: "center",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#2a9d8f",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#127776",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.background}></div>
      <div style={styles.overlay}></div>
      <div style={styles.quote}>
        "Reset your password and regain access."
      </div>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword" style={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <label htmlFor="confirmPassword" style={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          {errors && <p style={styles.error}>{errors}</p>}
          {message && <p style={styles.success}>{message}</p>}
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
