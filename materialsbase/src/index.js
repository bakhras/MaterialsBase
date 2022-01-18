import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-dom";
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
