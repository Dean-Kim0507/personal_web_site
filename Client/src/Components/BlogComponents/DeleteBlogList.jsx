import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function DeleteBlogList(props) {
	let history = useHistory();
	let errNum;
	let errPage;
	let _uploadResult;
	let info =
	{
		id: props.match.params.id,
		// writer: props.match.params.author
	}
	console.log('deleteBlogList')
	useEffect(() => {
		axios.post("/blog/delete", info)
			.then(response => {
				_uploadResult = response.data;
				console.log('_uploadResult = ', response.data);
				if (_uploadResult === 'Delete success') history.push('/bloglist');
				else {
					console.log(response.data.original.errno)
					errNum = response.data.original.errno;
					errPage = 'DeleteBlogList.js'
					if (errNum != undefined) history.push(`/errorpage/${errNum}/${errPage}`)
					else history.push(`/errorpage/101/${errPage}`)
				}
			})
	}, [])

	return (
		<div>

		</div>
	);
}

export default DeleteBlogList;