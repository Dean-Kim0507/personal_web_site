import React, { useEffect, useState } from 'react';
import Community from './Components/Community';
import Resume from './Components/Resume';
import Blog from './Components/BlogList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import CreateBlogList from './Components/BlogComponents/CreateBlogList';
import UpdateBlogList from './Components/BlogComponents/UpdateBlogList';
import DeleteBlogList from './Components/BlogComponents/DeleteBlogList';
import ErrorPage from './Components/ErrorPage';
import LoginPage from './Components/LoginPage';
import Registration from './Components/Registration';
import ForgotIDPassword from './Components/ForgotIDPassword'
// import Switch from 'react-bootstrap/esm/Switch';
import NotFound from './PageNotfound';


function Body(props) {


	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/home" component={Home}></Route>
					<Route exact path="/resume" component={Resume}></Route>
					<Route path="/community" component={Community}></Route>
					<Route exact path="/login" component={LoginPage}></Route>
					<Route exact path="/registration" component={Registration}></Route>
					<Route exact path="/forgot" component={ForgotIDPassword}></Route>
					<Route exact path="/bloglist" component={Blog}></Route>
					<Route exact path="/bloglist/create" component={CreateBlogList}></Route>
					<Route exact path="/bloglist/update/:id/:author" component={UpdateBlogList}></Route>
					<Route exact path="/bloglist/delete/:id/:author" component={DeleteBlogList}></Route>
					<Route exact path="/errorpage/:errNum/:errPage/:errMessage" component={ErrorPage}></Route>

					<Route component={NotFound} />
				</Switch>
			</Router>
		</div>
	);
}
export default Body;