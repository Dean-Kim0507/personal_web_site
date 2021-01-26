import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
class UpdateContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.data.id,
			writer: this.props.data.writer,
			title: this.props.data.title,
			desc: this.props.data.desc
		}
		this.inputFormHandler = this.inputFormHandler.bind(this);
	}

	inputFormHandler(e) {

		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		console.log('Update Content Render');
		console.log(this.props.data);
		return (
			<article>
				<h2>Edit Post</h2>
				<form action="/create_process" method="post" onSubmit={function (e) {
					e.preventDefault();
					this.props.onSubmit(
						this.state.id,
						this.state.writer,
						this.state.title,
						this.state.desc
					);
				}.bind(this)}>
					<FormGroup>
						<Label for="title">Writer</Label>
						<Input type="text" name="writer" placeholder="WRITER" value={this.state.writer}
							onChange={this.inputFormHandler} />
					</FormGroup>
					<FormGroup>
						<Label for="writer">Title</Label>
						<Input type="text" name="title" placeholder="TITLE" value={this.state.title}
							onChange={this.inputFormHandler} />

					</FormGroup>
					<FormGroup>
						<Label for="desc">Text Area</Label>
						<Input type="textarea" name="desc" placeholder="TEXT" onChange={this.inputFormHandler}
							value={this.state.desc} style={{ height: '200px' }} />
					</FormGroup>
					<Button type="submit" color="primary">Update</Button>
				</form>
			</article>
		);
	}
}

export default UpdateContent;