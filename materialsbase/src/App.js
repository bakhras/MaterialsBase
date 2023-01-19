import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Compound from "./components/Compound";
import CompoundList from "./components/CompoundList";
import AddCompound from "./components/AddCompound";
import BulkAddCompound from "./components/BulkAddCompound";
import logo from "./Materialsbase_logo.png";

function App() {
	return(
	<div>
	<Router>
		<nav className="navbar navbar-expand-lg navbar-light bg-light border border-5 mb-4">
			<div className="container-fluid">
				<div className="navbar-brand me-2 fw-bold fs-3 navTextColor">
					<Link className="navTextColor" to ={"/"}><img className="logoSize" alt="materialsbase" src={logo}></img></Link>
				</div>

				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item fw-bolder">
							<Link className="navTextColor" to={"/"} >Homepage</Link>
						</li>
						<li className="breadcrumb-item fw-bolder ">
							<Link className="color: white"to={"/add"}>Add Compound</Link>
						</li>
						<li className="breadcrumb-item fw-bolder ">
							<a href="https://nanobiodata.org/project/materialsbase/">About</a>
						</li>
						<li className="breadcrumb-item fw-bolder">
							<Link to={"/bulkAdd"}>Bulk Add Compound</Link>
						</li>
					</ol>
				</nav>
			</div>
		</nav>

	<div className="container">
			<Routes>
				<Route exact path="/" element={<CompoundList />} />
				<Route exact path="/add" element={<AddCompound />} />
				<Route exact path="/bulkAdd" element={<BulkAddCompound />} />
				<Route path="/:comp_id" element={<Compound/>} />
			</Routes>
	</div>

	<footer className="text-center text-light fixed-bottom" style={{backgroundColor:"#f1f1f1"}}>
		<div className="container pt-3">
			<section>
				<a className="btn btn-link btn-floating btn-lg text-dark m-1"
				   href="https://github.com/bakhras/MaterialsBase"
				   role="button"
				   data-mdb-ripple-color="dark"
				>
					<img alt="github" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="30px" height="30px"/>
				</a>
			</section>
		</div>
		<div className="text-center text-dark p-3" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
			MaterialsBase | North Dakota State University 2022
		</div>
	</footer>
	</Router>
	</div>
	);
}

export default App;
