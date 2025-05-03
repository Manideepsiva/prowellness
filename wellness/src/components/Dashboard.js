import React from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const Dashboard = () => {
  // Mock data for the charts
  const hospitalcount = 698;
  const patientCount = 48;
  const diagnosticCount = 876;

  const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenueData = [10000, 15000, 12000, 18000, 20000, 25000];

  const diagnosticTestLabels = ["Allergy Panel 7 Drugs", "Blood Test", "Haptoglobin Test", "Insulin Serum Test", "Zinc, Serum Test", "Urine 24H Test"];
  const diagnosticTestData = [25, 50, 20, 10, 15, 30];

  const bookingLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const bookingData = [100, 150, 120, 130];

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
          '#4a90e2', '#50e3c2', '#f5a623', '#e94e77', '#7b8a8b', '#bdc3c7',
        ],
        hoverBackgroundColor: [
          '#357ABD', '#41B79D', '#D48923', '#D94568', '#5D6A6B', '#A5B2B5',
        ],
      },
    ],
  };

  const barChartData = {
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

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Revenue Generated Over Time' },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Top Diagnostic Tests' },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Bookings Over last 4 weeks' },
    },
  };

  return (
    <div className="dashboard-container" style={{ padding: '2rem' }}>
      <CRow className="g-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CCol xs={12} md={4}>
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center' }}>
              <h1>Total Number of Hospitals</h1>
              <h1 style={{ marginBlockStart: '5rem', fontSize: '4rem' }}>{hospitalcount}</h1>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6} md={4}>
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center', fontSize: '22px' }}>
              <h1>Total users</h1>
              <h1 style={{ marginBlockStart: '5rem', fontSize: '4rem' }}>{patientCount}</h1>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6} md={4}>
          <CCard
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#2ecc71',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CCardBody style={{ textAlign: 'center', fontSize: '22px' }}>
              <h1>Total Diagnostic Tests</h1>
              <h1 style={{ marginBlockStart: '5rem', fontSize: '4rem' }}>{diagnosticCount}</h1>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Line Chart */}
      <CRow style={{ marginTop: '2rem' }}>
        <CCol sm={12}>
          <CCard style={{ height: '400px', borderRadius: '10px' }}>
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

      {/* Pie Chart and Bar Chart */}
      <CRow style={{ marginTop: '2rem' }}>
        <CCol lg={6} sm={12}>
          <CCard style={{ height: '400px', borderRadius: '10px' }}>
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
        <CCol lg={6} sm={12}>
          <CCard style={{ height: '400px', borderRadius: '10px' }}>
            <CCardHeader>
              <h5>Booking Trends</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{ height: '350px' }}>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;
