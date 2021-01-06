import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../../css/Community.css';
import { withRouter } from "react-router";

function CommunityNav(props) {
	var state = useState();
	return (
		<div>
			<Nav className="col-md-12 d-none d-md-block bg-light sidebar">
				<div className="sidebar-sticky"></div>
				<Nav.Item>
					<Nav.Link href="/community">Community Post</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/community/feedbackpost">Feed Back</Nav.Link>
				</Nav.Item>
			</Nav>
		</div>
	);
}
const Sidebar = withRouter(CommunityNav);
export default CommunityNav;