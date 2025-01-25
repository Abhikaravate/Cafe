import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const [menu, setMenu] = useState({ menu_id: "", menu_name: "", price: "", description: "" });
  const [menus, setMenus] = useState([]);
  const [staff, setStaff] = useState({ staff_id: "", staff_name: "", salary: "", designation: "" });
  const [staffList, setStaffList] = useState([]);

  const fetchMenus = async () => {
    const response = await fetch("http://localhost:5000/api/menu");
    const data = await response.json();
    setMenus(data);
  };

  const fetchStaff = async () => {
    const response = await fetch("http://localhost:5000/api/staff");
    const data = await response.json();
    setStaffList(data);
  };

  useEffect(() => {
    fetchMenus();
    fetchStaff();
  }, []);

  const handleMenuSubmit = async () => {
    try {
      await fetch("http://localhost:5000/api/menu" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      toast.success("Menu item added successfully!");
      fetchMenus();
    } catch (error) {
      toast.error("Failed to add menu item.");
    }
  };

  const handleMenuUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/menu/${menu.menu_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      toast.success("Menu item updated successfully!");
      fetchMenus();
    } catch (error) {
      toast.error("Failed to update menu item.");
    }
  };

  const handleMenuDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/menu/${id}`, { method: "DELETE" });
      toast.success("Menu item deleted successfully!");
      fetchMenus();
    } catch (error) {
      toast.error("Failed to delete menu item.");
    }
  };

  const handleStaffSubmit = async () => {
    try {
      await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff),
      });
      toast.success("Staff added successfully!");
      fetchStaff();
    } catch (error) {
      toast.error("Failed to add staff.");
    }
  };

  const handleStaffUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/staff/${staff.staff_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staff),
      });
      toast.success("Staff updated successfully!");
      fetchStaff();
    } catch (error) {
      toast.error("Failed to update staff.");
    }
  };

  const handleStaffDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/staff/${id}`, { method: "DELETE" });
      toast.success("Staff deleted successfully!");
      fetchStaff();
    } catch (error) {
      toast.error("Failed to delete staff.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2>Menu Operations</h2>
        <input
          style={styles.input}
          placeholder="Menu ID"
          onChange={(e) => setMenu({ ...menu, menu_id: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Menu Name"
          onChange={(e) => setMenu({ ...menu, menu_name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Price"
          onChange={(e) => setMenu({ ...menu, price: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Description"
          onChange={(e) => setMenu({ ...menu, description: e.target.value })}
        />
        <button style={styles.button} onClick={handleMenuSubmit}>Add Menu</button>
        <button style={styles.button} onClick={handleMenuUpdate}>Update Menu</button>
        <ul style={styles.list}>
          {menus.map((item) => (
            <li key={item.menu_id} style={styles.listItem}>
              {item.menu_name} {"   "}
              <button style={styles.deleteButton} onClick={() => handleMenuDelete(item.menu_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h2>Staff Operations</h2>
        <input
          style={styles.input}
          placeholder="Staff ID"
          onChange={(e) => setStaff({ ...staff, staff_id: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Staff Name"
          onChange={(e) => setStaff({ ...staff, staff_name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Salary"
          onChange={(e) => setStaff({ ...staff, salary: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Designation"
          onChange={(e) => setStaff({ ...staff, designation: e.target.value })}
        />
        <button style={styles.button} onClick={handleStaffSubmit}>Add Staff</button>
        <button style={styles.button} onClick={handleStaffUpdate}>Update Staff</button>
        <ul style={styles.list}>
          {staffList.map((member) => (
            <li key={member.staff_id} style={styles.listItem}>
              {member.staff_name} - {member.designation}{" "}
              <button style={styles.deleteButton} onClick={() => handleStaffDelete(member.staff_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    margin: "20%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  section: {
    marginBottom: "40px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 15px",
    margin: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    margin: "5px 0",
    padding: "8px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default Admin;
