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
import { Card, Carousel, Image, Button } from 'react-bootstrap';
const format = require('date-format');

function ReadBlogList(props) {
	let id = props.id;
	let title = props.title;
	let desc = props.desc;
	let writer = props.writer;
	let imagePathArray = props.imagePathArray;
	let createdAt = format.asString('MM-dd-yyyy', new Date(props.createdAt));
	let updatedAt = format.asString('MM-dd-yyyy', new Date(props.updatedAt));
	let blog_date;
	let nowDate = format.asString('MM-dd-yyyy', new Date());
	let ReadBlogList_keyValue = -1;
	let carousel_control_indicators = true
	let image_path;

	//Decision of showing arrow in the pictures
	if (imagePathArray.length > 1) carousel_control_indicators = true;
	else carousel_control_indicators = false;
	console.log(createdAt, updatedAt, nowDate)

	// Showing the time, blog was added or editted. If blog is added on today, the footer show the time and date.
	if (createdAt === nowDate) blog_date = format.asString('hh:mm MM-dd-yyyy', new Date(props.createdAt));
	else if (updatedAt === nowDate) blog_date = format.asString('(updated) hh:mm MM-dd-yyyy', new Date(props.updatedAt));
	else if (createdAt === updatedAt) blog_date = createdAt;
	else blog_date = updatedAt;

	return (
		<div>
			<Card className="readBlogList_eachCard" style={{ width: '100%' }}>
				<Card.Header>{writer}</Card.Header>
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
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>
						{desc}
					</Card.Text>
				</Card.Body>
				<Card.Footer>

					<br />
					<small className="text-muted">Date: {blog_date}</small>
					<Button className="ReadBlogList_update_button" variant="primary" href={`/bloglist/update/${id}/${writer}`} key={id}>Edit</Button>
				</Card.Footer>
			</Card>
		</div>
	);
}

export default ReadBlogList;