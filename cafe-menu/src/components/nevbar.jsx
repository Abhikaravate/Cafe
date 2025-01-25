import React from 'react';
import { Link } from 'react-router-dom';
import './VerticalNavbar.css'; // Ensure this file exists and has correct styles

const VerticalNavbar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-header">Samadhan</h1>
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="sidebar-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/menu" className="sidebar-link">Menu</Link>
        </li>
        <li>
          <Link to="/order" className="sidebar-link">Orders</Link>
        </li>
      
        <li>
          <Link to="/staff" className="sidebar-link">Staff</Link>
        </li>
        <li>
          <Link to="/Admin" className="sidebar-link">Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default VerticalNavbar;
