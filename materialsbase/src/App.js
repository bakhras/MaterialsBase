//import logo from './logo.svg';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
	render() {
		return(
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<a href="/tutorials" className="navbar-brand">MaterialsBase</a>
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
					<Switch>
						<Route exact path={["/", "/compounds"]} component={CompoundsList} />
						<Route exact path="/add" component={AddCompound} />
						<Route path="/compounds/:id" component={Compound} />
					</Switch>
				</div>
     	 		</div>
		);
	}
}

export default App;
