import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
    container: {
        marginTop: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    staffHeader: {
        fontSize: '2rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '30px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
    },
    card: {
        width: '300px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'left',
    },
    cardHeader: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: '10px',
    },
    cardDetail: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '8px',
    },
    loader: {
        marginTop: '50px',
        fontSize: '24px',
        color: '#4CAF50',
    },
};

const Staff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/staff') // Fetch data from backend
            .then((response) => {
                console.log('Response Data:', response.data); // Log response to check structure
                setStaff(response.data); // Set staff data from API
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching staff data:', error);
                setLoading(false); // Stop loading in case of error
            });
    }, []);

    if (loading) {
        return (
            <div style={styles.loader}>
                <span>Loading Staff Details...</span>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.staffHeader}>Staff Details</h1>
            <div style={styles.cardContainer}>
                {staff && staff.length > 0 ? (
                    staff.map((member) => (
                        <div key={member.id} style={styles.card}>
                            <div style={styles.cardHeader}>Staff ID: {member.staff_id}</div>
                            <div style={styles.cardDetail}>
                                <strong>Name:</strong> {member.staff_name}
                            </div>
                            <div style={styles.cardDetail}>
                                <strong>Salary:</strong> {member.salary }   
                            </div>
                            <div style={styles.cardDetail}>
                                <strong>Designation:</strong> {member.designation }
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ fontSize: '18px', color: '#555' }}>
                        No staff details available.
                    </div>
                )}
            </div>
        </div>
    );
};
// ? `$${member.salary.toLocaleString()}` : 'N/A'
export default Staff;
