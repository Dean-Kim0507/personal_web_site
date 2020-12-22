import React, { useState } from "react";
import { Button, Form, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Register(props) {
	const [validated, setValidated] = useState(false);
	const [userID, setUserId] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [confirmPassword_invalid, setConfirmPassword_invalid] = useState();
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [userIdFeedBack, setUserIdFeedBack] = useState(null);
	const [userIdInvalid, setUserIdInvalid] = useState();
	const [passwordInvalid, setPasswordInvalid] = useState();

	let _userID;
	let _password;
	let _confirm_password;
	let _uploadResult;
	let history = useHistory();

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
		}
		else {
			event.preventDefault();
			const user_data = {
				userID: userID,
				password: password,
				firstName: firstName,
				lastName: lastName,
				email: email
			}
			axios.post("/registration", user_data)
				.then(
					response => {
						_uploadResult = response.data;
						if (_uploadResult === 'Registration success') {
							alert("Signing Up Success! Please Login Again");
							history.push('/login');
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

	};

	const onChangeUserID = (e) => {
		_userID = e.target.value;
		if (_userID === undefined || _userID.length < 8 || _userID.length > 20) {
			setUserIdInvalid(true);
			setUserIdFeedBack("Please choose a user ID with 8 to 20 characters.");
		}
		else {
			setUserIdInvalid(false);
			setUserId(_userID);
		}
	};

	//validating password, password must be between 8 and 20 letter.
	const onChangePassword = (e) => {
		_password = e.target.value;
		if (_password === undefined || _password.length < 8 || _password.length > 20) {
			setPasswordInvalid(true);
			setPassword(_password);
		}
		else if (confirmPassword != null && _password != confirmPassword) {
			setPasswordInvalid(false);
			setConfirmPassword_invalid(true);
			setPassword(_password);
		}
		else if (confirmPassword != null && _password === confirmPassword) {
			setPasswordInvalid(false);
			setConfirmPassword_invalid(false);
			setPassword(_password);
		}
		else {
			setPasswordInvalid(() => false);
			setPassword(_password);
			if (_password != confirmPassword) {
				setConfirmPassword_invalid(true);
			}
		}
	};
	//validating confirm password, confirm password must be between 8 and 20 letter and the same as password.
	const onChangeConfirmPassword = (e) => {

		_confirm_password = e.target.value;
		if (_confirm_password === undefined || _confirm_password.length < 8 || _confirm_password.length > 20) {
			setConfirmPassword_invalid(true);
			setConfirmPassword(_confirm_password);
		}
		else if (password != null && _confirm_password != password) {
			setConfirmPassword_invalid(true);
			setConfirmPassword(_confirm_password);
		}
		else if (password != null && _confirm_password === password) {
			setConfirmPassword_invalid(false);
			setConfirmPassword(_confirm_password);
		}
		else {
			setConfirmPassword_invalid(true);
			setConfirmPassword(_confirm_password);
		}
	};
	//First name, last name, email are required
	const onChangeFirstName = (e) => {
		const first_Name = e.target.value;
		setFirstName(first_Name);
	};

	const onChangeLastName = (e) => {
		const last_Name = e.target.value;
		setLastName(last_Name);
	};

	const onChangeEmail = (e) => {
		const e_mail = e.target.value;
		setEmail(e_mail);
	}

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group as={Col} md="4" controlId="userId">
				<Form.Label>User ID</Form.Label>
				<Form.Control type="text" placeholder="User ID" onChange={onChangeUserID} isInvalid={userIdInvalid} minLength="8" maxLength="20" required />
				<Form.Control.Feedback type="invalid">
					{userIdFeedBack}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" onChange={onChangePassword} isInvalid={passwordInvalid} minLength="8" maxLength="20" required />
				<Form.Control.Feedback type="invalid">
					Please choose a new password with at least 8 characters
          		</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="confirm_password">
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Confirm Password"
					required
					isInvalid={confirmPassword_invalid}
					onChange={onChangeConfirmPassword}
					minLength="8" maxLength="20"
				/>
				<Form.Control.Feedback type="invalid">
					Please choose a new password with at least 8 characters and make sure this matches your password.
          		</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="firstName">
				<Form.Label>First name</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="First name"
					onChange={onChangeFirstName}
				/>
				<Form.Control.Feedback type="invalid">
					Please provide a valid First Name.
					</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="lastName">
				<Form.Label>Last name</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Last name"
					onChange={onChangeLastName}
				/>
				<Form.Control.Feedback type="invalid">
					Please provide a valid Last Name.
				</Form.Control.Feedback>
			</Form.Group>


			<Form.Group as={Col} md="4" controlId="email">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Email address" onChange={onChangeEmail} required />
				<Form.Control.Feedback type="invalid">
					Please provide a valid Email.
         		</Form.Control.Feedback>
			</Form.Group>
			<Button type="submit">Submit</Button>

		</Form>
	);
}

export default Register;