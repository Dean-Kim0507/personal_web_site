import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { ListGroup, Modal } from 'react-bootstrap';

function BlogComments(props) {

	let [comments, setComments] = useState(props.comments.slice(1, props.comments.length))
	let key_blogComments = -1;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const delete_comment = () => {

		handleClose();
	}


	return (
		<>
			<ListGroup variant="flush">

				{
					comments.map((data) => {
						key_blogComments = key_blogComments + 1;
						return (
							<ListGroup.Item key={key_blogComments}>{data}
								{
									<Button variant="light" size="sm" onClick={handleShow}>Delete</Button>
								}
							</ListGroup.Item>
						)
					})
				}
			</ListGroup>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete it ?</Modal.Title>
				</Modal.Header>
				<Modal.Body>Comments will be deleted, permanently</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
          			</Button>
					<Button variant="primary" onClick={delete_comment}>
						Delete
          </Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}



export default BlogComments;