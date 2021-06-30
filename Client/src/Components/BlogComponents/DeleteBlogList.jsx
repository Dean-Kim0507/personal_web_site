import React, { useEffect } from 'react';
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
	useEffect(() => {
		axios.post("/api/blog/delete", info)
			.then(response => {
				_uploadResult = response.data;
				if (_uploadResult === 'Delete success') history.push('/bloglist');
				else {
					history.push(`/errorpage/101/`)
				}
			})
	}, [])

	return (
		<div>

		</div>
	);
}

export default DeleteBlogList;