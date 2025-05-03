import React, { useState, useEffect } from 'react';
import { CRow, CCol, CCard, CCardBody } from '@coreui/react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Hospitalavailableseetests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableTests = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const hospitalId = decoded.id;

                const response = await axios.get(`http://localhost:3001/api/hospitalseeavilable?hospitalId=${hospitalId}`);
                
             
                const testData = Object.entries(response.data).map(([testName, price]) => ({ testName, price }));
                setTests(testData); 
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to load available tests');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailableTests();
    }, []);

    if (loading) return <div>Loading available tests...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1 className='mb-5'>My Available Diagnostic Tests</h1>
            <CRow>
                {tests.map(({ testName, price }, index) => (
                    <CCol md="4" key={index} className="mb-4">
                        <CCard
                            className="h-100"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100px', 
                                overflow: 'hidden',
                            }}
                        >
                            <CCardBody
                                style={{
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                                title={testName} 
                            >
                                <div
                                    style={{
                                        display: 'inline-block',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.overflow = 'auto';
                                        e.currentTarget.style.whiteSpace = 'normal';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.overflow = 'hidden';
                                        e.currentTarget.style.whiteSpace = 'nowrap';
                                    }}
                                >
                                    {testName} - ₹{price} {/* Display test name and price */}
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ))}
            </CRow>
        </>
    );
};

export default Hospitalavailableseetests;
