import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CardDeck, Card, Image, ListGroup, Button, Col, Form, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import '../css/MyAccount.css';
import { userUpdate } from "../Actions/auth";
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

function MyAccount(props) {
	const { isLoggedIn, user } = useSelector(state => state.auth);
	const { message } = useSelector(state => state.message);
	const IMG_WIDTH = 171;
	const IMG_LENGTH = 180;
	const mailImagePath = "./uploadImages/icon/mail.jpg";
	const [userEdit, setUserEdit] = useState(false);
	const [validated, setValidated] = useState(false);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [emailInvalid, setEmailInvalid] = useState();
	const [emailFeedBack, setEmailFeedBack] = useState(null);
	const [pictures, setPictures] = useState(null);
	const dispatch = useDispatch();
	let [profileImageURL, setProfileImageURL] = useState(null);
	let imagePath;

	if (!isLoggedIn) {
		return <Redirect to="/home" />;
	}
	else {
		imagePath = user.profileImg;
		if (imagePath != null) {
			imagePath = imagePath.substring(16, imagePath.length);
		}
		else imagePath = "./uploadImages/icon/img_user.jpg"

	}

	const editUser = () => {
		setUserEdit(true);
	}

	const cancelEdit = () => {
		setUserEdit(false);
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.email);
		setProfileImageURL(null);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setValidated(true);
		}
		else {
			setUserEdit(false);
			const user_data = {
				userID: user.userID,
				firstName: firstName,
				lastName: lastName,
				email: email
			}
			console.log(user_data)
			dispatch(userUpdate(user_data, pictures));
		}
		console.log(message)
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
		setProfileImageURL(URL.createObjectURL(picture[0]));
		setPictures(picture[0]);
	}

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
									width={171}
									height={180}
									roundedCircle
								/>
								: <Image variant="top"
									className="myAccount_profileImage"
									src={imagePath}
									width={171}
									height={180}
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
								<Col md={{ span: 10, offset: 8 }}>
									<Button variant="light" type="button" onClick={cancelEdit}>Cancel</Button>
									<Button variant="light" type="submit">Update</Button>
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
							src={imagePath}
							width={171}
							height={180}
							roundedCircle
						/>
						<Card.Body className="myAccount_userInformation_cardText">
							<Col md={{ span: 10, offset: 0 }}>
								<Card.Text >
									<ListGroup variant="flush" className="myAccount_userInformation_listGroup">
										<ListGroup.Item>User ID: <strong>{user.userID}</strong></ListGroup.Item>
										<ListGroup.Item>First Name: <strong>{firstName}</strong></ListGroup.Item>
										<ListGroup.Item>Last Name: <strong>{lastName}</strong></ListGroup.Item>
										<ListGroup.Item>E-Mail: <strong>{email}</strong></ListGroup.Item>
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

			<CardDeck>
				<div className="myAccount_userMenu">
					<Row>
						<Card>
							<Card.Img variant="top"
								src="/uploadImages/icon/reset_password.jpg"
								width={171}
								height={180} />
							<Card.Body>
								<Card.Title>Reset Password</Card.Title>
							</Card.Body>
						</Card>
						<Card>
							<Card.Img variant="top" src="holder.js/100px160" />
							<Card.Body>
								<Card.Title>Card title</Card.Title>
								<Card.Text>
									This is a wider card with supporting text below as a natural lead-in to
									additional content. This content is a little bit longer.
      							</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Last updated 3 mins ago</small>
							</Card.Footer>
						</Card>
					</Row>
					<Row>
						<Card>
							<Card.Img variant="top" src="holder.js/100px160" />
							<Card.Body>
								<Card.Title>Card title</Card.Title>
								<Card.Text>
									This card has supporting text below as a natural lead-in to additional
        content.{' '}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Last updated 3 mins ago</small>
							</Card.Footer>
						</Card>
						<Card>
							<Card.Img variant="top" src="holder.js/100px160" />
							<Card.Body>
								<Card.Title>Card title</Card.Title>
								<Card.Text>
									This is a wider card with supporting text below as a natural lead-in to
									additional content. This card has even longer content than the first to
									show that equal height action.
      </Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Last updated 3 mins ago</small>
							</Card.Footer>
						</Card>
					</Row>
				</div>
			</CardDeck>

		</CardDeck >
	);

}

export default MyAccount;