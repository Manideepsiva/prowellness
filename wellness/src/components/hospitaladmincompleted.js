import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react';
import {jwtDecode} from 'jwt-decode';

const CompletedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchCompletedAppointments();
  }, []);

  const fetchCompletedAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const hospitalId = decoded.id;
      const response = await axios.get(
        `https://prowellness-liart.vercel.app/api/hospitalcompletedappointments?hospitalId=${hospitalId}`
      );
      setAppointments(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load completed appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleEditDocuments = (appointmentId) => {
    setSelectedAppointment(appointmentId); // Set the selected appointment for editing
  };

  const handleUpload = async (appointmentId) => {
    const fileInput = document.getElementById(`upload-${appointmentId}`);
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    
    // Rename the file with appointmentId prefix
    const filenameWithId = `${appointmentId}_${file.name}`;
    
    // Append the file with the new filename
    formData.append('file', new Blob([file], { type: file.type }), filenameWithId);

    try {
      // Send the file to the server
      await axios.post(`https://prowellness-liart.vercel.app/api/hospitalupload/${appointmentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');

      // Refetch appointments after successful upload
      fetchCompletedAppointments();
      setSelectedAppointment(null); // Reset after upload
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file');
    }
  };

  const renderDocument = (documentPath) => {
    return (
      <a href={`https://prowellness-liart.vercel.app/${documentPath}`} target="_blank" rel="noopener noreferrer">
        View Document
      </a>
    );
  };

  if (loading) return <div>Loading completed appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="12">
          {appointments.length === 0 ? (
            <p>No completed appointments found.</p>
          ) : (
            appointments.map((appointment, index) => (
              <CCard key={appointment._id} className={`mb-3 ${index % 2 === 0 ? 'bg-light' : 'bg-white'}`}>
                <CCardBody className="d-flex flex-column">
                  <h5>Type of Test: {appointment.testname}</h5>
                  <p>Patient Name: {appointment.patientName}</p>
                  <p>Phone: {appointment.phone}</p>
                  <p>Email: {appointment.email}</p>

                  {appointment.documentPath && (
                    <div className="mt-3">
                      <h6>Uploaded Document:</h6>
                      {renderDocument(appointment.documentPath)}
                    </div>
                  )}

                  {selectedAppointment === appointment._id ? (
                    <div className="mt-3">
                      <input type="file" id={`upload-${appointment._id}`}  className="form-control mb-2" />
                      <CButton color="success" className="mt-2" onClick={() => handleUpload(appointment._id)}>
                        Upload New Document
                      </CButton>
                    </div>
                  ) : (
                    <CButton
                      color="primary"
                      className="mt-2 align-self-start"
                      onClick={() => handleEditDocuments(appointment._id)}
                    >
                      Edit Documents
                    </CButton>
                  )}
                </CCardBody>
              </CCard>
            ))
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CompletedAppointments;
