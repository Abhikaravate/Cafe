import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from './components/nevbar'; // Ensure the path is correct
import Dashboard from './pages/Dashboard'; // Ensure the component paths are correct
import Menu from './pages/Menu';
import Inventory from './pages/Inventory';
import Order from './pages/Order';
import Admin from './pages/Admin';
import Staff from './pages/Staff';

const App = () => {
  const [orders, setOrders] = useState([]); // State to hold orders

  // Function to add items to the order list
  const addToOrder = (newOrderItems) => {
    setOrders((prevOrders) => [...prevOrders, newOrderItems]);  };

  const appContainerStyle = {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f4f4f9',
  };

  return (
    <Router>
      <div style={appContainerStyle}>
        {/* Sidebar */}
        <VerticalNavbar />

        {/* Main Content */}
        <div style={mainContentStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu addToOrder={addToOrder} />} />
            <Route path="/order" element={<Order orders={orders} />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
