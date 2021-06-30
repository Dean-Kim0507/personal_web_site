import React, { useState, useEffect } from 'react';
import { Button, Card, Accordion, InputGroup, FormControl, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

function BlogComments(props) {

	let [comments, setComments] = useState([]);
	let [seeMode, setSeeMode] = useState('See More');
	let [seeMode_commentSubmitButton, setCommentButton] = useState(true);
	let [comment_form_control_value, setComment_form_control_value] = useState('');
	let [comment_create_value, setComment_create_value] = useState('');
	let [commentMode, setCommentMode] = useState('innital render');
	let [selectedId, setSelectedId] = useState(null);
	let blog_id = props.id;
	let key_blogComments = -1;
	let raw_comments;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (id) => {
		setShow(true);
		setSelectedId(id);
		console.log(selectedId)
	}

	//create new comment
	const sendComment = (e) => {
		e.preventDefault();
		let comment_value = e.target.comment_form_control.value;
		setCommentMode('create');
		setComment_create_value(comment_value);
		setComment_form_control_value('');
		setCommentButton(true);
	}

	// when comment is empty, submit button is disabled
	const commentSubmitButton = (e) => {
		let comment = e.target.value;
		setComment_form_control_value(comment);
		if (comment.length > 0) setCommentButton(false);
		else setCommentButton(true);
	}

	//Delete comment
	const delete_comment = (e) => {
		e.preventDefault();
		setCommentMode('delete')
		handleClose();
	}
	// Change the mode to see comments
	const changeSeeMode = () => {
		if (seeMode === 'See More') setSeeMode('See Less');
		else setSeeMode('See More');
	}

	//Function to order by time
	const commentReverse = (raw_comments) => {
		let temp_response_data = [];
		if (raw_comments.length !== 0) {
			for (let i = raw_comments.length - 1; i >= 0; i--) {
				temp_response_data.push(raw_comments[i]);
			}
		}
		setComments(temp_response_data);

	}
	// useEffce wiil execute the time, commentMode changes
	useEffect(
		() => {
			if (commentMode !== '') {
				let comment =
				{
					id: selectedId,
					body: comment_create_value,
					blog_id: blog_id,
					commentMode: commentMode
				}
				axios.post("/api/blog/comments", comment)
					.then(response => {
						raw_comments = response.data;
					})
					.then(() => {
						commentReverse(raw_comments);
						setCommentMode('');
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}, [commentMode]);


	return (
		<>
			<form action='' method="post" onSubmit={sendComment}>
				{comments.length === 0 ?
					<InputGroup className="comment_input_group">
						<FormControl
							placeholder="Comment"
							aria-label="Comment"
							aria-describedby="blog_comment"
							name="comment_form_control"
							onChange={commentSubmitButton}
							value={comment_form_control_value}
						/>
						<InputGroup.Append>
							<Button variant="outline-secondary" type="submit" disabled={seeMode_commentSubmitButton}>Submit</Button>
						</InputGroup.Append>
					</InputGroup>
					:
					< Accordion >
						<Card>
							<Card.Header>
								{comments[0].blog_comment}
								{
									(comments.length === 0) ? <small>No comment</small> :
										<>
											<Accordion.Toggle as={Button} variant="link" eventKey="0">
												<small onClick={changeSeeMode}>{seeMode}</small>
											</Accordion.Toggle>
											<Button style={{ position: 'absolute', right: '1vw' }}
												variant="light" size="sm" onClick={() => handleShow(comments[0].id)} className="blogComments_deleteButton">Delete</Button>
										</>
								}
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<ListGroup variant="flush">
									{
										// To show the first comment at the top (first comment is substracted)
										comments.slice(1, comments.length).map((data, i) => {
											key_blogComments = key_blogComments + 1;
											return (
												<ListGroup.Item key={data.id}>{data.blog_comment}
													{
														<Button style={{ position: 'absolute', right: '1vw' }}
															variant="light" size="sm" onClick={() => handleShow(data.id)} className="blogComments_deleteButton">Delete</Button>
													}
												</ListGroup.Item>
											)
										})
									}
								</ListGroup>
							</Accordion.Collapse>
							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Delete it ?</Modal.Title>
								</Modal.Header>
								<Modal.Body> Delete this comment, permanently ?</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Cancel
									</Button>
									<Button variant="primary" onClick={delete_comment}>
										Delete
									</Button>
								</Modal.Footer>
							</Modal>

							<InputGroup className="comment_input_group">
								<FormControl
									placeholder="Comment"
									aria-label="Comment"
									aria-describedby="blog_comment"
									name="comment_form_control"
									onChange={commentSubmitButton}
									value={comment_form_control_value}
								/>
								<InputGroup.Append>
									<Button variant="outline-secondary" type="submit" disabled={seeMode_commentSubmitButton}>Submit</Button>
								</InputGroup.Append>
							</InputGroup>
						</Card>
					</Accordion>
				}
			</form>

		</>
	);
}



export default BlogComments;