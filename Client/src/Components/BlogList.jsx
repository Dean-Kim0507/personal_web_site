/**
 * last updated: Nov 26 2020
 * Author: Dean Kim (dean.kim0507@gmail.com)
 * 
 * This page shows the bloglist by using modal in bootstrap.
 * modal get the card that is included images and blog information from the Read Blog List.
 * user can click the thumbnails that's the first picture of pictures, user upladed
 * If user didn't upload any image, No Image file will be uploaded
 * 
 * Map: RedBlogList, CreateBlogList - > BlogList.js -> Body.js -> index.js - > index.html
 * (Storing to Database) Http: CreateBlogList (Client) -> blogDataController (server)
 * (Retrieving from Database) Http: ReadBlogList (server) - > BlogList.js (Client)
 */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, CardColumns, Badge } from 'react-bootstrap';
import '../css/BlogList.css'
import axios from 'axios';
import ReadBlogList from './BlogComponents/ReadBlogList';
const format = require('date-format');

function BlogList(props) {

	let splittedImagePaths;
	let splittedImagePaths_preview;
	let temp_allBlogs = [];
	let [allBlogs, setAllBlogs] = useState([]);
	let nowDate = format.asString('MM-dd-yyyy', new Date());
	const [show, setShow] = useState(false);
	const [data, setData] = useState(null);
	const [images, setImages] = useState(null);
	const handleClose = () => setShow(false);

	// When user select the thumbnail, that function will be worked for retrieving the selected blog,
	const handleShow = (data) => {
		setShow(true);
		setData(data);

		//If over two images, it splits the images' paths
		splittedImagePaths = data.imagePaths.split(',');
		for (let a = 0; a < splittedImagePaths.length; a++) {
			splittedImagePaths[a] = splittedImagePaths[a].substring(16, splittedImagePaths[a].length);
			console.log(splittedImagePaths[a]);
		}
		setImages(splittedImagePaths);
	}
	//Integreate two object (blog information, blog comments)
	useEffect(() => {
		axios.post("/blog/list")
			.then(response => {
				console.log(response.data);
				//to show current blog at the first.
				for (let i = response.data.length - 1; i >= 0; i--) {
					let temp_data = {
						id: Number,
						writer: String,
						title: String,
						desc: String,
						imagePaths: String,
						createdAt: String,
						updatedAt: String
					}
					temp_data.id = Number.parseInt(response.data[i].id);
					temp_data.writer = response.data[i].writer;
					temp_data.title = response.data[i].title;
					temp_data.desc = response.data[i].desc;
					temp_data.imagePaths = response.data[i].imagePaths;
					temp_data.createdAt = response.data[i].createdAt;
					temp_data.updatedAt = response.data[i].updatedAt;
					temp_allBlogs.push(temp_data);
				}
				setAllBlogs(temp_allBlogs);
			})
	}, []);

	return (
		<div className="blogList_whole">
			<Button className="blogList_addBlog_button" variant="primary" href='/bloglist/create'>Add Blog</Button>
			<hr />

			<div className="blogList_list">
				<CardColumns>
					{
						allBlogs.map((data) => {
							splittedImagePaths_preview = data.imagePaths.split(',');
							splittedImagePaths_preview[0] = splittedImagePaths_preview[0].substring(16, splittedImagePaths_preview[0].length);
							console.log(splittedImagePaths_preview[0])
							if (splittedImagePaths_preview[0] === "") splittedImagePaths_preview[0] = "/uploadImages/No_Image.jpg";

							return (
								splittedImagePaths_preview[0] &&
								<Card className="blogList_thumbnail" key={data.id}>
									<Card.Header>
										{data.title}
										{
											format.asString('MM-dd-yyyy', new Date(data.createdAt)) === nowDate ? <Badge variant="secondary">New</Badge> : null
										}
									</Card.Header>
									<Card.Img
										alt="171x180"
										src={splittedImagePaths_preview[0]}
										onClick={() => handleShow(data)}
									/>
								</Card>
							);
						})
					}
				</CardColumns>

				{data &&
					< Modal show={show} onHide={handleClose} className="blogList_modal"
						centered={true} size={'lg'}
					>
						<Modal.Header closeButton>{data.writer}</Modal.Header>
						<ReadBlogList id={data.id}
							title={data.title}
							desc={data.desc}
							imagePathArray={images}
							createdAt={data.createdAt}
							updatedAt={data.updatedAt}
							className="blogList_detailedBlog"
						>
						</ReadBlogList>
					</Modal>
				}
			</div>
		</div >
	);
}

export default BlogList;