import React, { Component } from 'react';
import MainNav from "./Components/MainNav";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
function Head(props) {

	return (
		<Router>
			<Switch>
				<Route path="/" component={MainNav}></Route>
			</Switch>
		</Router>
		// <div>
		// 	<MainNav />
		// </div>
	);
}

export default Head;