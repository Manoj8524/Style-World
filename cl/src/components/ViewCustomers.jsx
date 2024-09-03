import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faArrowLeft, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../components/css/viewcustomer.css'; // Assuming your CSS file is named viewcustomer.css

const ViewCustomers = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get("https://style-world-omega.vercel.app/api/getbookings");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/details";
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

  const filteredData = Data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile.includes(searchTerm)
  );

  return (
    <div className="table-container">
      <div className="header-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="left-container">
          <button className="arrow-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <span className="welcome-text">Welcome</span>
          <div className="logo-container">
            <img src="/n logo.webp" alt="Logo" className="logo" />
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Product Name</th>
            <th>Product Amount</th>
            <th>Customer Feedback</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(e => (
            <tr key={e._id}>
              <td data-label="Name">{e.name}</td>
              <td data-label="Mobile">{e.mobile}</td>
              <td data-label="Service">{e.service}</td>
              <td data-label="Amount">{e.amount}</td>
              <td data-label="Product Name">{e.productname}</td>
              <td data-label="Product Amount">{e.productamount}</td>
              <td data-label="Customer Feedback">{e.customerfeedback}</td>
              <td data-label="Date">{e.currentdate}</td>
              <td data-label="Edit">
                <button
                  className="edit-button"
                  onClick={() => {
                    navigate("/edit-customer", {
                      state: {
                        id: e._id,
                        customername: e.name,
                        customermobile: e.mobile,
                        service: e.service,
                        amount: e.amount,
                        paymentmethod: e.paymentmethod,
                        productname: e.productname,
                        productamount: e.productamount,
                        productquantity: e.productquantity,
                        customerfeedback: e.customerfeedback,
                        currentdate: e.currentdate
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td data-label="Delete">
                <button
                  className="delete-button"
                  onClick={() => {
                    axios
                      .delete(
                        "https://style-world-omega.vercel.app/api/deletecustomerbooking",
                        { params: { id: e._id } }
                      )
                      .then(res => {
                        if (res.data.status === 200) {
                          getData();
                        }
                      });
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
