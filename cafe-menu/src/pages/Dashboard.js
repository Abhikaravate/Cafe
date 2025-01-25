import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    orders: 0,
    revenue: 0,
    today: "",
    monthlyRevenue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000";
    axios
      .get("/api/dashboard")
      .then((response) => {
        const { orders, revenue, today, monthlyRevenue } = response.data;
        setDashboardData({ orders, revenue, today, monthlyRevenue });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      padding: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px",
      width: "50%",
      maxWidth: "800px",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    cardTitle: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333333",
    },
    cardValue: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1e40af",
    },
    chartWrapper: {
      gridColumn: "span 2",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    chartTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333333",
    },
    error: {
      color: "red",
      fontSize: "1.2rem",
      textAlign: "center",
      marginTop: "20px",
    },
    loading: {
      fontSize: "1.5rem",
      color: "#1e293b",
      textAlign: "center",
    },
  };

  const chartData = {
    labels: dashboardData.monthlyRevenue.map((data) => data.date),
    datasets: [
      {
        label: "Revenue",
        data: dashboardData.monthlyRevenue.map((data) => data.revenue),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  if (loading) {
    return <div style={styles.loading}>Loading data...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "20px", color: "#1e293b", fontSize: "2.5rem" }}>Cafe Dashboard</h1>
      <div style={styles.grid}>
        <div
          style={styles.card}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
        >
          <div style={styles.cardTitle}>Number of Orders</div>
          <div style={styles.cardValue}>{dashboardData.orders}</div>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
        >
          <div style={styles.cardTitle}>Today's Date</div>
          <div style={styles.cardValue}>{dashboardData.today}</div>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
        >
          <div style={styles.cardTitle}>Total Revenue</div>
          <div style={styles.cardValue}>₹{dashboardData.revenue.toLocaleString()}</div>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
        >
          <div style={styles.cardTitle}>Monthly Revenue</div>
          <div style={styles.cardValue}>
            ₹{dashboardData.monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()}
          </div>
        </div>

        <div style={styles.chartWrapper}>
          <div style={styles.chartTitle}>Revenue Overview</div>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
