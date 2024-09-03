import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer, updateStock } from "../api";
import axios from "axios";
import "../components/css/customerForm.css"; // Import your CSS file

const CustomerForm = () => {
  const [customerName, setcustomerName] = useState("");
  const [customerMobile, setcustomerMobile] = useState("");
  const [service, setservice] = useState("");
  const [Amount, setAmount] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductAmount, setProductAmount] = useState("");
  const [ProductQuantity, setProductQuantity] = useState("");
  const [CustomerFeedback, setCustomerFeedback] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const [Data, setData] = useState([]);
  const [count, setcount] = useState(0);
  const [stockid, setstockid] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: customerName,
        mobile: customerMobile,
        service: service,
        amount: Amount,
        paymentmethod: paymentMethod,
        productname: ProductName,
        productamount: ProductAmount,
        productquantity: ProductQuantity,
        customerfeedback: CustomerFeedback,
      };

      await createCustomer(productData);

      const matchingProduct = Data.find((val) => val.name === ProductName);
      if (matchingProduct) {
        setcount(parseInt(matchingProduct.stock));
        setstockid(matchingProduct._id);

        const stockData = {
          id: matchingProduct._id,
          count: matchingProduct.stock,
          quantity: ProductQuantity,
        };

        await updateStock(stockData);
      }

      // Reset form fields
      setcustomerName("");
      setcustomerMobile("");
      setservice("");
      setAmount("");
      setpaymentMethod("");
      setProductName("");
      setProductAmount("");
      setProductQuantity("");
      setCustomerFeedback("");

      alert("Customer Detail and Product successfully added!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Please check Customer Number!");
    }
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/details";
    }, 300);
  };

  const handleBackm = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/customer-dashboard";
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
            onChange={(e) => setcustomerName(e.target.value)}
            placeholder="Customer Name"
            className={errors.customerName ? "input-error" : ""}
            required
          />
          <div className="form-row">
            <input
              type="number"
              placeholder="Customer Number"
              value={customerMobile}
              onChange={(e) => setcustomerMobile(e.target.value)}
              required
              className={`left ${errors.customerMobile ? "input-error" : ""}`}
            />
            <input
              type="text"
              placeholder="Customer Service"
              value={service}
              onChange={(e) => setservice(e.target.value)}
              className="right"
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              placeholder="Customer Amount"
              className="left"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Payment Method"
              value={paymentMethod}
              onChange={(e) => setpaymentMethod(e.target.value)}
              className={`right ${errors.paymentMethod ? "input-error" : ""}`}
            />
          </div>
          <div className="form-row">
            <input
              type="checkbox"
              name="buyProduct"
              checked={checkbox}
              onChange={(e) => setcheckbox(!checkbox)}
              className="left"
            />
            <span className="text">Do you want to buy a product?</span>
          </div>
          <input
            type="text"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            disabled={!checkbox}
          />
          <div className="form-row">
            <input
              type="number"
              value={ProductAmount}
              onChange={(e) => setProductAmount(e.target.value)}
              placeholder="Product Amount"
              disabled={!checkbox}
              className="left"
            />
            <input
              type="number"
              value={ProductQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="Product Quantity"
              disabled={!checkbox}
              className="right"
            />
          </div>
          <textarea
            placeholder="Customer Feedback"
            value={CustomerFeedback}
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
          <div className="form-row down-buttons">
            <button type="button" className="downleft" onClick={handleBackm}>
              Dashboard
            </button>
            <button type="button" className="downright" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
