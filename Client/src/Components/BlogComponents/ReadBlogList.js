import React, {useState, useEffect} from 'react';
import {Card, CardDeck, Carousel} from 'react-bootstrap';

function ReadBlogList(props) {

	let title = props.title;
	let desc = props.desc;
	let writer = props.writer;
	let imagePathArray = props.imagePathArray;
	let ReadBlogList_keyValue =-1;
	let carousel_control_indicators = true
	let image_path;
	//Decision of showing arrow in the pictures
	if(imagePathArray.length > 1) carousel_control_indicators = true;
	else carousel_control_indicators = false;
	return(
		<div>
			
			<Card style={{ width: '20rem' }}>

			<Carousel interval={null} controls={carousel_control_indicators} indicators ={carousel_control_indicators}>
				{
					imagePathArray.map((data)=>{
						ReadBlogList_keyValue = ReadBlogList_keyValue+1;
						// If user doesn't add a image
						if(imagePathArray[0]===""){
							image_path = "/uploadImages/No_Image.jpg"
						}
						else image_path = data;
						return(
							<Carousel.Item key = {ReadBlogList_keyValue}>
								<img								
								className="blog_images"
								src={image_path}
								alt='BlogImages'
								/>
							</Carousel.Item>
							)						
					})
				}
			</Carousel>	
				<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>
						{desc}
				</Card.Text>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">writer:{writer}</small>
				</Card.Footer>
			</Card>
			
			</div>
	);
}

export default ReadBlogList;