import React, { useState, useEffect } from 'react';
import { CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPagination, CPaginationItem } from '@coreui/react';
import axios from 'axios';

const ManageHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 40;
  const [totalPages, setTotalPages] = useState(1);

  // Fetch hospitals from the backend with pagination and search
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`https://prowellness-eight.vercel.app/api/admingethospitals`, {
          params: {
            page: currentPage,
            limit: hospitalsPerPage,
            search: searchTerm, // Pass search term to backend
          },
        });
        setHospitals(response.data.hospitals);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, [currentPage, searchTerm]);

  // Delete hospital by id (also updates the database)
  const handleDelete = async (hospitalId) => {
    try {
      await axios.post(`https://prowellness-eight.vercel.app/api/admindeletehospital/${hospitalId}`); // Delete hospital from database
      const updatedHospitals = hospitals.filter((hospital) => hospital._id !== hospitalId); // Update state after deletion
      setHospitals(updatedHospitals);
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
  };

  return (
    <div className="manage-hospitals">
      <h2 className="table-heading">Manage Hospitals</h2>
      <input
        style={{ height: '40px' }}
        type="text"
        placeholder="Search by hospital ID or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="form-control mb-3"
      />
      <CTable striped hover responsive className="hospital-table">
        <thead>
          <CTableRow>
            <CTableHeaderCell scope="col">Hospital Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Hospital ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </thead>
        <CTableBody>
          {hospitals.map((hospital) => (
            <CTableRow key={hospital._id}>
              <CTableDataCell>{hospital.nameOfHospital}</CTableDataCell>
              <CTableDataCell>{hospital._id}</CTableDataCell>
              <CTableDataCell>{hospital.email}</CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" size="sm" onClick={() => handleDelete(hospital._id)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Pagination */}
      <CPagination align="center">
        <CPaginationItem onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </CPaginationItem>
        <CPaginationItem onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default ManageHospitals;
