import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CCollapse,
  CRow,
} from '@coreui/react';

const ManageHospitalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/adminhospitalrequests');
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   

    fetchRequests();
  }, []);

  const toggleDocuments = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id
          ? { ...request, visible: !request.visible }
          : request
      )
    );
  };

  const handleAccept = async (request) => {
    try {
      const response = await fetch('http://localhost:3001/api/acceptHospitalRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalName: request.hospitalName,
          phone: request.phone,
          email: request.email,
          address: request.address,
          state: request.state,
          district: request.district,
          hosreqid:request._id
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      const result = await response.json();
      console.log('Request accepted:', result);
      fetchRequests();
      // Optionally: Remove the accepted request from the UI or update the requests state
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };



  const handleReject = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/api/rejectHospitalRequest", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
         id
          }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject request');
      }

      const result = await response.json();
      console.log('Request rejected:', result);
      fetchRequests(); 
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="manage-hospital-requests" style={{ flexGrow: 1, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', fontFamily: 'Georgia, serif' }}>Hospital Requests</h2>
      <CRow>
        {requests.map((request) => (
          <CCol key={request._id} xs={12} className="mb-4">
            <CCard style={{ width: '100%', border: '1px solid #ccc', borderRadius: '8px' }}>
              <CCardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
                <h5 style={{ margin: '0' }}>{request.hospitalName}</h5>
                <CButton
                  color={request.visible ? 'warning' : 'primary'}
                  size="sm"
                  onClick={() => toggleDocuments(request._id)}
                  style={{ marginLeft: 'auto' }}
                >
                  {request.visible ? 'Hide Documents' : 'View Documents'}
                </CButton>
              </CCardHeader>
              <CCardBody>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Phone:</strong> {request.phone}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Address:</strong> {request.address}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Email:</strong> {request.email}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>State:</strong> {request.state}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>District:</strong> {request.district}</p>
                <CCollapse visible={request.visible}>
                  <div className="documents-list">
                    <h6 style={{ margin: '10px 0', fontSize: '16px' }}>Documents:</h6>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                      {request.document1 && (
                        <li style={{ marginBottom: '5px' }}>
                          <a href={`http://localhost:3001/${request.document1}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007bff' }}>
                            Business License
                          </a>
                        </li>
                      )}
                      {request.document2 && (
                        <li style={{ marginBottom: '5px' }}>
                          <a href={`http://localhost:3001/${request.document2}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007bff' }}>
                            NABH Accreditation
                          </a>
                        </li>
                      )}
                      {request.document3 && (
                        <li style={{ marginBottom: '5px' }}>
                          <a href={`http://localhost:3001/${request.document3}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007bff' }}>
                            ISO Certificate
                          </a>
                        </li>
                      )}
                      {request.document4 && (
                        <li style={{ marginBottom: '5px' }}>
                          <a href={`http://localhost:3001/${request.document4}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007bff' }}>
                            Laboratory License
                          </a>
                        </li>
                      )}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                      <CButton color="success" style={{ marginRight: '5px' }} onClick={() => handleAccept(request)}>
                        Accept
                      </CButton>
                      <CButton color="danger" onClick={() =>handleReject(request._id)}>
                        Reject
                      </CButton>
                    </div>
                  </div>
                </CCollapse>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default ManageHospitalRequests;
