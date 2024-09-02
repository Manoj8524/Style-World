// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import store from './store';


const container = document.getElementById('root');
const root = createRoot(container);



root.render(
  <Provider store={store}>
    <Router>
     
        <CssBaseline />
        <App />
   
    </Router>
  </Provider>
);
