import React, { useState } from 'react';
import { createProduct } from "../api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/ProductForm.css';

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        name: productName,
        price: productPrice,
        category: category,
        stock: stock
      };
      await createProduct(productData);
      setProductName("");
      setProductPrice("");
      setCategory("");
      setStock("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. See console for details.");
    }
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
      localStorage.clear();
      window.location.href = "/";
    }, 300);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row bg-light shadow rounded overflow-hidden form-container">
        <div className="col-md-6 d-none d-md-block image-container">
          {/* Image is set in CSS */}
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <form className="w-100" onSubmit={handleSubmit}>
            <h1 className="text-left">Welcome to style world</h1>
            <h5 className="text-left">Product Form</h5>
            <div className="mb-3">
              <label className="form-label">Product Name:</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              {errors.productName && <span className="text-danger">{errors.productName}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Product Price:</label>
              <input
                type="number"
                className="form-control"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
              {errors.productPrice && <span className="text-danger">{errors.productPrice}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              {errors.category && <span className="text-danger">{errors.category}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Stock:</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
              {errors.stock && <span className="text-danger">{errors.stock}</span>}
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-back" onClick={handleBack}>Back</button>
              <button type="submit" className="btn btn-add">Add Product</button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button type="button" className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
              <button type="button" className="btn btn-secondary" onClick={handleDashboard}>Dashboard</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
