// src/pages/CustomerPage.js
import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import { createCustomer } from '../api';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);

  const handleFormSubmit = async (data) => {
    try {
      const newCustomer = await createCustomer(data);
      console.log('Customer created:', newCustomer);
      setCustomers([...customers, newCustomer]);
      alert('Customer created successfully!');
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Error creating Number');
      
    }
  };

  return (
    <div>
      <CustomerForm onSubmit={handleFormSubmit} />
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>{customer.customerName}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerPage;
