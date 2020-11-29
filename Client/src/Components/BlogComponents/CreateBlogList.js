/**
 * last updated: Nov 26 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 *
 * This page is the form to create the blog and to send the data to server(blogDataController.js)
 * 
 * Map: RedBlogList, CreateBlogList - > BlogList.js -> Body.js -> index.js - > index.html
 * (Storing to Database) Http: CreateBlogList (Client) -> blogDataController (server)
 * (Retrieving from Database) Http: ReadBlogList (server) - > BlogList.js (Client)
 */

import React, { useState } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import '../../css/CreateBlogList.css';

function CreateBlogList(props) {

	const [pictures, setPictures] = useState([]);
	const formData = new FormData();
	let history = useHistory();
	let _uploadResult = '';
	const onDrop = picture => {
		setPictures([...pictures, picture]);
	};

	return (
		<div className="createBlog">
			<article>
				<h2>My Blog</h2>
				<form action='' method="post" enctype="multipart/form-data"
					// send the images to Backend Node js express
					onSubmit={async function (e) {
						e.preventDefault();
						formData.append('writer', e.target.writer.value);
						formData.append('title', e.target.title.value);
						formData.append('desc', e.target.desc.value);
						formData.append('mode', 'create');
						if (pictures.length > 0) {
							for (let i = 0; i < pictures[pictures.length - 1].length; i++) {
								formData.append('images', pictures[pictures.length - 1][i]);
							}
						}
						console.log(formData);
						const res = await axios.post("/blog/create", formData)
							.then(
								response => {
									_uploadResult = response.data;
									if (_uploadResult === 'Upload success') history.push('/bloglist');
									else history.push('/errorpage');
								})
							.catch(function (error) {
								console.log(error);
							});
					}}>

					<FormGroup>
						<Label for="title">Name</Label>
						<Input type="text" name="title" placeholder="TITLE" />
					</FormGroup>
					<FormGroup>
						<Label for="writer">Title</Label>
						<Input type="text" name="writer" placeholder="NAME" />
					</FormGroup>
					<FormGroup>
						<Label for="desc">Text Area</Label>
						<Input type="textarea" name="desc" placeholder="TEXT" />
					</FormGroup>
					<ImageUploader
						name="imageUploader"
						{...props}
						withIcon={true}
						onChange={onDrop}
						imgExtension={[".jpg", ".gif", ".png", ".gif"]}
						maxFileSize={5242880}
						withPreview={true}
					/>
					<Button color="primary" type="submit">Submit</Button>
				</form>
			</article>
		</div>
	);
}
export default CreateBlogList;