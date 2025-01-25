import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]); // State for menu items
  const [selectedItems, setSelectedItems] = useState([]); // Items added to the order
  const [orders, setOrders] = useState([]); // State for displaying orders
  const [error, setError] = useState(null); // Error handling

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (err) {
        setError("Failed to fetch menu items");
        console.error(err);
      }
    };

    fetchMenu();
  }, []);

 

  const fetchTodaysOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/today');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching today\'s orders:', err);
    }
  };

  useEffect(() => {
    fetchTodaysOrders();
  }, []);

  // Fetch existing orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  // Add menu item to order
  const addToOrder = (item) => {
    const existingItem = selectedItems.find((selected) => selected.name === item.name);
    if (existingItem) {
      // Update quantity if item already exists
      setSelectedItems((prev) =>
        prev.map((selected) =>
          selected.name === item.name
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      );
    } else {
      // Add new item to order
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // Submit order to backend
  const submitOrder = async () => {
    if (selectedItems.length === 0) {
      alert("Please add items to the order before submitting.");
      return;
    }

    const totalAmount = selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const orderData = {
      orderId: new Date().getTime().toString(), // Generate unique order ID
      menuItems: selectedItems,
      totalAmount,
      status: "Pending",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      alert("Order submitted successfully!");
      setOrders((prev) => [...prev, response.data]); // Update order list
      setSelectedItems([]); // Reset selected items
    } catch (err) {
      setError("Failed to submit order");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      

      <h2>Current Order</h2>
      <div style={styles.orderContainer}>
        {selectedItems.length === 0 && <p>No items in the order yet.</p>}
        {selectedItems.map((item) => (
          <div key={item.name} style={styles.orderItem}>
            <p>
              {item.name} x {item.quantity} (${item.price * item.quantity})
            </p>
            
          </div>
          
        ))}
        {selectedItems.length > 0 && (
          <button style={styles.submitButton} onClick={submitOrder}>
            Submit Order
          </button>
        )}
      </div>

      <h2>All Orders</h2>
      <div style={styles.orderContainer}>
        {orders.length === 0 && <p>No orders available yet.</p>}
        {orders.map((order) => (
          <div key={order.orderId} style={styles.orderItem}>
            <p>
              <strong>Order ID:</strong> {order.orderId} <br />
              <strong>Total Amount:</strong> ${order.totalAmount} <br />
              <strong>Status:</strong> {order.status} <br />
              <strong>Items:</strong>
              <ul>
                {order.menuItems.map((item, index) => (
                  <li key={index}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  menuContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  menuItem: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  menuImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
  },
  orderContainer: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
  orderItem: {
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Order;
