import React, {useEffect, useState} from 'react';
import CommunityNav from "./CommunityComponents/CommunityNav";
import CommunityPost from "./CommunityComponents/CommunityPost";
import {Container, Row, Col} from "react-bootstrap";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import '../css/Community.css';

function Community (props){
	return(
		<div className="Community">
			<Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <CommunityNav />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
					<Router className="mainCommunity">
						<Route exact path="/community" component={communityPost}></Route>
						<Route path="/community/feedbackpost" component={feedbackPost}></Route>
					</Router>	
                    </Col> 
                </Row>
            </Container>
		</div>
	);
}
const Dashboard = withRouter(Community);
export default Community;

function communityPost(){
	return <div><CommunityPost type="communitypost" /></div>
}

function feedbackPost(){
	return <div><CommunityPost type="feedbackpost" /></div>
}