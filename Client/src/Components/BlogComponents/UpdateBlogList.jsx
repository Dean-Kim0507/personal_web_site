import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	UNAUTHORIZED
} from "../type";
import {
	SET_MESSAGE
} from "../../Actions/types";

function UpdateBlogList(props) {
	const { message } = useSelector(state => state.message);
	const [pictures, setPictures] = useState([]);
	const [imgUploader, setImgUploader] = useState(false);
	const [imgButton, setImgButton] = useState(true);
	const dispatch = useDispatch();
	const onDrop = picture => {
		setPictures([...pictures, picture]);
	};
	let [retrievedData, setRetrievedData] = useState(null);
	let [title, setTitle] = useState(null);
	let [writer, setWriter] = useState(null);
	let [id, setId] = useState(null);
	let [desc, setDesc] = useState(null);
	const formData = new FormData();
	let temp_data;
	let info =
	{
		id: props.match.params.id,
		writer: props.match.params.author
	}
	let history = useHistory();
	let splittedImagePaths = [];
	let _uploadResult = '';
	let errNum;
	let errPage;

	useEffect(() => {
		if (message == UNAUTHORIZED) {
			dispatch({
				type: SET_MESSAGE,
				payload: null,
			});
			history.push('/login');
		}
	}, [message])


	useEffect(() => {
		axios.post("/blog/retrieveblog", info)
			.then(response => {
				temp_data = response.data;
				if (temp_data.imagespath != null) {
					splittedImagePaths = temp_data.imagespath.split(',');
					for (let a = 0; a < splittedImagePaths.length; a++) {
						splittedImagePaths[a] = splittedImagePaths[a].substring(16, splittedImagePaths[a].length);
					}
					temp_data.imagespath = splittedImagePaths;
				}
				setRetrievedData(temp_data);
				setWriter(temp_data.writer);
				setId(temp_data.blog_id);
				setDesc(temp_data.description);
				setTitle(temp_data.title);
			})
	}, [])

	const showImgUploader = () => {
		setImgUploader(true);
		setImgButton(false);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		formData.append('id', retrievedData.blog_id)
		formData.append('writer', e.target.writer.value);
		formData.append('title', e.target.title.value);
		formData.append('desc', e.target.desc.value);
		//The case, user update Image in blog
		if (pictures.length > 0) {
			for (let i = 0; i < pictures[pictures.length - 1].length; i++) {
				formData.append('images', pictures[pictures.length - 1][i]);
			}
			formData.append('mode', 'update_images');
		}
		//The case, user update without image
		else if (pictures.length === 0 && imgUploader) {
			formData.append('mode', 'update_nonImages');
		}
		// The case, user just want to update text info
		else formData.append('mode', 'update_text');

		console.log(formData);
		await axios.post("/blog/update", formData)
			.then(
				response => {
					console.log(response)
					_uploadResult = response.data;
					if (_uploadResult === 'Update success') history.push('/bloglist');
					else {
						console.log(response.data.original.errno)
						errNum = response.data.original.errno;
						errPage = 'UpdateBlogList.js'
						history.push(`/errorpage/${errNum}/${errPage}`);
					}
				})
			.catch(function (error) {
				console.log(error);
				errNum = '101';
				errPage = 'UpdateBlogList.js'
				history.push(`/errorpage/${errNum}/${errPage}`);
				console.log(error);
			});

	}

	async function handleChange(event) {

		let targetName = event.target.name;
		if (targetName === 'title') setTitle(event.target.value);
		else if (targetName === 'writer') setWriter(event.target.value);
		else if (targetName === 'desc') setDesc(event.target.value);

	}

	return (
		<div className='updateBlogList_whole'>
			<form action='' method="post" encType="multipart/form-data"
				// send the images to Backend Node js express
				onSubmit={onSubmit}>
				{
					retrievedData &&
					<>
						{console.log('return: ' + retrievedData.title)}
						{console.log('return: ' + temp_data)}
						<FormGroup>
							<Label for="title">Title</Label>
							<Input type="text" name="title" placeholder="TITLE" value={title} onChange={handleChange} />
						</FormGroup>
						<FormGroup>
							<Label for="writer">Writer</Label>
							<Input type="text" name="writer" placeholder="NAME" value={writer} onChange={handleChange} />
						</FormGroup>
						<FormGroup>
							<Label for="desc">Text Area</Label>
							<Input type="textarea" name="desc" placeholder="TEXT" value={desc} onChange={handleChange} />
						</FormGroup>
					</>
				}
				{
					imgButton ?
						<Button variant="secondary" onClick={showImgUploader} size="lg" block>
							Update Image
  					</Button>
						: null
				}
				{
					imgUploader ?
						<ImageUploader
							name="imageUploader"
							{...props}
							withIcon={true}
							onChange={onDrop}
							imgExtension={[".jpg", ".gif", ".png", ".gif"]}
							maxFileSize={5242880}
							withPreview={true}
						/>
						: null
				}
				<Button color="primary" type="submit">Submit</Button>
			</form>
		</div >

	);
}



export default UpdateBlogList;