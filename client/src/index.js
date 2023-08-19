import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";


import App from './components/App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.querySelector("#root")).render(<BrowserRouter><App /></BrowserRouter>);
