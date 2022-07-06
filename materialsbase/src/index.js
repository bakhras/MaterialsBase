import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App name="MaterialsBase"/>
	</Provider>
);
