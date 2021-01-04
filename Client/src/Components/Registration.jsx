import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Col, Figure } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/auth";
import ImageUploader from 'react-images-upload';
import {
	d_userMessage,
	d_emailMessage,
	v_passwordMessage,
	v_confirmPasswordMessage,
	v_idMessage,
	v_emailMessage,
	v_fNMessage,
	v_lNMessage
} from "./message";

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
	const [emailFeedBack, setEmailFeedBack] = useState(null);
	const [userIdInvalid, setUserIdInvalid] = useState();
	const [emailInvalid, setEmailInvalid] = useState();
	const [passwordInvalid, setPasswordInvalid] = useState();
	const [pictures, setPictures] = useState(null);
	const dispatch = useDispatch();
	const { message } = useSelector(state => state.message);
	const IMG_WIDTH = 171;
	const IMG_LENGTH = 180;

	let [profileImageURL, setProfileImageURL] = useState(null);
	let _userID;
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
			const user_data = {
				userID: userID,
				password: password,
				firstName: firstName,
				lastName: lastName,
				email: email
			}
			dispatch(register(user_data, pictures));
		}
	};

	useEffect(() => {

		if (message === 'Registration success') {
			alert("Signing Up Success! Please Login Again");
			history.push('/login');
		}
		else {
			// console.log(response.data);
			if (message == 'userID, email duplication') {
				setUserIdInvalid(true);
				setUserIdFeedBack(d_userMessage);
				setEmailInvalid(true);
				setEmailFeedBack(d_emailMessage);
			}
			else if (message == 'userID duplication') {
				setUserIdInvalid(true);
				setUserIdFeedBack(d_userMessage);
				setEmailInvalid(false);
			}
			else if (message == 'email duplication') {
				setEmailInvalid(true);
				setEmailFeedBack(d_emailMessage);
				setUserIdInvalid(false);
			}
			else {
				console.log('error: ', message)
			}
		}
	})

	const uploadSingleFile = picture => {
		setProfileImageURL(URL.createObjectURL(picture[0]));
		setPictures(picture[0]);
	}

	const onChangeUserID = (e) => {
		_userID = e.target.value;
		if (_userID === undefined || _userID.length < 8 || _userID.length > 20) {
			setUserIdInvalid(true);
			setUserIdFeedBack(v_idMessage);
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
		const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if (!regExp.test(e_mail)) {
			setEmailInvalid(true);
			setEmailFeedBack(v_emailMessage);
			console.log('email false')
		}
		else {
			setEmailInvalid(false);
			setEmail(e_mail);
			console.log('email true')
		}
	}

	return (
		< Form
			noValidate validated={validated}
			onSubmit={handleSubmit}
		>
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
					{v_passwordMessage}
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
					{v_confirmPasswordMessage}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="firstName">
				<Form.Label>First name</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="First name"
					onChange={onChangeFirstName}
					maxLength="100"
				/>
				<Form.Control.Feedback type="invalid">
					{v_fNMessage}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="lastName">
				<Form.Label>Last name</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Last name"
					onChange={onChangeLastName}
					maxLength="100"
				/>
				<Form.Control.Feedback type="invalid">
					{v_lNMessage}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group as={Col} md="4" controlId="email">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Email address"
					onChange={onChangeEmail}
					isInvalid={emailInvalid}
					maxLength="200"
					required />
				<Form.Control.Feedback type="invalid">
					{emailFeedBack}
				</Form.Control.Feedback>
			</Form.Group>

			{ profileImageURL ?
				<Figure>
					<Figure.Image
						width={IMG_WIDTH}
						height={IMG_LENGTH}
						alt="171x180"
						src={profileImageURL}
					/>
					<Figure.Caption>
						Profile Image
					</Figure.Caption>
				</Figure>
				: <Figure>
					<Figure.Image
						width={IMG_WIDTH}
						height={IMG_LENGTH}
						alt="171x180"
						src="./uploadImages/img_user.jpg"
					/>
					<Figure.Caption>
						Profile Image
					</Figure.Caption>
				</Figure>
			}
			<ImageUploader
				buttonText='Choose Profile Image'
				onChange={uploadSingleFile}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				singleImage={true}
				withIcon={false}
				withPreview={false}
			/>

			<Button type="submit">Submit</Button>

		</Form >

	);
}

export default Register;