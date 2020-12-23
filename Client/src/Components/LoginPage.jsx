import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function LoginPage(props) {
	let _uploadResult;
	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const userID = e.target.login_userID.value;
		const password = e.target.login_password.value;
		const login_Data = {
			userID: userID,
			password: password
		}

		// props.onClick(login_Data);

		axios.post("/login", login_Data)
			.then(
				response => {
					_uploadResult = response.data;
					if (_uploadResult === 'login success') {
						alert(`Hello`);
						history.push('/home');
					}
					else {
						history.push(`/errorpage/${response.status}/${"Registration"}/${response.data}`);
					}
				}
			)
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group >
					<Form.Label>User ID</Form.Label>
					<Form.Control name="login_userID" type="text" placeholder="Enter User ID" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control name="login_password" type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Login
  				</Button>
				<p>
					Do you need a new account? <a href="/registration">Register</a> here
				</p>
			</Form>
		</>
	);
}

export default LoginPage;