// ============================================================
// main.jsx — THE ENTRY POINT
// This is the first JavaScript file that runs.
// It takes your App component and puts it on the web page.
// You almost never need to change this file.
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // loads all your styles and animations

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter gives the app real URLs so each page
        shows up as a separate pageview in Vercel Analytics. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);