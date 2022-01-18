import logo from './logo.svg';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// proof of concept code

function App() {
  return (
	<div className="App">
	 	<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav mr-auto">
					<a href="/" className="navbar-brand">MaterialsBase</a>
				</div>
	  		</nav>
		</div>
      		<header className="App-header">
        		<img src={logo} className="App-logo" alt="logo" width="256" height="256" />
        		<h1>MaterialsBase basic page loading worked!</h1>
        		<a
          			className="App-link"
          			href="https://reactjs.org"
          			target="_blank"
          			rel="noopener noreferrer"
        		>
          		Made in ReactJS
        		</a>
      		</header>
    </div>
  );
}


// The following is non-functional code at the moment and will be improved upon
// Uncomment to get dev build going vs proof of concept code

//class App extends Component {
//	render() {
//		return(
//			<div>
//				<nav className="navbar navbar-expand navbar-dark bg-dark">
//					<a href="/compounds" className="navbar-brand">MaterialsBase</a>
//					<div className="navbar-nav mr-auto">
//						<li className="nav-item">
//              						<Link to={"/compounds"} className="nav-link">Compounds</Link>
//						</li>
//						<li className="nav-item">
//              						<Link to={"/add"} className="nav-link">Add</Link>
//            					</li>
//          				</div>
//        			</nav>
//				<div className="container mt-3">
//					<Switch>
//						<Route exact path={["/", "/compounds"]} component={CompoundsList} />
//						<Route exact path="/add" component={AddCompound} />
//						<Route path="/compounds/:id" component={Compound} />
//					</Switch>
//				</div>
//     	 		</div>
//		);
//	}
//}

export default App;
