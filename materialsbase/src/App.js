//import logo from './logo.svg';
import { React }  from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCompound from "./components/AddCompound";
//import Compound from "./components/Compound";
//import CompoundsList from "./components/CompoundList";

import ViewDetail from "./longscomponent/ViewDetail/ViewDetail";
import ViewList from "./longscomponent/ViewList/ViewList";

// proof of concept code

//function App() {
//	return (
//		<div className="App">
//		<div>
//		<nav className="navbar navbar-expand navbar-dark bg-dark">
//		<div className="navbar-nav mr-auto">
//		<a href="/" className="navbar-brand">MaterialsBase</a>
//		</div>
//		</nav>
//		</div>
//		<header className="App-header">
//		<img src={logo} className="App-logo" alt="logo" width="256" height="256" />
//		<h1>MaterialsBase basic page loading worked!</h1>
//		<a
//		className="App-link"
//		href="https://reactjs.org"
//		target="_blank"
//		rel="noopener noreferrer"
//		>
//		Made in ReactJS
//		</a>
//		</header>
//		</div>
//	);
//}


// The following is non-functional code at the moment and will be improved upon
// Uncomment to get dev build going vs proof of concept code

function App() {
	return(
		<div className="App">
		<Router>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/compounds" className="navbar-brand">MaterialsBase</a>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/compounds"} className="nav-link">Compounds</Link>
					</li>
					<li className="nav-item">
						<Link to={"/add"} className="nav-link">Add</Link>
					</li>
				</div>
			</nav>
			<div className="container mt-3">
				<Routes>
					<Route exact path="/" element={<ViewList />} />
					<Route exact path="/add" element={<AddCompound />} />
					<Route path="/compounds/:comp_id" element={<ViewDetail />} />
				</Routes>
			</div>
		</Router>
		</div>
	);
}

export default App;
