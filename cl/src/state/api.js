// src/state/api.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData', async () => {
  const response = await axios.get('http://localhost:5000/api/dashboard'); // Adjust the API endpoint as necessary
  return response.data;
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectDashboardData = (state) => state.dashboard.data;
export const selectIsLoading = (state) => state.dashboard.isLoading;
export default dashboardSlice.reducer;
