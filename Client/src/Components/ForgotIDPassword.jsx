import React, { useState, useRef, useEffect } from "react";
import { Rab, Row, Col, Nav, Tab, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import ForgotService from '../Services/Forgot.service';
import {
	FIND_ID,
	FIND_PASSWORD,
	NOT_FOUND_ID,
	NOT_FOUND_EMAIL,
	NOT_FOUND_ID_EMAIL,
	SEND_EMAIL_SUCCESS,
	SEND_EMAIL_FAIL
} from "./type";
import {
	e_email_notfound,
	e_userID_notfound,
	e_userID_email_notfound
} from './message';
import '../css/ForgotIDPassword.css'

function ForgotIDPassword(props) {
	const { isLoggedIn, user } = useSelector(state => state.auth);
	const [type, setType] = useState(props.match.params.type);
	const [alertMessage, setAlertMessage] = useState({ body: null, forgot: null });
	const [showAlert, setAlert] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [userID, setUserID] = useState('');
	let history = useHistory();
	const findID_Password = async (e) => {
		e.preventDefault();
		setLoading(true);
		const _type = e.target.forgotIDPassword_type.value;
		console.log(_type);
		console.log('userID: ', userID, 'email: ', email);
		let forgot_info;
		if (_type === FIND_ID) {
			forgot_info = {
				userID: null,
				email: email,
				type: _type
			}
		}
		else if (_type === FIND_PASSWORD) {
			forgot_info = {
				userID: userID,
				email: email,
				type: _type
			}
		}
		await ForgotService.find_ID_password(forgot_info)
			.then(async (res) => {
				console.log(res.data.message)
				if (res.data.message === NOT_FOUND_EMAIL) {
					setLoading(false);
					setAlert(true);
					setAlertMessage({
						body: e_email_notfound,
						forgot: <Link to='/registration'>Sign up for an account.</Link>
					})
					setEmail('');
				}
				// else if (res.data.message === NOT_FOUND_ID) {
				// 	setLoading(false);
				// 	setAlert(true);
				// 	setAlertMessage({
				// 		body: e_userID_notfound,
				// 		forgot: <Link to='/registration'>Sign up for an account.</Link>
				// 	})
				// }
				else if (res.data.message === NOT_FOUND_ID_EMAIL) {
					setLoading(false);
					setAlert(true);
					setAlertMessage({
						body: e_userID_email_notfound,
						forgot: <Link to='/registration'>Sign up for an account.</Link>
					})
					setUserID('');
					setEmail('');
				}
				else if (res.data.message === SEND_EMAIL_SUCCESS) {
					alert('Your ID has been sent to the email you entered.');
					history.push('/login');
				}
				else if (res.data.message === SEND_EMAIL_FAIL) {
					alert('Error has occured, Please try again.');
					history.push('/login');
				}
			})
	}

	useEffect(() => {
		if (isLoggedIn) {
			return history.push('/home');
		}
	}, [])

	const onChangeEmail = (e) => {
		const _email = e.target.value;
		setEmail(_email);
	};

	const onChangeUserID = (e) => {
		const _userID = e.target.value;
		setUserID(_userID);
	};

	return (
		<div className="forgotIDPassword_whole">

			<Tab.Container id="left-tabs-example" defaultActiveKey={type}>
				<Row>
					<Col sm={3}>
						<Nav variant="pills" className="flex-column">
							<Nav.Item>
								<Nav.Link eventKey="id">Find ID</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="password">Reset Password</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey="id">
								<Form onSubmit={findID_Password}>
									<h1> Find User ID</h1>
									<Form.Group controlId="formBasicEmail" as={Col} md={{ span: 6, offset: 3 }}>
										<Form.Label>Email address</Form.Label>
										<Form.Control
											name='forgotIDPassword_input_email'
											type="email"
											placeholder="Enter email"
											value={email}
											onChange={onChangeEmail}
											required />
										<Form.Control value={FIND_ID} NAME="forgotIDPassword_type" hidden />
										<Form.Text className="text-muted">
											Type Email address you entered when you signed up.
    									</Form.Text>
										{showAlert ?
											<Alert variant="danger" onClose={() => setAlert(false)} dismissible>
												<p>
													{alertMessage.body}
												</p>
												<p>
													{alertMessage.forgot}
												</p>
											</Alert>
											: null
										}
										{loading ?
											<Button variant="primary" type="submit">
												<Spinner
													as="span"
													animation="border"
													size="sm"
													role="status"
													aria-hidden="true"
												/>
											</Button>
											: <Button variant="primary" type="submit">
												Submit
											</Button>
										}

									</Form.Group>
								</Form>
							</Tab.Pane>
							<Tab.Pane eventKey="password">
								<Form onSubmit={findID_Password}>
									<h1> Find Password</h1>
									<Form.Group controlId="formBasicEmail" as={Col} md={{ span: 6, offset: 3 }}>
										<Form.Label>User ID</Form.Label>
										<Form.Control
											name='forgotIDPassword_input_userID'
											type="text"
											placeholder="Enter userID"
											value={userID}
											onChange={onChangeUserID}
											required />
										<Form.Text className="text-muted">
											Type User ID you entered when you signed up.
    									</Form.Text>
										<br />
										<Form.Label>Email address</Form.Label>
										<Form.Control
											name='forgotIDPassword_input_email'
											type="email"
											placeholder="Enter email"
											value={email}
											onChange={onChangeEmail}
											required />
										<Form.Text className="text-muted">
											Type Email address you entered when you signed up.
    									</Form.Text>
										<Form.Control value={FIND_PASSWORD} NAME="forgotIDPassword_type" hidden />
										{showAlert ?
											<Alert variant="danger" onClose={() => setAlert(false)} dismissible>
												<p>
													{alertMessage.body}
												</p>
												<p>
													{alertMessage.forgot}
												</p>
											</Alert>
											: null
										}
										{loading ?
											<Button variant="primary" type="submit">
												<Spinner
													as="span"
													animation="border"
													size="sm"
													role="status"
													aria-hidden="true"
												/>
											</Button>
											: <Button variant="primary" type="submit">
												Submit
											</Button>
										}

									</Form.Group>
								</Form>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</div>
	)
}

export default ForgotIDPassword;