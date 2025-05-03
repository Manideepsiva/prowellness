import React, { useState, useEffect } from 'react';
import appdashstyle from "../assets/css/appdash.module.css";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ClientAppointmentDash() {
    const [appointments, setAppointments] = useState([]);
    const [activeAppointment, setActiveAppointment] = useState(null); // To track which appointment is expanded
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    useEffect(() => {
        // Fetch appointments from the backend
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                  const decoded = jwtDecode(token);
                  const id = decoded.id;
                const response =await fetch('http://localhost:3001/api/clientupcomingappointments', {
                    method: 'POST', // Set the method to POST
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify({ id }), // Include the user ID in the request body
                });
         // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                console.log(data)
                // Assuming your backend returns an array of appointments with 'date', 'hospitalName', etc.
                const appointmentsWithDate = data.map(appointment => ({
                    ...appointment,
                    date: new Date(appointment.appointmentDate), // Ensure the 'date' is a JavaScript Date object
                }));
                setAppointments(appointmentsWithDate);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchAppointments();
    }, []);

    // Group appointments by month and year
    const groupAppointmentsByMonthYear = (appointments) => {
        return appointments.reduce((acc, appointment) => {
            const monthYear = `${appointment.date.getMonth() + 1}-${appointment.date.getFullYear()}`;
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(appointment);
            return acc;
        }, {});
    };

    const groupedAppointments = groupAppointmentsByMonthYear(appointments);

    // Function to handle toggle click
    const handleToggle = (appointmentId) => {
        setActiveAppointment(activeAppointment === appointmentId ? null : appointmentId); // Toggle the active appointment
    };

    if (loading) return <div>Loading appointments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <nav className={appdashstyle.appnavbar}>
                <ul>
                    <li className={appdashstyle['active-bar']} id="upcomingapp">
                        <a href="#" style={{ fontSize: "2rem" }}><Link to = "/authpage/appointmentsdashboard/upcoming"><pre style={{ fontSize: "1.3rem" }}>Upcoming Appointments</pre></Link></a>
                    </li>
                    <li><a href="#" style={{ fontSize: "1.5rem" }} id="completedapp"><Link to = "/authpage/appointmentsdashboard/completed" ><pre style={{ fontSize: "1.3rem" }}>Completed Appointments</pre></Link></a></li>
                    <li><a href="#" style={{ fontSize: "1.5rem" }} id="todayapp"><Link to = "/authpage/appointmentsdashboard/today"><pre style={{ fontSize: "1.3rem" }}>Today Appointments</pre></Link></a></li>
                    
                </ul>
            </nav>

            <div className={appdashstyle.wrapper}>
                {Object.keys(groupedAppointments).map(monthYear => {
                    const [month, year] = monthYear.split('-');
                    const appointmentsForMonthYear = groupedAppointments[monthYear];

                    return (
                        <div key={monthYear}>
                            <h4>{`${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`}</h4>
                            <div className={appdashstyle.section}>
                                {appointmentsForMonthYear.map(appointment => (
                                    <div key={appointment.id} className={appdashstyle['section-card']}>
                                        <div className={appdashstyle['section-data']}>
                                            <div style={{ marginBlock: 'auto', borderRight: '1px solid', paddingRight: '2rem' }}>
                                                <div className={appdashstyle['data-tim']}>
                                                    <p style={{ fontSize: 'large' }}>{appointment.date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                                    <h2>{appointment.date.getDate()}</h2>
                                                </div>
                                            </div>

                                            <div className={appdashstyle['card-time-data']}>
                                                <p><i className="fa-solid fa-clock"></i>
                                                    <span style={{ paddingInlineStart: '1rem', display: "inline" }}>
                                                        {appointment.slot}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className={appdashstyle['card-app-tit']}>
                                                <div>
                                                    <p style={{ fontFamily: "serif" }}>Hospital Name:</p>
                                                    <p style={{ marginLeft: '10px', fontFamily: 'serif' }}>{appointment.nameOfHospital}</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontFamily: "serif" }}>Hospital Address:</p>
                                                    <p style={{ marginLeft: '10px', fontFamily: 'serif' ,fontSize:"1.4rem"}}>{appointment.address}</p>
                                                </div>
                                            </div>

                                            <button
                                                className={appdashstyle.collapsible}
                                                onClick={() => handleToggle(appointment.id)}
                                            >
                                                Toggle <i className="fa-solid fa-angle-down" style={{ display: 'inline', fontSize: 'small' }}></i>
                                            </button>
                                        </div>

                                        <div
                                            className={appdashstyle['service-collapse-content']}
                                            style={{
                                                maxHeight: activeAppointment === appointment.id ? '300px' : '0',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.3s ease'
                                            }}
                                        >
                                            <div className={appdashstyle['show-cont']}>
                                                <p><pre>Test name         : {appointment.testname}</pre></p>
                                                <p><pre>Booked date       : {new Date(appointment.bookedDate).toDateString()}</pre></p>
                                                <p><pre>Appointment date  : {appointment.date.toDateString()}</pre></p>
                                                <div className={appdashstyle['show-cont-but']}>
                                                   
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ClientAppointmentDash;
