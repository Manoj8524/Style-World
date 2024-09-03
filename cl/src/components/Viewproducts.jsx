import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faArrowLeft, faSearch, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import "../components/css/viewcustomer.css"
const ViewProducts = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get("https://style-world.onrender.com/api/getproducts");
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



  const handleEdit = (id) => {
    const product = Data.find(item => item._id === id);
    navigate("/edit-product", {
      state: {
        id: product._id,
        productname: product.name,
        productprice: product.price,
        category: product.category,
        stock: product.stock
      }
    });
  };

  const handleDelete = (id) => {
    axios.delete("https://style-world.onrender.com/api/deleteproduct", {
      params: { id }
    }).then(res => {
      if (res.data.status === 200) {
        getData(); // Refresh data after successful deletion
      }
    }).catch(error => {
      console.error("Error deleting product", error);
    });
  };

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
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Data.map(e => (
            <tr key={e._id}>
              <td data-label="Name">{e.name}</td>
              <td data-label="price">{e.price}</td>
              <td data-label="Category">{e.category}</td>
              <td data-label="Stock">{e.stock}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(e._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                
                </button>
              </td>
              <td data-label="Delete">
                <button className="delete-button" onClick={() => handleDelete(e._id)}>
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

export default ViewProducts;
