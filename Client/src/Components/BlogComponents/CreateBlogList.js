import React, {useState} from 'react';
import { Button, FormGroup, Label, Input, Alert} from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import '../../css/Blog.css';


function CreateBlogList(props){
	// const [img, setImage] = useState(null);
	// const [result, setResult] = useState(null);
	const [pictures, setPictures] = useState([]);
	const formData = new FormData();
	let history = useHistory();
	let _uploadResult='';
	 const onDrop = picture => {
		setPictures([...pictures, picture]);
	  };
	  console.log(pictures);

	//  const onClick = async () => {
	// 	 if(pictures.length>0){
	// 	 for(let i=0; i<pictures[pictures.length-1].length; i++){
	// 	formData.append('image', pictures[pictures.length-1][i]);
	// 	}
	// 	const res = await axios.post("/blog/create/upload", formData);
	//   }
	// }
  
	return(
		<div className="blog">
			<article>
			  <h2>My Blog</h2>
			  <form action='' method="post" enctype="multipart/form-data"
			  onSubmit={async function(e){
				  e.preventDefault();
				// if(e.target.writer.value != '' && e.target.title.value != '' && e.target.desc.value !=''){
					formData.append('writer', e.target.writer.value);
					formData.append('title', e.target.title.value);
					formData.append('desc', e.target.desc.value);
					formData.append('mode','create');
					if(pictures.length>0){
						for(let i=0; i<pictures[pictures.length-1].length; i++){
							formData.append('images', pictures[pictures.length-1][i]);
					}
					}
					console.log(formData);
					// console.log(e.target.writer.value);
					// console.log(e.target.title.value);
					// console.log(e.target.desc.value);
					const res = await axios.post("/blog/create", formData)
					.then(
						response =>{
							_uploadResult = response.data;
							if(_uploadResult ==='Upload success') history.push('/bloglist');
							else history.push('/errorpage');
						
					})
					.catch(function (error) {
						console.log(error);
						});
					
					 
					
				// <Redirect to="/blog/bloglist" />
				// }
				// else {
				// 	const def = () =>(
				// 		<alert />
				// 	 )

				// 	 def();
					  
				// }
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