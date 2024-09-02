import React, { useState } from "react";
import { createProduct, updateProduct } from "../api";
import "../components/css/ProductForm.css"; // Import your CSS file
import { useLocation, useNavigate } from "react-router-dom";

const EditProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productName, setProductName] = useState(location.state.productname);
  const [productPrice, setProductPrice] = useState(location.state.productprice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add this line

  const validateForm = () => {
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!productPrice) {
      newErrors.productPrice = "Product price is required";
    } else if (isNaN(productPrice) || Number(productPrice) <= 0) {
      newErrors.productPrice = "Product price must be a positive number";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!stock) {
      newErrors.stock = "Stock is required";
    } else if (isNaN(stock) || Number(stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const productData = {
        id: location.state.id,
        name: productName,
        price: productPrice,
        category: category,
        stock: stock
      };
      await updateProduct(productData);
      setProductName("");
      setProductPrice("");
      setCategory("");
      setStock("");
      alert("Product updated successfully!");
      navigate("/view-products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. See console for details.");
    }
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      // Clear user-related data here (e.g., localStorage, session, etc.)
      localStorage.clear(); // Example: clear localStorage
      window.location.href = "/details"; // Force a reload to the login page
    }, 300);
  };

  const handleLogout = () => {
    // Clear user-related data here (e.g., localStorage, session, etc.)
    localStorage.clear(); // Example: clear localStorage
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="container" id="container">
      <div className="image-container">
        {/* Image is set in CSS */}
      </div>
      <div className="form-container">
        <form className="product-form" onSubmit={handleSubmit}>
          <h1>Welcome to style world</h1>
          <h5>Product Form</h5>
          <div className="form-field">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </div>
          <div className="form-field">
            <label>Product Price:</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
            {errors.productPrice && <span className="error">{errors.productPrice}</span>}
          </div>
          <div className="form-field">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
          <div className="form-field">
            <label>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              step="any"
            />
            {errors.stock && <span className="error">{errors.stock}</span>}
          </div>
          <div className="button-group">
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <button type="submit" className="add-button">Update Product</button>
          </div>
        </form>
      </div>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default EditProductForm;
