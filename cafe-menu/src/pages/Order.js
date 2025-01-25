import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define a professional font and color palette
const fontFamily = `'Roboto', sans-serif`;
const colors = {
  primary: '#4CAF50', // Green for headers
  secondary: '#2196F3', // Blue for links and accents
  text: '#333', // Default text
  lightText: '#777', // Muted text
  background: '#fafafa', // Light background for cards
  border: '#e0e0e0', // Border color for cards
  hover: '#e3f2fd', // Hover background for interactivity
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/orders', { params: { date } });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      alert('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <div
      style={{
        fontFamily,
        padding: '30px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', color: colors.primary, marginBottom: '20px' }}>
        Order Overview
      </h1>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <label
          htmlFor="order-date"
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          Select Date:
        </label>
        <input
          id="order-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {loading ? (
        <p style={{ fontSize: '1.2rem', color: colors.lightText }}>Loading orders...</p>
      ) : (
        <div>
          <h2
            style={{
              fontSize: '2rem',
              color: colors.secondary,
              marginBottom: '20px',
            }}
          >
            Orders for {selectedDate}
          </h2>
          {orders.length > 0 ? (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                paddingLeft: '20%',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {orders.map((order, index) => (
                <li
                  key={index}
                  style={{
                    padding: '15px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    backgroundColor: colors.background,
                    textAlign: 'left',
                    transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.backgroundColor = colors.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = colors.background;
                  }}
                >
                  <p style={{ fontSize: '1rem', color: colors.text, margin: '5px 0' }}>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p style={{ fontSize: '1rem', color: colors.text, margin: '5px 0' }}>
                    <strong>Total Price:</strong> RS.{order.total_price.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '1rem', color: colors.text, margin: '5px 0' }}>
                    <strong>Order Time:</strong>{' '}
                    {new Date(order.order_time).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p style={{ fontSize: '1rem', color: colors.text, margin: '5px 0' }}>
                    <strong>Menu IDs:</strong>{' '}
                    <span style={{ color: colors.secondary }}>
                      {order.menu_ids.join(', ')}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: '1.2rem', color: colors.lightText }}>
              No orders found for this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
