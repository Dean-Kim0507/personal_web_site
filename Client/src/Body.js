import React,{useEffect, useState} from 'react';
import Community from './Components/Community';
import Resume from './Components/Resume';
import Blog from './Components/BlogList';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './Components/Home';
import CreateBlogList from './Components/BlogComponents/CreateBlogList';
import ErrorPage from './Components/ErrorPage';
// import Switch from 'react-bootstrap/esm/Switch';
import NotFound from './PageNotfound';


function Body (props){


	return(
		<div>
			<Router>
				<Switch>
					<Route exact path="/home" component={Home}></Route>
					<Route exact path="/resume" component={Resume}></Route>
					<Route path="/community" component={Community}></Route>
					<Route exact path="/bloglist" component={Blog}></Route>
					<Route exact path="/bloglist/create" component={CreateBlogList}></Route>
					<Route exact path="/errorpage" component={ErrorPage}></Route>
					<Route component={NotFound} />	
				</Switch>
			</Router>
		</div>
	);
}
export default Body;