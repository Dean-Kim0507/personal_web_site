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
import { Card, Carousel, Image, Button, Accordion, InputGroup, FormControl } from 'react-bootstrap';
import BlogComments from './BlogComments'
import axios from 'axios';
import { useHistory } from "react-router-dom";
const format = require('date-format');

function ReadBlogList(props) {
	let id = props.id;
	let title = props.title;
	let desc = props.desc;
	let writer = props.writer;
	let imagePathArray = props.imagePathArray;
	let createdAt = format.asString('MM-dd-yyyy', new Date(props.createdAt));
	let updatedAt = format.asString('MM-dd-yyyy', new Date(props.updatedAt));
	let comments = props.comments;
	let blog_date;
	let nowDate = format.asString('MM-dd-yyyy', new Date());
	let ReadBlogList_keyValue = -1;
	let carousel_control_indicators = true
	let image_path;
	let _uploadResult = '';
	let history = useHistory();

	let [seeMode, setSeeMode] = useState('See More');
	let [seeMode_commentSubmitButton, setCommentButton] = useState(true);

	const changeSeeMode = () => {
		if (seeMode === 'See More') setSeeMode('See Less');
		else setSeeMode('See More');
	}

	const sendComment = async (e) => {
		e.preventDefault();
		let comment =
		{
			body: e.target.comment_form_control.value,
			id: id
		}
		await axios.post("/blog/comments", comment)
			.then(
				response => {
					_uploadResult = response.data;
					if (_uploadResult === 'Upload success') console.log(_uploadResult);
					else history.push('/errorpage');
				})
			.catch(function (error) {
				console.log(error);
			});
	}

	const commentSubmitButton = (e) => {
		let comment = e.target.value;
		console.log(comment)
		if (comment.length > 0) setCommentButton(false);
		else setCommentButton(true);
	}
	//Decision of showing arrow in the pictures
	if (imagePathArray.length > 1) carousel_control_indicators = true;
	else carousel_control_indicators = false;

	// Showing the time, blog was added or editted. If blog is added on today, the footer show the time and date.
	if (createdAt === nowDate) blog_date = format.asString('hh:mm MM-dd-yyyy', new Date(props.createdAt));
	else if (updatedAt === nowDate) blog_date = format.asString('(updated) hh:mm MM-dd-yyyy', new Date(props.updatedAt));
	else if (createdAt === updatedAt) blog_date = createdAt;
	else blog_date = '(updated) ' + updatedAt;

	return (
		<div>
			<Card key={id} className="readBlogList_eachCard" style={{ width: '100%' }}>
				<Carousel interval={null} controls={carousel_control_indicators} indicators={carousel_control_indicators}>
					{
						imagePathArray.map((data) => {
							ReadBlogList_keyValue = ReadBlogList_keyValue + 1;
							// If user doesn't add any image, show the No_Image.jpg
							if (imagePathArray[0] === "") {
								image_path = "/uploadImages/No_Image.jpg"
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
					<Card.Title>{title}</Card.Title>
					<Card.Text>
						{desc}
					</Card.Text>
					<small className="text-muted">Date: {blog_date}</small>
				</Card.Body>
				<Card.Footer>
					<form action='' method="post" onSubmit={sendComment}>
						<Accordion >
							<Card>
								<Card.Header>
									{comments[0]}
									<Accordion.Toggle as={Button} variant="link" eventKey="0">
										<small onClick={changeSeeMode}>{seeMode}</small>
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<BlogComments comments={comments} />
								</Accordion.Collapse>
								<InputGroup className="comment_input_group">
									<FormControl
										placeholder="Comment"
										aria-label="Comment"
										aria-describedby="blog_comment"
										name="comment_form_control"
										onChange={commentSubmitButton}
									/>
									<InputGroup.Append>
										<Button variant="outline-secondary" type="submit" disabled={seeMode_commentSubmitButton}>Submit</Button>
									</InputGroup.Append>
								</InputGroup>
							</Card>
						</Accordion>
					</form>
					<Button className="ReadBlogList_delete_button" variant="light" href={`/bloglist/delete/${id}/${writer}`} key={id}>Delete</Button>
					<Button className="ReadBlogList_update_button" variant="light" href={`/bloglist/update/${id}/${writer}`} key={id}>Edit</Button>
				</Card.Footer>
			</Card>
		</div>
	);
}

export default ReadBlogList;