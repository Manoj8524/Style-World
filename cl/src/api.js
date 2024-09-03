// src/api.js
import axios from "axios";

// Common base URL from environment or default
const BASE_URL = "https://style-world-omega.vercel.app/api";

// Customer API calls
const CUSTOMER_API_URL = `${BASE_URL}/addcustomer`;

export const createCustomer = async customerData => {
  try {
    const response = await axios.post(`${CUSTOMER_API_URL}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};

// Customer API calls
const STOCK_COUNT_API_URL = `${BASE_URL}/editstock`;

export const updateStock = async (customerData) => {
  try {
    const response = await axios.put(STOCK_COUNT_API_URL, customerData);
    return response.data;
  } catch (error) {
    console.error("Error updating stock", error);
    throw error;
  }
};

const EDIT_CUSTOMER_API_URL = `${BASE_URL}/editbooking`;

export const updateCustomer = async customerData => {
  try {
    const response = await axios.put(`${EDIT_CUSTOMER_API_URL}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer", error);
    throw error;
  }
};

// Product API calls
const PRODUCT_API_URL = `${BASE_URL}/addproduct`;

export const createProduct = async data => {
  try {
    const response = await axios.post(PRODUCT_API_URL, data);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the product!", error);
    throw error;
  }
};

const EDIT_PRODUCT_API_URL = `${BASE_URL}/editproduct`;

export const updateProduct = async data => {
  try {
    const response = await axios.put(EDIT_PRODUCT_API_URL, data);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the product!", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching products!", error);
    throw error;
  }
};

export const deleteProduct = async id => {
  try {
    const response = await axios.delete(`${PRODUCT_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the product!", error);
    throw error;
  }
};
export const getMonthlyIncome = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/income/monthly`);
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly income:', error);
    throw error;
  }
};

export const getYearlyIncome = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/income/yearly`);
    return response.data;
  } catch (error) {
    console.error('Error fetching yearly income:', error);
    throw error;
  }
};