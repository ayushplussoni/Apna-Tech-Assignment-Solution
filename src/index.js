import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Frontend from './Frontend';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <BrowserRouter>
    <Frontend />
  </BrowserRouter>,document.getElementById('root'),
);
reportWebVitals();
