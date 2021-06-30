/**
 * last updated: Nov 26 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This page return the selected blog images and information to Modal in blogList page.
 * Props get the information and images from blogList and put in to the card(bootstrap) and carousel, then returned to modal in BlogList.
 * About date, if created date is today, it shows with time and date, if not, it shows just date. 
 * 
 * Map: RedBlogList, CreateBlogList - > BlogList.js -> Body.js -> index.js - > index.html
 * (Storing to Database) Http: CreateBlogList (Client) -> blogDataController (server)
 * (Retrieving from Database) Http: ReadBlogList (server) - > BlogList.js (Client)
 */

import React, { useState, useEffect } from 'react';
import { Card, Carousel, Image, Button, Modal } from 'react-bootstrap';
import BlogComments from './BlogComments'
import { useSelector } from "react-redux";

function ReadBlogList(props) {
	const id = props.id;
	const title = props.title;
	const desc = props.desc;
	const writer = props.writer;
	const userID = props.userID;
	const isLogedIn = props.isLogedIn;
	const { user } = useSelector(state => state.auth);
	const [show, setShow] = useState(false);
	const [showEditButton, setShowEditButton] = useState(true);
	const [updatePath, setUpdatePath] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const format = require('date-format');
	let imagePathArray = props.imagePathArray;
	let createdAt = format.asString('MM-dd-yyyy', new Date(props.createdAt));
	let updatedAt = format.asString('MM-dd-yyyy', new Date(props.updatedAt));
	let blog_date;
	let nowDate = format.asString('MM-dd-yyyy', new Date());
	let ReadBlogList_keyValue = -1;
	let carousel_control_indicators = true
	let image_path;

	useEffect(() => {
		if (isLogedIn) {
			setUpdatePath(`/blogupdate/${id}/${writer}`);
			if (user !== null) {
				if (user.userID !== userID) {
					setShowEditButton(false);
				}
				else {
					setShowEditButton(true);
				}
			}
			else {
				setShowEditButton(false)
			}
		}
		else setUpdatePath(`/blogupdate/${id}/${userID}`);
	}, [])

	//Decision of showing arrow in the pictures
	if (imagePathArray.length > 1) carousel_control_indicators = true;
	else carousel_control_indicators = false;

	// Showing the time, blog was added or editted. If blog is added on today, the footer show the time and date.
	if (createdAt === nowDate) blog_date = format.asString('hh:mm MM-dd-yyyy', new Date(props.createdAt));
	else if (updatedAt === nowDate) blog_date = format.asString('hh:mm MM-dd-yyyy (Edited)', new Date(props.updatedAt));
	else if (createdAt === updatedAt) blog_date = createdAt;
	else blog_date = updatedAt + ' (Edited)';

	return (
		<div>
			<Card key={id} className="readBlogList_eachCard" style={{ width: '100%' }}>
				<Carousel interval={null} controls={carousel_control_indicators} indicators={carousel_control_indicators}>
					{
						imagePathArray.map((data) => {
							ReadBlogList_keyValue = ReadBlogList_keyValue + 1;
							// If user doesn't add any image, show the No_Image.jpg
							if (imagePathArray[0] === "null") {
								image_path = "https://dean-website.s3.ca-central-1.amazonaws.com/myblog/icons/No_Image.jpg"
							}
							else image_path = data;
							return (
								<Carousel.Item key={ReadBlogList_keyValue}>
									<Image
										className="readBlogList_blogImages"
										src={image_path}
										alt='BlogImages'
									/>
								</Carousel.Item>
							)
						})
					}
				</Carousel>
				<Card.Body >
					<Card.Title>
						{title}
					</Card.Title>
					<Card.Text>
						{desc}
					</Card.Text>
					<small className="text-muted">Date: {blog_date}</small>
				</Card.Body>
				<Card.Footer>

					<BlogComments id={id} />
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Delete it ?</Modal.Title>
						</Modal.Header>
						<Modal.Body> Delete this comment, permanently ?</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="primary" href={`/bloglist/delete/${id}`} key={id}>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>

					{showEditButton ?
						<>
							<Button className="ReadBlogList_update_button"
								style={{ margin: '1vh 1vh 0 0' }}
								variant="light" href={updatePath} key={id}>Edit</Button>
							<Button
								style={{ margin: '1vh 1vh 0 0' }}
								className="ReadBlogList_delete_button" variant="light" onClick={handleShow} key={id}>Delete</Button>
						</>
						: null
					}
				</Card.Footer>
			</Card>
		</div>
	);
}

export default ReadBlogList;