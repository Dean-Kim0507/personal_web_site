import React, { Component, useState, useEffect } from 'react';
import { Button, Image, Card, CardDeck, ListGroup, CardColumns } from 'react-bootstrap';
import '../css/Home.css';
import myPicutre from '../images/myPicture/HomeMyPicture.jpg';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	UNAUTHORIZED
} from "./type";
import {
	SET_MESSAGE
} from "../Actions/types";
function Home(props) {

	const { message } = useSelector(state => state.message);
	const dispatch = useDispatch();
	let history = useHistory();
	// useEffect(() => {
	// 	if (message == UNAUTHORIZED) {
	// 		dispatch({
	// 			type: SET_MESSAGE,
	// 			payload: null,
	// 		});
	// 		history.push('/login');
	// 	}
	// }, [message])

	return (
		<div className="container_home">
			<Card className="bg-dark text-black" text="dark">
				<Card.Img src={myPicutre} alt="Home image" />
				<Card.ImgOverlay>
					<Card.Title><h1>Coming Soon</h1></Card.Title>
					<Card.Text >
						Developing..
					</Card.Text>
				</Card.ImgOverlay>
			</Card>
			<hr />
			<Card className="text-center">
				<Card.Header>My Skills</Card.Header>
				<Card.Body>
					<Card.Title>Software & Web Development</Card.Title>
					<Card.Text>
						<CardColumns>
							<Card
								bg='warning'
								text='white'
								style={{ width: '18rem' }}
								className="mb-2"
							>
								<Card.Header>Development</Card.Header>
								<Card.Body>
									<Card.Title> Java,  Python </Card.Title>
									<Card.Title> HTML, CSS </Card.Title>
									<Card.Title> Java Script, NodeJS </Card.Title>
									<Card.Title> Adobe XD</Card.Title>
								</Card.Body>
							</Card>
							<Card
								bg='danger'
								text='white'
								style={{ width: '18rem' }}
								className="mb-2"
							>
								<Card.Header>Frame Work</Card.Header>
								<Card.Body>
									<Card.Title> ReactJS </Card.Title>
									<Card.Title> NodeJs Express</Card.Title>
								</Card.Body>
							</Card>
							<Card
								bg='info'
								text='white'
								style={{ width: '18rem' }}
								className="mb-2"
							>
								<Card.Header>Data Base</Card.Header>
								<Card.Body>
									<Card.Title> SQL PLUS </Card.Title>
									<Card.Title> MY SQL </Card.Title>
									<Card.Title> PL / SQL </Card.Title>

								</Card.Body>
							</Card>
						</CardColumns>
					</Card.Text>
					<Button variant="primary" href='/resume'>My Resume</Button>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Home;