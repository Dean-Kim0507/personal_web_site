import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CardDeck, Card, Image, ListGroup, Button, Col, Form, Row, Alert, Spinner, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import '../css/MyAccount.css';
import { userUpdate, logout } from "../Actions/auth";
import { useHistory } from "react-router-dom";
import {
	d_userMessage,
	d_emailMessage,
	v_passwordMessage,
	v_confirmPasswordMessage,
	v_idMessage,
	v_emailMessage,
	v_fNMessage,
	v_lNMessage,
	user_update,
	delete_user,
	v_session_expired
} from "./message";
import {
	RESET_PASSWORD,
	USER_UPDATE,
	WRONG_PASSWORD,
	USER_NOT_FOUND,
	USER_UPDATE_SUCCESS,
	DELETE_ACCOUNT,
	USER_DELETE_WRONG_PASSWORD,
	DELETE_ACCOUNT_SUCCESS,
	UNAUTHORIZED
} from "./type";
import {
	SET_MESSAGE
} from "../Actions/types";

function MyAccount(props) {
	const { isLoggedIn, user } = useSelector(state => state.auth);
	const { message } = useSelector(state => state.message);
	const IMG_WIDTH = 171;
	const IMG_LENGTH = 180;
	const [userEdit, setUserEdit] = useState(false);
	const [validated, setValidated] = useState(false);
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [emailInvalid, setEmailInvalid] = useState();
	const [emailFeedBack, setEmailFeedBack] = useState(null);
	const [pictures, setPictures] = useState(null);
	const [showResetPassword, setShowResetPassword] = useState(true);
	const [passwordInvalid, setPasswordInvalid] = useState();
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [confirmPassword_invalid, setConfirmPassword_invalid] = useState();
	const [resetPasswordValidated, setResetPasswordValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showDeleteAccountAlert, setShowDeleteAccountAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(null);
	const [showDeleteUser, setShowDeleteUser] = useState(false);
	const wrongPasswordMsg = 'Your password you entered is incorrect.';
	const somethingWrongMsg = 'Something Wrong, Please try again';
	const basicProfileImgPath = "./uploadImages/icon/img_user.jpg";
	const resetPasswordImgPath = "/uploadImages/icon/reset_password.svg";
	const deleteAccountImgPath = "/uploadImages/icon/remove_user.svg";
	const blogImgPath = "/uploadImages/icon/blog.svg";
	const communityImgPath = "/uploadImages/icon/community.svg";

	const dispatch = useDispatch();
	let [profileImageURL, setProfileImageURL] = useState(null);
	// let imagePath = user.profileImg;
	let history = useHistory();
	let _password;
	let _confirm_password;
	useEffect(() => {
		if (message == USER_UPDATE_SUCCESS) {
			setShowResetPassword(true);
			setShowAlert(false);
			setUserEdit(false);
			dispatch({
				type: SET_MESSAGE,
				payload: null,
			});
			setLoading(false);
			alert(user_update);

		}
		else if (message == WRONG_PASSWORD) {
			setLoading(false);
			setAlertMessage(wrongPasswordMsg)
			setShowAlert(true);
			dispatch({
				type: SET_MESSAGE,
				payload: null,
			});
		}
		else if (message == USER_NOT_FOUND) {
			setLoading(false);
			setAlertMessage(somethingWrongMsg)
			setShowAlert(true);
			dispatch({
				type: SET_MESSAGE,
				payload: null,
			});
		}
		else if (message == DELETE_ACCOUNT_SUCCESS) {
			setLoading(false);
			dispatch(logout());
			alert(delete_user);
			history.push('/home');
		}
		else if (message == USER_DELETE_WRONG_PASSWORD) {
			setLoading(false);
			setAlertMessage(wrongPasswordMsg)
			setShowDeleteAccountAlert(true);
			dispatch({
				type: SET_MESSAGE,
				payload: null,
			});
		}
		// else if (message == UNAUTHORIZED) {
		// 	dispatch(logout());
		// 	// history.push('/login');
		// 	props.history.push('/login');
		// 	alert(v_session_expired);

		// }
	})

	useEffect(() => {
		if (pictures != null) {
			setProfileImageURL(URL.createObjectURL(pictures));
		}
	}, [pictures])

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}
	//USER_EDIT METHOD
	const editUser = () => {
		setUserEdit(true);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
	}

	const cancelEdit = () => {
		setUserEdit(false);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setProfileImageURL(null);
		setLoading(false);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
		}
		else {
			setLoading(true);
			const user_data = {
				userID: user.userID,
				firstName: firstName,
				lastName: lastName,
				email: email,
				type: USER_UPDATE
			}
			dispatch(userUpdate(user_data, pictures));
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setProfileImageURL(null);
		}
	}

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
		}
		else {
			setEmailInvalid(false);
			setEmail(e_mail);
		}
	}

	const uploadSingleFile = picture => {
		setPictures(picture[0]);
	}

	//RESET_PASSWORD METHOD
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

	const resetPasswordSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setResetPasswordValidated(true);
		}
		else {
			setLoading(true);
			const user_data = {
				userID: user.userID,
				currentPassword: event.target.myAccount_resetPassword_currentPassword.value,
				newPassword: password,
				type: RESET_PASSWORD
			}
			dispatch(userUpdate(user_data));
		}
	}

	const cancelResetPassword = () => {
		setShowResetPassword(true);
		setPassword(null);
		setConfirmPassword(null);
		setResetPasswordValidated(false);
		setConfirmPassword_invalid(false);
		setPasswordInvalid(false);
	}

	// Delete User account
	const deleteUserAccount = (event) => {
		event.preventDefault();

		setLoading(true);
		const user_data = {
			userID: user.userID,
			password: event.target.myAccount_delete_account.value,
			type: DELETE_ACCOUNT
		}
		dispatch(userUpdate(user_data));

	}
	const deleteUserClose = () => setShowDeleteUser(false);
	const deleteUserShow = () => setShowDeleteUser(true);



	return (
		<CardDeck className="myAccount">
			{userEdit ?
				<div className="myAccount_userInformation">
					<Card >
						< Form
							noValidate validated={validated}
							onSubmit={handleSubmit}
						>
							<h2 id="myAccount_greeting">Hello {user.firstName} {user.lastName}</h2>
							{profileImageURL != null ?
								<Image variant="top"
									className="myAccount_profileImage"
									src={profileImageURL}
									width={IMG_WIDTH}
									height={IMG_LENGTH}
									roundedCircle
								/>
								: <Image variant="top"
									className="myAccount_profileImage"
									src={user.profileImg}
									width={IMG_WIDTH}
									height={IMG_LENGTH}
									roundedCircle
								/>
							}
							<ImageUploader
								className='myAccount_imageUploader'
								buttonText='Edit Photo'
								onChange={uploadSingleFile}
								imgExtension={['.jpg', '.gif', '.png', '.gif']}
								maxFileSize={5242880}
								singleImage={true}
								withIcon={false}
								withPreview={false}
								label={false}
							/>

							<Card.Body>
								<Col md={{ offset: 0 }}>
									<Card.Text>
										<ListGroup variant="flush">
											<ListGroup.Item>User ID: <strong>{user.userID}</strong></ListGroup.Item>
											<ListGroup.Item>
												<Form.Group controlId="myAccount_firstName">
													<Form.Label>First name:</Form.Label>
													<Form.Control
														required
														type="text"
														placeholder="First name"
														value={firstName}
														onChange={onChangeFirstName}
														maxLength="100"
													/>
													<Form.Control.Feedback type="invalid">
														{v_fNMessage}
													</Form.Control.Feedback>
												</Form.Group>
											</ListGroup.Item>
											<ListGroup.Item>
												<Form.Group controlId="myAccount_lastName">
													<Form.Label>Last name:</Form.Label>
													<Form.Control
														required
														type="text"
														value={lastName}
														placeholder="Last name"
														onChange={onChangeLastName}
														maxLength="100"
													/>
													<Form.Control.Feedback type="invalid">
														{v_lNMessage}
													</Form.Control.Feedback>
												</Form.Group>
											</ListGroup.Item>
											<ListGroup.Item>
												<Form.Group controlId="email">
													<Form.Label>Email address:</Form.Label>
													<Form.Control
														type="email"
														placeholder="Email address"
														value={email}
														onChange={onChangeEmail}
														isInvalid={emailInvalid}
														maxLength="200"
														required />
													<Form.Control.Feedback type="invalid">
														{emailFeedBack}
													</Form.Control.Feedback>
												</Form.Group>
											</ListGroup.Item>
										</ListGroup>
									</Card.Text>
								</Col>
							</Card.Body>
							<Card.Footer>
								<Col md={{ span: 10, offset: 7 }}>
									<Button variant="light" type="button" onClick={cancelEdit}>Cancel</Button>
									{loading ?
										<Button variant="light" type="submit"><Spinner animation="border" size="sm" /></Button>
										: <Button variant="light" type="submit">Update</Button>
									}
								</Col>
							</Card.Footer>
						</Form>
					</Card>
				</div>

				: <div className="myAccount_userInformation">
					<Card >
						<h2>Hello {user.firstName} {user.lastName}</h2>
						<Image variant="top"
							className="myAccount_profileImage"
							src={user.profileImg}
							width={IMG_WIDTH}
							height={IMG_LENGTH}
							roundedCircle
						/>
						<Card.Body className="myAccount_userInformation_cardText">
							<Col md={{ span: 10, offset: 0 }}>
								<Card.Text >
									<ListGroup variant="flush" className="myAccount_userInformation_listGroup">
										<ListGroup.Item>User ID: <strong>{user.userID}</strong></ListGroup.Item>
										<ListGroup.Item>First Name: <strong>{user.firstName}</strong></ListGroup.Item>
										<ListGroup.Item>Last Name: <strong>{user.lastName}</strong></ListGroup.Item>
										<ListGroup.Item>E-Mail: <strong>{user.email}</strong></ListGroup.Item>
									</ListGroup>
								</Card.Text>
							</Col>
						</Card.Body>

						<Card.Footer>
							<Col md={{ span: 3, offset: 10 }}>
								<Button variant="light" onClick={editUser}>Edit</Button>
							</Col>
						</Card.Footer>
					</Card>
				</div>
			}

			{showResetPassword ?
				<CardDeck>
					<div className="myAccount_userMenu">
						<Row className="myAccount_userMenu_firstLine">
							<Card
								className='myAccount_resetPassword'
								onClick={() => setShowResetPassword(false)}
							>
								<Card.Img variant="top"
									src={resetPasswordImgPath}
									width={IMG_WIDTH}
									height={IMG_LENGTH} />
								<Card.Body>
									<Card.Title>Reset Password</Card.Title>
								</Card.Body>
							</Card>
							<Card
								className='myAccount_deleteUser'
								onClick={deleteUserShow}
							>
								<Card.Img variant="top"
									className="myAccount_resetPassword_img"
									src={deleteAccountImgPath}
									width={IMG_WIDTH}
									height={IMG_LENGTH} />
								<Card.Body>
									<Card.Title>Delete Account</Card.Title>
								</Card.Body>
							</Card>
						</Row>
						<Row className='myAccount_userMenu_secondLine'>
							<Card
								className='myAccount_blog'
								onClick={() => history.push('/bloglist')} >
								<Card.Img variant="top"
									src={blogImgPath}
									width={IMG_WIDTH}
									height={IMG_LENGTH} />
								<Card.Body>
									<Card.Title>Go to Blog</Card.Title>
								</Card.Body>
							</Card>
							<Card
								className='myAccount_community'
								onClick={() => history.push('/community')} >
								<Card.Img variant="top"
									src={communityImgPath}
									width={IMG_WIDTH}
									height={IMG_LENGTH} />
								<Card.Body>
									<Card.Title>Go to Community</Card.Title>
								</Card.Body>
							</Card>
						</Row>
					</div>
				</CardDeck>

				:
				<Form className='myAccount_resetPassword_form'
					noValidate validated={resetPasswordValidated}
					onSubmit={resetPasswordSubmit}>
					<h1>Reset Password</h1>
					<Form.Group>
						<Form.Label >
							Current Password
						</Form.Label>
						<Form.Control type="password" placeholder="Current Password"
							name="myAccount_resetPassword_currentPassword" />
					</Form.Group>
					<Form.Group className="myAccount_resetPassword_form_password">
						<Form.Label className="myAccount_resetPassword_form_password_label">New Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="New Password"
							onChange={onChangePassword}
							isInvalid={passwordInvalid}
							minLength="8"
							maxLength="20"
							required />
						<Form.Control.Feedback type="invalid">
							{v_passwordMessage}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="myAccount_resetPassword_form_repeatedPassword">
						<Form.Label className="myAccount_resetPassword_form_repeatedPassword_label">New Password Repeated</Form.Label>
						<Form.Control
							type="password"
							placeholder="New Password Repeated"
							required
							isInvalid={confirmPassword_invalid}
							onChange={onChangeConfirmPassword}
							minLength="8" maxLength="20"
						/>
						<Form.Control.Feedback type="invalid">
							{v_confirmPasswordMessage}
						</Form.Control.Feedback>
					</Form.Group>
					<Col md={{ span: 10, offset: 8 }}>
						<Button variant="light" type="button" onClick={cancelResetPassword}>Cancel</Button>
						{loading ?
							<Button variant="light" type='submit'><Spinner animation="border" size="sm" /></Button>
							: <Button variant="light" type='submit'>Update</Button>
						}
					</Col>
					<Alert
						className="myAccount_resetPassword_alert"
						show={showAlert}
						variant={'danger'}
						onClose={() => setShowAlert(false)} dismissible>
						{alertMessage}
					</Alert>
				</Form>
			}
			<Modal show={showDeleteUser} onHide={deleteUserClose}>
				<Modal.Header closeButton>
					<Modal.Title>DELETE ACCOUNT</Modal.Title>
				</Modal.Header>
				<Form onSubmit={deleteUserAccount}>
					<Modal.Body>
						<p>Do you want to delete this account, permanently?</p>

						<Form.Group>
							<Form.Label >
								Password
							</Form.Label>
							<Form.Control type="password" placeholder="Password"
								name="myAccount_delete_account"
								required />
						</Form.Group>
						<Alert
							className="myAccount_delete_account_alert"
							show={showDeleteAccountAlert}
							variant={'danger'}
							onClose={() => setShowDeleteAccountAlert(false)} dismissible>
							{alertMessage}
						</Alert>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={deleteUserClose}>
							Close
						</Button>
						{loading ?
							<Button variant="danger" type="submit">
								<Spinner animation="border" size="sm" />
							</Button>
							: <Button variant="danger" type="submit">
								DELETE ACCOUNT
							</Button>
						}

					</Modal.Footer>
				</Form>
			</Modal>
		</CardDeck >


	);

}

export default MyAccount;