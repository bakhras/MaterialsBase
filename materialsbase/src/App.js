//import logo from './logo.svg';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink,  MDBContainer} from "mdbreact";
import './App.css';
import AddCompound from "./components/AddCompound";
import Compound from "./components/Compound";
import CompoundList from "./components/CompoundList";

function App() {
	return(
	<div>
		<MDBNavbar>
			<MDBNavbarBrand>MaterialsBase</MDBNavbarBrand>
		<MDBNavbarNav>
			<MDBNavItem>
			</MDBNavItem>

			<MDBNavItem>
			</MDBNavItem>
		</MDBNavbarNav>
	</MDBNavbar>

	<MDBContainer>
			<Routes>
				<Route exact path="/" element={<CompoundList />} />
				<Route path="/compounds" element={<CompoundList />} />
				<Route exact path="/add" element={<AddCompound />} />
				<Route path="/compounds/:comp_id" element={<Compound/>} />
			</Routes>
	</MDBContainer>

	</div>
	);
};
export default App;
