import React, { useState, useEffect } from 'react';
import appdashstyle from "../assets/css/appdash.module.css";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function ClientAppointmentDashcomp() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state
    const [error, setError] = useState(null); // To track any errors

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const decoded = jwtDecode(token);
                const userId = decoded.id; // Extract user ID from the token

                // Fetch appointments with patientStatus of 3 and not cancelled (1)
                const response = await fetch(`https://prowellness-liart.vercel.app/api/clientcompletedappointments/${userId}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
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
                        <a href="#" style={{ fontSize: "1.5rem" }}><Link to = "/authpage/appointmentsdashboard/upcoming"><pre  style={{ fontSize: "1.3rem" }}>Upcoming Appointments</pre></Link></a>
                    </li>
                    <li className={appdashstyle['active-bar']}><a href="#" style={{ fontSize: "1.5rem" }} id="completedapp"><Link to = "/authpage/appointmentsdashboard/completed" ><pre  style={{ fontSize: "1.3rem" }}>Completed Appointments</pre></Link></a></li>
                    <li  ><a href="#" style={{ fontSize: "1.5rem" }} id="todayapp"><Link to = "/authpage/appointmentsdashboard/today"><pre  style={{ fontSize: "1.3rem" }}>Today Appointments</pre></Link></a></li>
                    
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
                                            <p style={{ fontFamily: 'sans-serif' }}>Test Name:</p>
                                            <p style={{ marginLeft: '10px', fontFamily: 'cursive' }}>{appointment.testname}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: 'sans-serif' }}>Hospital Name:</p>
                                            <p style={{ marginLeft: '10px', fontFamily: 'cursive' }}>{appointment.nameOfHospital}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: 'sans-serif' }}>phone Number:</p>
                                            <p style={{ marginLeft: '10px', fontFamily: 'cursive' }}>{appointment.phone}</p>
                                        </div>
                                    </div>

                                    <div style={{marginLeft:"auto", textDecoration:"underline"}}>{<a href={`https://prowellness-liart.vercel.app/${appointment.path}`} target="_blank" rel="noopener noreferrer">
View Results</a>} </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ClientAppointmentDashcomp;
