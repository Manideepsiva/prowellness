import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CRow, CCol, CCard, CCardBody, CCardTitle, CFormSelect } from '@coreui/react';
import axios from 'axios';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('1');
  const [noAppointments, setNoAppointments] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(`https://prowellness-liart.vercel.app/api/adminmanageappointments?email=${searchTerm}&status=${statusFilter}`);
      setAppointments(response.data);
      setNoAppointments(response.data.length === 0);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setNoAppointments(true);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      console.log("Cancelled appointment ID:", appointmentId);
      await axios.get(`https://prowellness-liart.vercel.app/api/admincancelappointment?appointmentId=${appointmentId}`);

      const response = await axios.get(`https://prowellness-liart.vercel.app/api/adminmanageappointments?email=${searchTerm}&status=${statusFilter}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <div className="manage-appointments">
      <h2 className="table-heading">Manage Appointments</h2>

      {/* Search Input and Dropdown */}
      <CForm className="mb-4 d-flex">
        <CFormInput
          style={{ height: '40px', marginRight: '10px' }}
          type="text"
          placeholder="Search by user email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CFormSelect
          style={{ height: '40px', marginRight: '10px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="1">Upcoming</option>
          <option value="2">Ongoing</option>
          <option value="3">Completed</option>
          <option value="4">Cancelled</option> {/* New Cancelled Status */}
        </CFormSelect>
        <CButton color="primary" onClick={handleSearch}>Search</CButton>
      </CForm>

      {/* Appointments Grid */}
      {noAppointments ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: 'red' }}>No appointments found</p>
      ) : (
        <CRow className="g-4">
          {appointments.map((appointment) => (
            <CCol key={appointment._id} xs={12} sm={6} md={4} lg={3}>
              <CCard>
                <CCardBody>
                  <CCardTitle>{appointment.testName}</CCardTitle>
                  <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                  <p><strong>Phone:</strong> {appointment.phone}</p>
                  <p><strong>Email:</strong> {appointment.email}</p>
                  <p><strong>Test Name:</strong> {appointment.testname}</p>
                  <p><strong>Hospital Name:</strong> {appointment.hospitalname}</p>
                  <p><strong>Price:</strong> {appointment.testprice}</p>
                 

                  {statusFilter === "1" && (
                    <CButton color="danger" onClick={() => handleCancelAppointment(appointment._id)}>Cancel Appointment</CButton>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      )}
    </div>
  );
};

export default ManageAppointments;
