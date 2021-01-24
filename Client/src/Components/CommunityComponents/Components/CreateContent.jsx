import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


class CreateContent extends Component {
	render() {
		console.log('Create Content');
		return (

			<article>
				<hr />
				<h2>Create Post</h2>
				<form action="/create_process" method="post" onSubmit={function (e) {
					e.preventDefault();
					this.props.onSubmit(
						e.target.writer.value,
						e.target.title.value,
						e.target.desc.value
					);
				}.bind(this)}>
					<FormGroup>
						<Label for="title">Name</Label>
						<Input type="text" name="writer" placeholder="NAME" />
					</FormGroup>
					<FormGroup>
						<Label for="writer">Title</Label>
						<Input type="text" name="title" placeholder="TITLE" />

					</FormGroup>
					<FormGroup>
						<Label for="desc">Text Area</Label>
						<Input type="textarea" name="desc" placeholder="TEXT" />
					</FormGroup>

					{/* <p>
					<input type="text" name="writer" placeholder="writer"></input>
				</p>
				<p>
					<input type="text" name="title" placeholder="title"></input>
				</p>
				<p>
					<textarea  name="desc" placeholder="description"></textarea>
				</p> */}
					<p>
						<Button color="danger" type="submit">Submit</Button>
					</p>
				</form>
			</article>
		);
	}
}

export default CreateContent;