import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(response.data); // Set menu items from the backend
            } catch (err) {
                console.error('Error fetching menu items:', err);
                setError('Failed to fetch menu items');
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Menu</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <div key={item.menu_id} style={styles.menuItem}>
                        <img
                            src={`http://localhost:5000/api/menu/image/${item.menu_id}`}
                            alt={item.name}
                            style={styles.image}
                        />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Available:</strong> {item.available ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    menuContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    menuItem: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '10px',
        borderRadius: '5px',
    },
};

export default Menu;
