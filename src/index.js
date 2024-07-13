import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css';
import './css/header.css';
// import './css/dialpad.css'; You can activate this if you want to use dialpad
import App from '../pages/index.jsx';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

