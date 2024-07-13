import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';
import './css/body.css';
import './css/header.css';
import './css/dialpad.css'; 
import App from '../pages/index.jsx';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
