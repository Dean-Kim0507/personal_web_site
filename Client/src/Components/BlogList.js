import React, {useState, useEffect} from 'react';
import {Carousel, Button, Image, Card, CardDeck, ListGroup, CardColumns} from 'react-bootstrap';
import '../css/BlogList.css'
import axios from 'axios';
import ReadBlogList from './BlogComponents/ReadBlogList';

function BlogList(props){

	let splittedImagePaths
	let readBloglist_KeyValue = -1;

	let [allBlogs, setAllBlogs] = useState([]);

	useEffect(()=>{
		const res =  axios.post("/blog/list")
		.then (async response => {
			await console.log(response.data);
			await setAllBlogs(response.data);
			
		})
	}, []);

	return(
		<div className="blog_list">
			{
				allBlogs.map((data) => {
					
					splittedImagePaths = data.imagePaths.split(',');
					for(let a= 0; a < splittedImagePaths.length; a++){
						splittedImagePaths[a] = splittedImagePaths[a].substring(16, splittedImagePaths[a].length);
						console.log(splittedImagePaths[a]);
					}
					readBloglist_KeyValue = readBloglist_KeyValue+1;
					return(
					<ReadBlogList key={readBloglist_KeyValue} writer={data.writer} title={data.title} desc={data.desc} imagePathArray={splittedImagePaths}></ReadBlogList>
					);
					
				})
				
			}
			{console.log(allBlogs)}
			<Button variant="primary" href='/bloglist/create'>Add Blog</Button>
		</div>

	)

}

export default BlogList;