import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CardDeck, Card, Image, ListGroup, Button, Col, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import '../css/MyAccount.css';
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

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setValidated(true);
		}
		else {
			setUserEdit(false);
			event.preventDefault();
			// const user_data = {
			// 	userID: userID,
			// 	password: password,
			// 	firstName: firstName,
			// 	lastName: lastName,
			// 	email: email
			// }
			// dispatch(register(user_data, pictures));
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

	return (
		<CardDeck className="myAccount">
			{userEdit ?

				<Card>
					< Form
						noValidate validated={validated}
						onSubmit={handleSubmit}
					>
						<Col md={{ offset: 1 }}>
							<h2>Hello {user.firstName} {user.lastName}</h2>
						</Col>
						<Col md={{ offset: 1 }}>
							<Image variant="top"
								src={imagePath}
								width={171}
								height={180}
								rounded
							/>
						</Col>
						<Card.Body>
							<Col md={{ span: 10, offset: 0 }}>
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
							<Col md={{ span: 3, offset: 9 }}>
								<Button variant="light" type="submit">Update</Button>
							</Col>
						</Card.Footer>
					</Form>
				</Card>

				: <Card>
					<Col md={{ offset: 1 }}>
						<h2>Hello {user.firstName} {user.lastName}</h2>
					</Col>
					<Col md={{ offset: 1 }}>
						<Image variant="top"
							src={imagePath}
							width={171}
							height={180}
							rounded
						/>
					</Col>
					<Card.Body>
						<Col md={{ span: 10, offset: 0 }}>
							<Card.Text>
								<ListGroup variant="flush">
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
			}

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
		</CardDeck >
	);

}

export default MyAccount;