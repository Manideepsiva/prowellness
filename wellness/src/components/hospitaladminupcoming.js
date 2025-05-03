import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardTitle, CRow, CCol, CButton } from '@coreui/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Hospitaladminupcoming = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (hospitalId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/hospitalUpcoming?hospitalId=${hospitalId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const hospitalId = decoded.id; 
      fetchAppointments(hospitalId);
    }
  }, []);


  const handleCancelAppointment = async (appointment) => {
    const confirmation = window.confirm(`Are you sure you want to cancel the appointment for ${appointment.patientName}?`);

    if (confirmation) {
      try {
        const response = await axios.post('http://localhost:3001/api/hospitalcancel', {
          appointmentId: appointment._id 
        });

        console.log(response.data.message); 
        
      
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const hospitalId = decoded.id;
          fetchAppointments(hospitalId); 
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  return (
    <div className="hospital-content p-4">
      <CRow>
        {appointments.length === 0 ? ( // Check if appointments array is empty
          <CCol>
            <h4>No appointments booked in the future.</h4>
          </CCol>
        ) : (
          appointments.map((appointment, index) => (
            <CCol sm="6" lg="6" key={index} className="mb-4">
              <CCard>
                <CCardBody className="d-flex flex-column justify-content-between">
                  <div>
                    <CCardTitle>{appointment.testname}</CCardTitle>
                    <p><strong>Appointment Date:</strong> {formatDate(appointment.appointmentDate)}</p>
                    <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                    <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                    <p><strong>Patient Phone:</strong> {appointment.phone}</p>
                    <p><strong>Patient Email:</strong> {appointment.email}</p>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <CButton color="danger" onClick={() => handleCancelAppointment(appointment)}>
                      Cancel Appointment
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))
        )}
      </CRow>
    </div>
  );
};

export default Hospitaladminupcoming;
