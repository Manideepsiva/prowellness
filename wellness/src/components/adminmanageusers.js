import React, { useState, useEffect } from 'react';
import {
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react';
import axios from 'axios'; // Axios for API requests

const ManageClients = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://prowellness-liart.vercel.app/api/admingetusers'); // Fetch users from API
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user by id (also updates the database)
  const handleDelete = async (userId) => {
    try {
      await axios.post(`https://prowellness-liart.vercel.app/api/admindeleteuser/${userId}`); // Delete user from API
      const updatedUsers = users.filter((user) => user._id !== userId); // Update state after deletion
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.usermail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-clients">
      <h2 className="table-heading">Manage Clients</h2>

      {/* Search Input */}
      <CForm className="mb-4">
        <CFormInput
          style={{ height: '40px' }}
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CForm>

      {/* Users Table */}
      <CTable striped hover responsive className="user-table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Age</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredUsers.map((user) => (
            <CTableRow key={user._id}>
              <CTableDataCell>{user.username}</CTableDataCell>
              <CTableDataCell>{user.age}</CTableDataCell>
              <CTableDataCell>{user.usermail}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default ManageClients;
