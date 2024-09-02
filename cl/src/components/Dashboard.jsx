import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { People, Today, TrendingUp, AttachMoney, EventAvailable } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import Navbar from "./Navbar";
import StatBox from "./StatBox";
import OverviewChart from "./OverviewChart";
import '../components/css/customerDashboard.css';
import { getMonthlyIncome, getYearlyIncome } from "../api";

const StyledDataGrid = styled(DataGrid)`
  /* Other existing styles */
`;

const CustomerDashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 768px)");
  const [data, setData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [todayBookingCount, setTodayBookingCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getbookings");
      setData(response.data);
      setTotalCustomers(response.data.length);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const getTodayBooking = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gettodaybooking");
      const count = response.data.reduce((acc, booking) => (booking.productname ? acc + 1 : acc), 0);
      setTodayBookingCount(count);
    } catch (error) {
      console.error("Error fetching today's bookings", error);
    }
  };
  
  useEffect(() => {
    getData();
    getTodayBooking();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthlyData = await getMonthlyIncome();
        const yearlyData = await getYearlyIncome();
        setMonthlyIncome(monthlyData.totalAmount);
        setYearlyIncome(yearlyData.totalAmount);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "productname", headerName: "Product Name", flex: 1 },
    { field: "productamount", headerName: "Product Amount", flex: 1 },
    { field: "customerfeedback", headerName: "Customer Feedback", flex: 1 },
    { field: "currentdate", headerName: "Date", flex: 1 }
  ];

  const filteredData = data.filter(val => 
    searchText === "" || Object.values(val).some(field => 
      field.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const getRowClassName = (params) => {
    if (params.indexRelativeToCurrentPage % 2 === 0) {
      return 'first-row-color';
    } else {
      return 'second-row-color';
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", flexGrow: 1 }}>
      <Navbar user={data || {}} onSearch={setSearchText} />
      <Outlet />

      <Box
        m="1.5rem 2.5rem"
        sx={{
          minWidth: "768px",  // Set minimum width
          overflowX: "auto",  // Allow horizontal scrolling if content exceeds width
        }}
      >
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="10px"
          sx={{
            "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
          }}
        >
          <StatBox
            title="Total Customers"
            increase={totalCustomers}
            description="Customers received"
            icon={<People sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#DCE2ED"
          />
          <StatBox
            title="Customers Today"
            increase={todayBookingCount}
            description="Customers today"
            icon={<Today sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#8FC0DE"
          />
          
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor="#E2EDF4"
            p="1rem"
            borderRadius="0.55rem"
            sx={{
              height: "500px",
              width: isNonMediumScreens ? '100%' : '100vw',
            }}
          >
            <OverviewChart order={totalCustomers} />
          </Box>
          <StatBox
            title="Monthly Customers"
            increase={totalCustomers}
            description="Customers this month"
            icon={<EventAvailable sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#8FC0DE"
          />
          <StatBox
            title="Yearly Customers"
            increase={totalCustomers}
            description="Customers this year"
            icon={<TrendingUp sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#DCE2ED"
          />
        
          <StatBox
            title="Monthly Income"
            increase={monthlyIncome}
            description="Income of this month"
            icon={<AttachMoney sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#DCE2ED"
          />
          <StatBox
            title="Yearly Income"
            increase={yearlyIncome}
            description="Income of this year"
            icon={<AttachMoney sx={{ color: "black", fontSize: "26px" }} />}
            backgroundColor="#8FC0DE"
          />

          <Box
            gridColumn="span 12"
            gridRow="span 3"
            sx={{
              "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
              "& .MuiDataGrid-cell": { borderBottom: "none", color: "black" },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#DCE2ED"
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#8FC0DE",
                color: "black",
                borderTop: "none"
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "black"
              }
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: '60%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                display: "none"
              }}
            />
            <StyledDataGrid
              getRowId={row => row._id}
              rows={filteredData}
              columns={columns}
              getRowClassName={getRowClassName}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
