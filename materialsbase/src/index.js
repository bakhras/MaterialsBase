import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
//import * as serviceWorker from "./serviceWorker";
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  	// some temporary proof of concept instead of an app
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')

	//<BrowserRouter>
		//<App />
	//</BrowserRouter>,
	//document.getElementById('root')
);

//serviceWorker.unregister();
