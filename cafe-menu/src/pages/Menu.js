import React, { useState  ,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Menu = (addToOrder) => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        const formattedMenuItems = response.data.map((item) => ({
          menu_id: item.menu_id, // Map the correct MongoDB field
          name: item.menu_name, // Map menu_name from schema
          description: item.description,
          Price: item.Price,
        }));
        setMenuItems(formattedMenuItems);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to fetch menu items");
      }
    };

    fetchMenuItems();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Calculate total price of selected items
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.Price, 0);

  const addToSelectedItems = (item) => {
    setSelectedItems((prev) => [...prev, { ...item, menu_id: item.id }]);
  };

  const handlePlaceOrder = () => {
    const orderData = {
        menu_ids: selectedItems.map((item) => item.menu_id), // Collect menu IDs
        total_price: totalPrice, // Total price of the order
        order_time: new Date().toISOString(), // Current date and time in ISO format
    };

    axios.post('http://localhost:5000/api/orders', orderData)
        .then((response) => {
            console.log('Order placed successfully:', response.data);
            // Optional: Clear selected items after order placement
            setSelectedItems([]);
        })
        .catch((error) => {
            console.error('Error placing order:', error);
        });
};


  // Inline styles for the component
  // Inline styles for the component
  const containerStyle = {
    maxWidth: "1200px",
    //margin: "0 auto",
    padding: "20px",
    marginLeft: "20%",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.9)",
    marginTop: "50px", // Optional: Adjust spacing for a top margin
    display: "flex", // Use flexbox for layout
    //  justifyContent: "flex-end", // Align container to the right side
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "20px",
    marginLeft: "50%",
    marginright: "50%",
  };

  const layoutStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "row", // Keep it in row for side-by-side layout
  };

  const menuItemsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    flex: 2,
    marginLeft: "20px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  };

  const cardHeaderStyle = {
    fontSize: "1.5rem",
    color: "#e74c3c",
    marginBottom: "10px",
  };

  const cardDescriptionStyle = {
    fontSize: "1rem",
    color: "#7f8c8d",
    marginBottom: "10px",
  };

  const cardPriceStyle = {
    fontSize: "1.2rem",
    color: "#27ae60",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "#ffffff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const selectedItemsContainerStyle = {
    backgroundColor: "#ecf0f1",
    borderRadius: "10px",
    padding: "20px",
    flex: 1,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const selectedItemsTitleStyle = {
    textAlign: "center",
    fontSize: "1.8rem",
    color: "#34495e",
    marginBottom: "15px",
  };

  const selectedItemListStyle = {
    listStyleType: "none",
    padding: "0",
  };

  const selectedItemStyle = {
    fontSize: "1rem",
    color: "#2c3e50",
    padding: "10px 0",
    borderBottom: "1px solid #bdc3c7",
  };

  const totalPriceStyle = {
    fontSize: "1.3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    color: "#27ae60",
  };

  const placeOrderButtonStyle = {
    backgroundColor: "#2ecc71",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      {/* <div><h1 style={titleStyle}>Our Menu</h1> </div> */}

      <div style={layoutStyle}>
        <div style={menuItemsContainerStyle}>
          {menuItems.map((item) => (
            <div
              key={item.menu_id} // Use menu_id as the unique key
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, cardHoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, cardStyle)
              }
            >
              <h2 style={cardHeaderStyle}>{item.name}</h2>
              <p style={cardDescriptionStyle}>{item.description}</p>
              <p style={cardPriceStyle}>₹{item.Price}</p>
              <button
                style={buttonStyle}
                onClick={() => addToSelectedItems(item)}
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>

        <div style={selectedItemsContainerStyle}>
          <h2 style={selectedItemsTitleStyle}>Your Selected Items</h2>
          {selectedItems.length > 0 ? (
            <>
              <ul style={selectedItemListStyle}>
                {selectedItems.map((item) => (
                  <li key={item.menu_id} style={selectedItemStyle}>
                    {item.name} - ₹{item.Price}
                  </li>
                ))}
              </ul>

              <p style={totalPriceStyle}>Total: ₹{totalPrice}</p>
              <button style={placeOrderButtonStyle} onClick={handlePlaceOrder}>
                Place Order
              </button>
            </>
          ) : (
            <p style={{ textAlign: "center", color: "#7f8c8d" }}>
              No items selected yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
