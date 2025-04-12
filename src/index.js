import React from 'react';
import { BrowserRouter } from "react-router";
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'macro-css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

