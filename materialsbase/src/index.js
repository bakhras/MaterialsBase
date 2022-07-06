import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import React from 'react';
<<<<<<< Updated upstream
import ReactDOM from 'react-dom';
=======
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
>>>>>>> Stashed changes
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

<<<<<<< Updated upstream
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
=======
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App name="MaterialsBase"/>
	</Provider>
>>>>>>> Stashed changes
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
