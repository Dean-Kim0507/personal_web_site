import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MainNav(props) {
	var state = useState();
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">

			</Navbar>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="mainNav">
					<Navbar.Brand href="#">
						<img
							alt=""
							src="../images/logo/logo1.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
			DEAN'S
			</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/bloglist">Blog</Nav.Link>
						<Nav.Link href="/resume">Resume</Nav.Link>
						<Nav.Link disabled href="#">My Project</Nav.Link>
						<Nav.Link href="/community">Community</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Item>
							<Nav.Link href="/login">Login</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<hr />
		</div>
	);
}

export default MainNav;