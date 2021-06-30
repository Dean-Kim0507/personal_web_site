import React, { useState, useEffect } from "react";
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../Actions/auth";
import { l_wrongPassword, l_wrongUser } from './message';
import { WRONG_PASSWORD, USER_NOT_FOUND, LOGIN_SUCCESS } from './type';
import '../css/Login.css';

function LoginPage(props) {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(null);
	const [password, setPassword] = useState(null);
	const { isLoggedIn } = useSelector(state => state.auth);
	const { message } = useSelector(state => state.message);
	const [validated, setValidated] = useState(false);
	const [userID, setUserID] = useState(null);


	const dispatch = useDispatch();

	// let _uploadResult;
	// let history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			setLoading(false);
			e.preventDefault();
			e.stopPropagation();
			setValidated(true);
		}
		else {
			dispatch(login(userID, password))
				.catch(() => {
					setLoading(false);
				});
		}

		if (message === WRONG_PASSWORD) {
			setLoading(false);
			setPassword('');
			setUserID('');
		} else if (message === USER_NOT_FOUND) {
			setUserID('');
			setPassword('');
		}
	}

	useEffect(() => {
		if (message === LOGIN_SUCCESS) {
			props.history.push("/home");
			window.location.reload();
		}
		else if (message === WRONG_PASSWORD) {
			setLoading(false);
			setAlert(true);
			setAlertMessage({
				body: l_wrongPassword,
				forgot: <Link to='/forgot/password'>Forgot ID or Password?</Link>
			})
			setPassword('');
			setUserID('');
		}
		else if (message === USER_NOT_FOUND) {
			setLoading(false);
			setAlert(true);
			setAlertMessage({
				body: l_wrongUser,
				forgot: <Link to='/forgot/id'>Forgot ID or Password?</Link>
			})
			setPassword('');
			setUserID('');
		}
	}, [message])
	if (isLoggedIn) {
		return <Redirect to="/home" />;
	}

	const onChangePassword = (e) => {
		const _password = e.target.value;
		setPassword(_password);
	};

	const onChangeUserID = (e) => {
		const _userID = e.target.value;
		setUserID(_userID);
	};

	return (
		<div className="login_whole">
			<h1 className="LoginPage_login">Login</h1>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group >
					<Form.Label>User ID</Form.Label>
					<Form.Control
						name="login_userID"
						type="text"
						placeholder="Enter User ID"
						value={userID}
						onChange={onChangeUserID}
						required />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="login_password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={onChangePassword}
						required />
				</Form.Group>
				{alert &&
					<Alert variant="danger" onClose={() => setAlert(false)} dismissible>
						<p>
							{alertMessage.body}
						</p>
						<p>
							{alertMessage.forgot}
						</p>
					</Alert>
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
						Login
					</Button>
				}

				<p>
					Do you need a new account? <a href="/registration">Register</a> here
				</p>
			</Form>
		</div>
	);
}

export default LoginPage;