import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Image, Modal, Button, Col, Spinner } from 'react-bootstrap';
import { logout } from "../Actions/auth";
import { useHistory } from "react-router-dom";
import AuthService from "../Services/Auth.service";

import {
	v_session_expired
} from "./message";
import { loginValid } from "../Actions/auth";

function MainNav(props) {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [loading, setLoading] = useState(false);
	const { isLoggedIn, user } = useSelector(state => state.auth);
	const basicProfileImgPath = "./uploadImages/icon/img_user.jpg";
	const IMG_WIDTH = 45;
	const IMG_LENGTH = 50;
	let imagePath;
	let history = useHistory();

	const logOut = () => {
		setLoading(true);
		dispatch(logout());
	};

	if (isLoggedIn) {
		imagePath = user.profileImg;
		if (imagePath != null) {
			imagePath = imagePath.substring(16, imagePath.length);
		}
		else imagePath = basicProfileImgPath;
	}

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(loginValid());
			// history.push('/login');
		}
	}, [])
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
			</Navbar>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="mainNav">
					<Navbar.Brand href="/home">
						<Image
							src="./uploadImages/icon/dh_icon.gif"
							width="80"
							height="60"
							className="d-inline-block align-top"
						/>{' '}
						{/* DEAN'S */}
					</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/bloglist">Blog</Nav.Link>
						<Nav.Link href="/resume">Resume</Nav.Link>
						<Nav.Link href="/community">Community</Nav.Link>
					</Nav>
					{isLoggedIn ?
						<>
							<Image src={user.profileImg}
								width={IMG_WIDTH}
								height={IMG_LENGTH}
								alt="45x50"
								roundedCircle />
							<Nav>
								<Nav.Item>
									<Nav.Link href="/myaccount">Hello, {user.firstName}<br />My Account</Nav.Link>
								</Nav.Item>
							</Nav>
						</>
						: null
					}
					{isLoggedIn ?
						<Nav>
							<Nav.Item>
								<Nav.Link onClick={handleShow}>Logout</Nav.Link>
							</Nav.Item>
						</Nav>
						: <Nav>
							<Nav.Item>
								<Nav.Link href="/login">Login</Nav.Link>
							</Nav.Item>
						</Nav>
					}
				</Navbar.Collapse>
			</Navbar>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton />
				<Modal.Body>
					<h5>Are you sure you want to Logout?</h5>
					<Col md={{ span: 3, offset: 9 }}>
						{loading ?
							<Button variant="light" href="/login" onClick={logOut} >
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							</Button>
							: <Button variant="light" href="/login" onClick={logOut} >
								Logout
          				</Button>
						}
					</Col>
				</Modal.Body>
			</Modal>
			<hr />
		</div>
	);
}

export default MainNav;