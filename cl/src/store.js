// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './state/api';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export default store;
