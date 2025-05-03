import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Hospitalonging = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodayAppointments = async () => {
    const token = localStorage.getItem('token');
const decoded = jwtDecode(token);
const hospitalId = decoded.id;

  try {
    const response = await axios.get(`https://prowellness-eight.vercel.app/api/hospitaltodayappointments?hospitalId=${hospitalId}`);
    setPatients(response.data);
    console.log(response.data);
  } catch (error) {
    setError(error.response?.data?.message || 'Something went wrong while fetching appointments');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  

    fetchTodayAppointments();
  }, []);

  const handleSamplesTaken = async (appointmentId) => {
    try {
      await axios.post(`https://prowellness-eight.vercel.app/api/hospitalupdatepatientstatus/${appointmentId}`);
     fetchTodayAppointments();
    } catch (error) {
      console.error('Error updating patient status:', error);
    }
  };



  const handleFileUpload = async (appointmentId) => {
    const fileInput = document.getElementById(`upload-${appointmentId}`);
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    const formData = new FormData();

    const filenameWithId = `${appointmentId}_${file.name}`;
        
        // Append the file with the new filename
        formData.append('file', new Blob([file], { type: file.type }), filenameWithId);


    try {
        const response = await axios.post(`https://prowellness-eight.vercel.app/api/hospitalupload/${appointmentId}`, formData);
        alert(response.data.message);
        fetchTodayAppointments();
        
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('File upload failed: ' + (error.response?.data?.message || error.message));
    }
};




  const getBoxStyle = (index) => {
    return {
      backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#e6f7e6',  // Alternate between colors
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
    };
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
    {patients.length === 0 ? (
      <p>No appointments found for today.</p>
    ) : (
      patients
        .filter((patient) => patient.patientstatus !== 3 && patient.cancelled !== 1)  // Exclude status 3 and cancelled 1
        .map((patient, index) => (
          <div style={getBoxStyle(index)} key={patient._id}>
            <p><strong>Type of Test:</strong> {patient.testname}</p>
            <p><strong>Patient Name:</strong> {patient.patientName}</p>
            <p><strong>Patient Phone:</strong> {patient.phone}</p>
            <p><strong>Patient Email:</strong> {patient.email}</p>
          

            {/* Conditionally render based on patientstatus */}
            {patient.patientstatus === 1 ? (
              <button className="btn btn-primary mt-2"  onClick={() => handleSamplesTaken(patient._id)}>Samples Taken</button>
            ) : patient.patientstatus === 2 ? (
                <div className="status-box mt-3">
                    <label htmlFor={`upload-${patient._id}`} className="form-label">Upload Documents:</label>
                    <input
                        type="file"
                        className="form-control mb-2"
                        id={`upload-${patient._id}`}
                        name={`upload-${patient._id}`}
                    />
                    <button className="btn btn-success" onClick={() => handleFileUpload(patient._id)}>Send</button>
                </div>
            ) : null}
          </div>
        ))
    )}
  </div>
  );
};

export default Hospitalonging;
