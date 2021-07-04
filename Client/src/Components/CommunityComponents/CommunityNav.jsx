import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import '../../css/Community.css';
import { withRouter } from "react-router";

class CommunityNav extends Component {
	render() {
		return (
			<div>
				<Nav className="col-md-12 d-none d-md-block bg-light sidebar">
					<div className="sidebar-sticky"></div>
					<Nav.Item>
						<Nav.Link href="/community/communitypost">Community Post</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/community/feedbackpost">Feed Back</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
		);
	}
}

export default CommunityNav;