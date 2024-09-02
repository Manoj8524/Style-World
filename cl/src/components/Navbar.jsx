import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  InputBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search, ExitToApp, ArrowBack } from "@mui/icons-material";
import FlexBetween from "./FlexBetween"; // Adjusted path
import profileImage from "../assets/profile.jpg"; // Adjusted path

const Navbar = ({ user, onSearch }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle search text change
  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Pass the search text to parent component
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      // Clear user-related data here (e.g., localStorage, session, etc.)
      localStorage.clear(); // Example: clear localStorage
      window.location.href = "/details"; // Force a reload to the details page
    }, 300);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      // Clear user-related data here (e.g., localStorage, session, etc.)
      localStorage.clear(); // Example: clear localStorage
      window.location.href = "/"; // Force a reload to the login page
    }, 300);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "#F5F5F5", // AppBar color
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween
          backgroundColor="#FFFFFF"
          sx={{ color: "#443639", borderRadius: "9px", p: "0.1rem 1.5rem", ml: 2, mt: 2 }}
        >
          <InputBase
            sx={{ color: "#443639", ml: 1 }} // Adjusting left margin here
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          <IconButton sx={{ color: "#443639" }}>
            <Search />
          </IconButton>
        </FlexBetween>

        {/* MIDDLE SIDE */}
        <FlexBetween gap="1rem" sx={{ mt: 2 }}>
          <IconButton
            sx={{ color: "#495C83" }}
            onClick={handleLogout}
          >
            <ExitToApp />
          </IconButton>
          <IconButton
            sx={{ color: "#495C83", mr: 4 }}
            onClick={handleBack}
          >
            <ArrowBack />
          </IconButton>
          <Box textAlign="left">
            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: "black", mr: 2 }}>
              Welcome
            </Typography>
          </Box>
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="50px"
            width="15%"
            borderRadius="50%"
            sx={{ objectFit: "cover", mt: 0 }}
          />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
