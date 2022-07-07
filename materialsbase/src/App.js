import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBContainer} from "mdbreact";
import './App.css';
import Compound from "./components/Compound";
import CompoundList from "./components/CompoundList";
//import ModifyCompound from "./components/ModifyCompound";
import AddCompound from "./components/AddCompound";

function App() {
	return(
	<div>
	<Router>
		<MDBNavbar>
			<MDBNavbarBrand>MaterialsBase</MDBNavbarBrand>
		<MDBNavbarNav>
			<MDBNavItem>
				<Link to={"/"}>Home</Link>
			</MDBNavItem>
			<MDBNavItem>
				<Link to={"/add"}>Add</Link>
			</MDBNavItem>
		</MDBNavbarNav>
	</MDBNavbar>

	<MDBContainer>
			<Routes>
				<Route exact path="/" element={<CompoundList />} />
				<Route exact path="/add" element={<AddCompound />} />
				<Route path="/:comp_id" element={<Compound/>} />
			</Routes>
	</MDBContainer>
	</Router>
	</div>
	);
}

export default App;
