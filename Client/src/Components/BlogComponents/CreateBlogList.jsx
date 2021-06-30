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
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import '../../css/CreateBlogList.css';
import { useSelector } from "react-redux";
import authHeader from "../../Services/Auth.header";
import {
	BLOG_CREATE_SUCCESS
} from "../type";


function CreateBlogList(props) {
	const { isLoggedIn, user } = useSelector(state => state.auth);
	const [pictures, setPictures] = useState([]);
	const formData = new FormData();
	const IMG_WIDTH = 45;
	const IMG_LENGTH = 50;
	const onDrop = picture => {
		setPictures([...pictures, picture]);
	};
	let history = useHistory();
	let _uploadResult = '';

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoggedIn) {
			formData.append('userID', user.userID);
			formData.append('writer', null);
		}
		else {
			formData.append('writer', e.target.writer.value);
			formData.append('userID', null);
		}
		formData.append('title', e.target.title.value);
		formData.append('desc', e.target.desc.value);
		formData.append('mode', 'create');
		formData.append('isLogedIn', isLoggedIn);

		if (pictures.length > 0) {
			for (let i = 0; i < pictures[pictures.length - 1].length; i++) {
				formData.append('images', pictures[pictures.length - 1][i]);
			}
		}
		if (isLoggedIn) {
			await axios.post("/api/blog/create/logedin", formData
				, {
					headers: authHeader(),
					'content-type': 'multipart/fomr-data'
				})
				.then(
					response => {
						_uploadResult = response.data.message;

						if (_uploadResult === BLOG_CREATE_SUCCESS) history.push('/bloglist');
						else history.push('/errorpage');
					})
				.catch(function (error) {
					console.log(error);
					history.push('/errorpage');
				});
		}
		else {
			const config = {
				headers: { 'content-type': 'multipart/fomr-data' }
			}
			await axios.post("/api/blog/create", formData, config)
				.then(
					response => {
						_uploadResult = response.data.message;
						if (_uploadResult === BLOG_CREATE_SUCCESS) history.push('/bloglist');
						else history.push('/errorpage');
					})
				.catch(function (error) {
					console.log(error);
					alert("File Size is too big.")
					history.push('/errorpage');
				});
		}
	}


	return (
		<div className="createBlog">
			<article>
				<h2>SHARE YOUR AWESOME STORY !</h2>
				<form action='' method="post" encType="multipart/form-data"
					// send the images to Backend Node js express
					onSubmit={handleSubmit}>
					{isLoggedIn ?
						<FormGroup>
							<Label for="writer">Writer</Label>
							<br />
							<Image src={user.profileImg}
								width={IMG_WIDTH}
								height={IMG_LENGTH}
								alt="45x50"
								roundedCircle />
							<label><h3>{user.userID}</h3></label>
							<Input type="text" name="writer" value={user.userID} hidden />
						</FormGroup>
						: <FormGroup>
							<Label for="writer">Writer</Label>
							<Input type="text" name="writer" placeholder="WRITER" />
						</FormGroup>
					}
					<FormGroup>
						<Label for="title">Title</Label>
						<Input type="text" name="title" placeholder="TITLE" />
					</FormGroup>

					<FormGroup>
						<Label for="desc">Text Area</Label>
						<Input type="textarea" name="desc" placeholder="TEXT" style={{ height: '200px' }} />
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