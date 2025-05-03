import React, { useEffect, useState } from 'react';
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CCardHeader } from '@coreui/react';
import { Line, Pie, Bar } from 'react-chartjs-2';  
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { jwtDecode } from 'jwt-decode';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const HospitalDashboard = () => {
  
  const [hospitalName, setHospitalName] = useState('');
  const [patientCount, setPatientCount] = useState(0);
  const [diagnosticCount, setDiagnosticCount] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueLabels, setRevenueLabels] = useState([]);
  const [diagnosticTestData, setDiagnosticTestData] = useState([]);
  const [diagnosticTestLabels, setDiagnosticTestLabels] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [bookingLabels, setBookingLabels] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
       
          const decoded = jwtDecode(token);
          const hospitalId = decoded.id;  
        const response = await fetch(`http://localhost:3001/api/hospital-dashboard?hospitalId=${hospitalId}`); 
        const data = await response.json();

        // Set state with the fetched data
        setHospitalName(data.hospitalName);
        setPatientCount(data.patientCount);
        setDiagnosticCount(data.diagnosticCount);
        setRevenueData(data.revenueData);
        setRevenueLabels(data.revenueLabels); 
        setDiagnosticTestData(data.diagnosticTestData);
        setDiagnosticTestLabels(data.diagnosticTestLabels); 
        setBookingData(data.bookingData);
        setBookingLabels(data.bookingLabels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  const lineChartData = {
    labels: revenueLabels, 
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        fill: false,
        backgroundColor: '#4a90e2',
        borderColor: '#4a90e2',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: diagnosticTestLabels, 
    datasets: [
      {
        data: diagnosticTestData,
        backgroundColor: [
          '#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7b8a8b', '#bdc3c7', '#9b59b6',
        ],
        hoverBackgroundColor: [
          '#357ABD', '#41B79D', '#D48923', '#D94568', '#5D6A6B', '#A5B2B5', '#82499E',
        ],
      },
    ],
  };

  const bookingChartData = {
    labels: bookingLabels, 
    datasets: [
      {
        label: 'Number of Bookings',
        data: bookingData,
        backgroundColor: '#4a90e2',
        borderColor: '#357ABD',
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Generated Over Time',
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Diagnostic Tests',
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookings Over Time',
      },
    },
  };

  return (
    <div className="dashboard-container" style={{ padding: '2rem' }}>
      <CRow className="g-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
       
        <CCol
          xs={12}
          md={6}
          style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#3498db', // Blue color
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center' }}>
              <h1>Welcome to your dashboard, </h1>
              <h1 style={{ marginBlockStart: "5rem", fontFamily: "sans-serif" }}>{hospitalName}</h1>
            </CCardBody>
          </CCard>
        </CCol>

    
        <CCol
          xs={6}
          md={3}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#e74c3c', // Red color
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center', fontSize: '22px' }}>
              <h1>Total Patients</h1>
              <h1 style={{ marginBlockStart: "5rem", fontSize: "4rem" }}>{patientCount}</h1>
            </CCardBody>
          </CCard>
        </CCol>

       
        <CCol
          xs={6}
          md={3}
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#2ecc71', // Green color
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center', fontSize: '22px' }}>
              <h1>Total Diagnostic Tests</h1>
              <h1 style={{ marginBlockStart: "5rem", fontSize: "4rem" }}>{diagnosticCount}</h1>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Line Graph for Revenue */}
      <CRow style={{ marginTop: '2rem' }}>
        <CCol sm={12}>
          <CCard
            style={{
              height: '400px', // Adjust height as needed
              borderRadius: '10px',
            }}
          >
            <CCardHeader>
              <h5>Revenue Trend</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '350px' }}>
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Pie Chart and Bar Chart Row */}
      <CRow style={{ marginTop: '2rem' }}>
        {/* Pie Chart: Top 6 Diagnostic Tests */}
        <CCol lg={6} sm={12}>
          <CCard
            style={{
              height: '400px',
              borderRadius: '10px',
            }}
          >
            <CCardHeader>
              <h5>Top Diagnostic Tests</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '350px' }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Bar Chart: Booking Data */}
        <CCol lg={6} sm={12}>
          <CCard
            style={{
              height: '400px',
              borderRadius: '10px',
            }}
          >
            <CCardHeader>
              <h5>Booking Trends</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '350px' }}>
                <Bar data={bookingChartData} options={barChartOptions} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default HospitalDashboard;
