import React, { useState, useEffect } from 'react';
import appdashstyle from "../assets/css/appdash.module.css";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ClientAppointmentDashtoday() {
    const [appointments, setAppointments] = useState([]);
    const [expandedAppointments, setExpandedAppointments] = useState(new Set()); // To track expanded appointments
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track any errors

    useEffect(() => {
        // Function to fetch today's appointments from the server
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const id = decoded.id;
                const response = await fetch(`https://prowellness-eight.vercel.app/api/clienttodayappoints/${id}`); // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Function to handle toggle click
    const handleToggle = (appointmentId) => {
        setExpandedAppointments(prev => {
            const updatedSet = new Set(prev);
            if (updatedSet.has(appointmentId)) {
                updatedSet.delete(appointmentId); // Collapse the appointment
            } else {
                updatedSet.add(appointmentId); // Expand the appointment
            }
            return updatedSet; // Update the state
        });
    };

    if (loading) {
        return <p>Loading appointments...</p>; // Show loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error message
    }

    return (
        <>
            <nav className={appdashstyle.appnavbar}>
                <ul>
                <li  id="upcomingapp">
                        <a href="#" style={{ fontSize: "1.5rem" }}><Link to = "/authpage/appointmentsdashboard/upcoming"><pre style={{ fontSize: "1.3rem" }}>Upcoming Appointments</pre></Link></a>
                    </li>
                    <li><a href="#" style={{ fontSize: "1.5rem" }} id="completedapp"><Link to = "/authpage/appointmentsdashboard/completed" ><pre style={{ fontSize: "1.3rem" }}>Completed Appointments</pre></Link></a></li>
                    <li className={appdashstyle['active-bar']} ><a href="#" style={{ fontSize: "1.5rem" }} id="todayapp"><Link to = "/authpage/appointmentsdashboard/today"><pre style={{ fontSize: "1.3rem" }}>Today Appointments</pre></Link></a></li>
                    
                </ul>
            </nav>

            <div className={appdashstyle.wrapper}>
                <div className={appdashstyle.section}>
                {appointments.length > 0 ? (
                    appointments.map(appointment => (
                        <div key={appointment.id} className={appdashstyle['section-card']}>
                            <div className={appdashstyle['section-data']}>
                                <div style={{ marginBlock: 'auto', borderRight: '1px solid', paddingRight: '2rem' }}>
                                    <div className={appdashstyle['data-tim']}>
                                        <p style={{ fontSize: 'large' }}>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                        <h2>{new Date(appointment.date).getDate()}</h2>
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
                                        <p style={{ fontFamily: 'sans-serif' }}>Hospital Name:</p>
                                        <p style={{ marginLeft: '10px', fontFamily: 'cursive' }}>{appointment.nameOfHospital}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'sans-serif' }}>Hospital Address:</p>
                                        <p style={{ marginLeft: '10px', fontFamily: 'cursive' }}>{appointment.address}</p>
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
                                    maxHeight: expandedAppointments.has(appointment.id) ? '300px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.3s ease'
                                }}
                            >
                                <div className={appdashstyle['show-cont']}>
                                    <p><pre>Test name          : {appointment.testname}</pre></p>
                                    <p><pre>Hospital Phone no  : {appointment.phone}</pre></p>
                                    {appointment.patientstaus === 1 && <p><pre>status             : Samples not taken</pre></p>}
                                    {appointment.patientstaus === 2 && <p><pre>status             : Waiting for results</pre></p>}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appointments for today.</p>
                )}
                </div>
            </div>
        </>
    );
}

export default ClientAppointmentDashtoday;
