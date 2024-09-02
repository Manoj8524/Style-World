// src/App.js
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"; // Import your CSS file for animations

const ViewCustomers = lazy(() => import("./components/ViewCustomers"));
const ViewProducts = lazy(() => import("./components/Viewproducts"));
const EditCustomerForm = lazy(() => import("./components/EditCustomerForm"));
const EditProductForm = lazy(() => import("./components/EditProductForm"));
const CustomerForm = lazy(() => import("./components/CustomerForm"));
const Login = lazy(() => import("./components/LoginForm"));
const Details = lazy(() => import("./components/DetailsForm"));
const ProductForm = lazy(() => import("./components/ProductForm"));
const CustomerList = lazy(() => import("./components/CustomerList"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const CustomerDashboard = lazy (()=> import ("./components/CustomerDashboard"))
function App() {
  return (
    <Suspense fallback={<div className="loading-animation" />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/customers" element={<CustomerForm />} />
        <Route path="/products" element={<ProductForm />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/view-customers" element={<ViewCustomers />} />
        <Route path="/view-products" element={<ViewProducts />} />
        <Route path="/edit-customer" element={<EditCustomerForm />} />
        <Route path="/edit-product" element={<EditProductForm />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
