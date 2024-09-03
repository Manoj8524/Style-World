// src/components/CustomerList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get('https://style-world-omega.vercel.app/api/customers');
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>
      <Grid container spacing={3}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Customer Number: {customer._id}
                </Typography>
                <Typography variant="body2">
                  Name: {customer.customerName}
                </Typography>
                <Typography variant="body2">
                  Service: {customer.customerService}
                </Typography>
                <Typography variant="body2">
                  Payment Method: {customer.payment.method}
                </Typography>
                <Typography variant="body2">
                  Payment Amount: {customer.payment.amount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerList;
