import React, { useState, useEffect } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ForgotService from '../Services/Forgot.service';
import '../css/ResetAccount.css';
import {
	v_passwordMessage,
	v_confirmPasswordMessage,
	e_reset_password_token_expired,
	e_reset_password_token_notfound,
	reset_password_success
} from "./message";
import {
	RESET_PASSWORD,
	RESET_PASSWORD_VERIFY_TOKEN,
	TOKEN_EXPIRED,
	TOKEN_NOTFOUND,
	RESET_PASSWORD_SUCCESS
} from "./type";

function ResetAccount(props) {

	const [validated, setValidated] = useState(false);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [confirmPassword_invalid, setConfirmPassword_invalid] = useState();
	const [passwordInvalid, setPasswordInvalid] = useState();
	const token = props.match.params.token;
	const email = props.match.params.email;
	let _password;
	let _confirm_password;
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
			ForgotService.reset_password({
				token: token,
				email: email,
				password: password,
				type: RESET_PASSWORD
			})
				.then(response => {
					console.log(response.data.message);
					if (response.data.message === RESET_PASSWORD_SUCCESS) {
						alert(reset_password_success);
						history.push('/login');
					}
				})
		}
	};
	useEffect(() => {
		ForgotService.reset_password({
			token: token,
			type: RESET_PASSWORD_VERIFY_TOKEN
		})
			.then(response => {
				console.log('response.data: ', response.data)
				if (response.data.message === TOKEN_EXPIRED) {
					alert(e_reset_password_token_expired);
					history.push('/home');
				}
				else if (response.data.message === TOKEN_NOTFOUND) {
					alert(e_reset_password_token_notfound);
					history.push('/home');
				}
			})
		//token 유효하지않으면 팅기게 하기, 로그인하면 팅기게하기
	}, [])

	//validating password, password must be between 8 and 20 letter.
	const onChangePassword = (e) => {
		_password = e.target.value;
		if (_password === undefined || _password.length < 8 || _password.length > 20) {
			setPasswordInvalid(true);
			setPassword(_password);
		}
		else if (confirmPassword !== null && _password !== confirmPassword) {
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
			if (_password !== confirmPassword) {
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
		else if (password !== null && _confirm_password !== password) {
			setConfirmPassword_invalid(true);
			setConfirmPassword(_confirm_password);
		}
		else if (password !== null && _confirm_password === password) {
			setConfirmPassword_invalid(false);
			setConfirmPassword(_confirm_password);
		}
		else {
			setConfirmPassword_invalid(true);
			setConfirmPassword(_confirm_password);
		}
	};

	return (
		<div className="resetAccount_whole">
			< Form
				noValidate validated={validated}
				onSubmit={handleSubmit}
				className="resetAccount_form"
			>
				<h1>Reset Password</h1>
				<hr />
				<Col md={{ offset: 4 }}>
					<Form.Group as={Col} md="4" className="resetAccount_password">
						<Form.Label className="resetAccount_label">Password</Form.Label>
						<Form.Control type="password"
							placeholder="Password"
							onChange={onChangePassword}
							isInvalid={passwordInvalid}
							minLength="8"
							maxLength="20"
							required />
						<Form.Control.Feedback type="invalid">
							{v_passwordMessage}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" className="registration_form_group">
						<Form.Label className="registration_form_label">Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							required
							isInvalid={confirmPassword_invalid}
							onChange={onChangeConfirmPassword}
							minLength="8" maxLength="20"
						/>
						<Form.Control.Feedback type="invalid">
							{v_confirmPasswordMessage}
						</Form.Control.Feedback>
					</Form.Group>
					<Button className="resetAccount_button" type="submit">Set Password</Button>
				</Col>
			</Form >
		</div>
	);
}

export default ResetAccount;