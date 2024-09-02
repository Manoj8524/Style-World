import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "details-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleNavigation = (path, forceReload = false) => {
    setLoading(true);
    setTimeout(() => {
      if (forceReload) {
        window.location.href = path; // Force a reload
      } else {
        navigate(path);
      }
      setLoading(false); // Reset loading state after navigation
    }, 300); // Delay for transition effect
  };

  const handleCustomerDetailsClick = () => handleNavigation("/customers", true);
  const handleProductFormClick = () => handleNavigation("/products", true);
  const handleDashboardClick = () => handleNavigation("/customer-dashboard", true);
  const handleProductDashboardClick = () => handleNavigation("/dashboard", true);
  const handleCustomerDetails = () => handleNavigation("/view-customers", true);
  const handleProductDetails = () => handleNavigation("/view-products", true);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      // Clear user-related data here (e.g., localStorage, session, etc.)
      localStorage.clear(); // Example: clear localStorage
      window.location.href = "/"; // Force a reload to the login page
    }, 300);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="container-lg d-flex shadow-lg rounded-lg overflow-hidden p-0">
        <div className="image-container d-none d-md-flex col-md-6 p-0">
          {/* Image is set in CSS */}
        </div>
        <div className="details-container col-12 col-md-6 d-flex flex-column align-items-center justify-content-center p-4">
          <div className={`details-content ${loading ? "loading" : ""}`}>
            <div className="details-image mb-3" />
            <div className="details-buttons">
              <div className="welcome-text text-center mb-4">Welcome to Style World</div>
              <button className="details-button btn btn-secondary mb-2" onClick={handleCustomerDetailsClick}>
                Enter Customer Details
              </button>
              <button className="details-button btn btn-secondary mb-2" onClick={handleProductFormClick}>
                Enter Product Details
              </button>
              <button className="details-button btn btn-secondary mb-2" onClick={handleDashboardClick}>
                Customer Dashboard
              </button>
              <button className="details-button btn btn-secondary mb-2" onClick={handleProductDashboardClick}>
                Product Dashboard
              </button>
              <button className="details-button btn btn-secondary mb-2" onClick={handleCustomerDetails}>
                View Customer Details
              </button>
              <button className="details-button btn btn-secondary mb-2" onClick={handleProductDetails}>
                View Product Details
              </button>
              <button className="logout-button btn btn-link text-center text-danger mt-3" onClick={handleLogout}>
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
