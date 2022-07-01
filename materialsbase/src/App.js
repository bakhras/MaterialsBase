//import logo from './logo.svg';
import React, { Component } from 'react';
import { Router, Route, Link, Routes} from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBContainer} from "mdbreact";
import './App.css';
import AddCompound from "./components/AddCompound";
import ViewDetail from "./components/ViewDetail/ViewDetail";
import ViewList from "./components/ViewList/ViewList";

class App extends Component {
	render() {
	return(
	<Router>
	<MDBNavbar>
		<MDBNavbarBrand href="/compounds">MaterialsBase</MDBNavbarBrand>
		<MDBNavbarNav>
			<MDBNavItem>
				<Link to={"/compounds"}>Compounds</Link>
			</MDBNavItem>

			<MDBNavItem>
				<Link to={"/add"}>Upload</Link>
			</MDBNavItem>
		</MDBNavbarNav>
	</MDBNavbar>

	<MDBContainer>
			<Routes>
				<Route exact path="/" element={<ViewList />} />
				<Route exact path="/add" element={<AddCompound />} />
				<Route path="/compounds/:comp_id" element={<ViewDetail/>} />
			</Routes>
	</MDBContainer>

	</Router>
	);
	};
};
export default App;
