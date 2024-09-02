import React, { useState } from "react";
import { createCustomer,createProduct, updateCustomer } from "../api";
import "../components/css/customerForm.css"; // Import your CSS file
import { useLocation, useNavigate } from "react-router-dom";

const EditCustomerForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(location.state.customername);
  const [customerMobile, setCustomerMobile] = useState(
    location.state.customermobile
  );
  const [service, setService] = useState(location.state.service);
  const [amount, setAmount] = useState(location.state.amount);
  const [paymentMethod, setPaymentMethod] = useState(
    location.state.paymentmethod
  );
  const [productName, setProductName] = useState(location.state.productname);
  const [productAmount, setProductAmount] = useState(
    location.state.productamount
  );
  const [productQuantity, setProductQuantity] = useState(
    location.state.productquantity
  );
  const [customerFeedback, setCustomerFeedback] = useState(
    location.state.customerfeedback
  );
  const [checkbox, setCheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!customerMobile) {
      newErrors.customerMobile = "Customer mobile is required";
    } else if (isNaN(customerMobile) || Number(customerMobile) <= 0) {
      newErrors.customerMobile = "Customer mobile must be a positive number";
    }

    if (!service.trim()) {
      newErrors.service = "Service is required";
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(amount) || Number(amount) < 0) {
      newErrors.amount = "Amount must be a non-negative number";
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
        name: customerName,
        mobile: customerMobile,
        service: service,
        amount: amount,
        paymentmethod: paymentMethod,
        productname: productName,
        productamount: productAmount,
        productquantity: productQuantity,
        customerfeedback: customerFeedback
      };
      await updateCustomer(productData);
      setCustomerName("");
      setCustomerMobile("");
      setService("");
      setAmount("");
      setPaymentMethod("");
      setProductName("");
      setProductAmount("");
      setProductQuantity("");
      setCustomerFeedback("");
      alert("Customer service updated successfully!");
      navigate("/view-customers");
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Error updating customer. See console for details.");
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

  return (
    <div className="container" id="container">
      <div className="image-container">
        {/* Image is set in CSS */}
      </div>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1 className="centered-heading">Welcome to Style World</h1>
          <h5 className="centered-head">Customer Details Form</h5>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            required
          />
          {errors.customerName && (
            <span className="error">{errors.customerName}</span>
          )}

          <div className="form-row">
            <input
              type="number"
              placeholder="Customer Mobile"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              required
              className="left"
            />
            {errors.customerMobile && (
              <span className="error">{errors.customerMobile}</span>
            )}
            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="right"
            />
            {errors.service && <span className="error">{errors.service}</span>}
          </div>
          <div className="form-row">
            <input
              type="number"
              placeholder="Amount"
              className="left"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <span className="error">{errors.amount}</span>}
            <input
              type="text"
              placeholder="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="right"
            />
          </div>
          <div className="form-row">
            <input
              type="checkbox"
              name="buyProduct"
              checked={checkbox}
              onChange={(e) => setCheckbox(!checkbox)}
              className="left"
            />
            <span className="text">Do you want to buy a product?</span>
          </div>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <div className="form-row">
            <input
              type="number"
              value={productAmount}
              onChange={(e) => setProductAmount(e.target.value)}
              placeholder="Product Amount"
              className="left"
            />
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="Product Quantity"
              className="right"
            />
          </div>
          <textarea
            placeholder="Customer Feedback"
            value={customerFeedback}
            onChange={(e) => setCustomerFeedback(e.target.value)}
          />
          <div className="form-row">
            <button type="button" className="left" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="right">
              Submit
            </button>
          </div>
        </form>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default EditCustomerForm;
