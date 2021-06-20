import React, { Component } from 'react';
import TOC from "./Components/TOC";
import ReadContent from "./Components/ReadContent";
import Subject from "./Components/Subject";
import Control from "./Components/Control";
import UpdateContent from "./Components/UpdateContent";
import CreateContent from './Components/CreateContent';
import axios from 'axios';
import { Button, Row, Col, Container } from 'react-bootstrap';
import '../../css/Community.css'
import CommunityNav from './CommunityNav';

const format = require('date-format');

// Use class
class CommunityPost extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mode: 'list',
			selected_content_id: 0,
			contents: [],
			type: props.match.params.type,
			subject: "Community Post",
			subtitle: "This is the area of OPEN POST! Please feel free to leave anything you want to share with us. Have a fun!"
		}
	}
	// receive data by using fetch
	componentDidMount() {

		if (this.state.type === 'feedbackpost') {
			this.setState({
				subject: "Feed Back Post",
				subtitle: "Feel free to leave any feed back for this web page!"
			})
		}

		axios.post('/communitypost/senddata', { type: this.state.type })
			.then(response => {
				this.setState(() => ({ contents: response.data.data }))
			})
	}

	// receive data by using axios (don't need to convert)
	async setData(_id, _writer, _title, _desc, _mode) {
		let data = {
			id: _id,
			writer: _writer,
			title: _title,
			desc: _desc,
			mode: _mode,
			type: this.state.type
		}

		await axios.post('/communitypost/receivedata', data)
			.then(response => {
				this.setState(() => ({ contents: response.data.data }))
			})
			// {this.setState({contents: response.data.rows[1]})})
			.catch(function (error) {
				console.log(error);
			});
	}

	getReadContent() {
		let i = 0;
		while (i < this.state.contents.length) {
			let data = this.state.contents[i];
			if (data.id === this.state.selected_content_id) {
				return data;
			}
			i = i + 1;
		}
	}

	getContent() {
		let _article, _content = null;
		if (this.state.mode === 'list') {
			_article = <TOC onChangePage={
				async function (id) {
					await this.setState({
						mode: 'read',
						selected_content_id: Number(id)
					});
				}.bind(this)
			} data={this.state.contents}></TOC>
			return _article
		}

		//read
		else if (this.state.mode === 'read') {
			_content = this.getReadContent();
			let date;
			if (_content.createdAt === _content.updatedAt) {
				date = format.asString('hh:mm, MM-dd-yyyy', new Date(_content.createdAt));
			} else date = format.asString('hh:mm, MM-dd-yyyy', new Date(_content.updatedAt)) + ' (Edited)';
			_article = <ReadContent id={_content.id} writer={_content.writer} title={_content.title} desc={_content.desc} date={date} ></ReadContent>
		}

		// Update
		else if (this.state.mode === 'update') {
			_content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={
				function (_id, _writer, _title, _desc) {
					//add content to this.state.cotnents
					this.setData(_id, _writer, _title, _desc, 'update');
					this.setState({
						mode: 'read'
					});
				}.bind(this)
			}></UpdateContent>

		}

		//create
		else if (this.state.mode === 'create') {
			_article = <CreateContent onSubmit={
				async function (_writer, _title, _desc) {
					//add content to this.state.cotnents
					await this.setData(0, _writer, _title, _desc, 'create');
					await this.setState({
						selected_content_id: this.state.contents[this.state.contents.length - 1].id,
						mode: 'read'
					});
				}.bind(this)
			}></CreateContent>
		}
		return _article;
	}

	createController() {
		let _button;
		if (this.state.mode === 'read') {
			_button = <Control onChangeMode={function (_mode) {
				//delete
				if (_mode === 'delete') {
					if (window.confirm('Are you sure to delete this post?')) {
						this.setData(this.state.selected_content_id, '', '', '', 'delete');
						this.setState({
							mode: 'list',
							selected_content_id: 0
						});
						alert('Delete Success!');
					}
				}
				else {
					this.setState({
						mode: _mode
					});
				}
			}.bind(this)}></Control>
			return _button;
		}
		else { return null; }
	}

	createPost() {
		let _post;
		if (this.state.mode !== 'create' && this.state.mode !== 'update') {
			_post = <Button variant="primary" onClick={function (e) {
				e.preventDefault();
				this.setState({ mode: 'create' })
			}.bind(this)} type="button">Add New Post</Button>

			return _post;
		}
		else return null;
	}

	render() {

		return (
			<div className="CommunityPost">
				<Container fluid>
					<Row>
						<Col xs={2} id="sidebar-wrapper">
							<CommunityNav />
						</Col>
						<Col xs={10} id="page-content-wrapper">
							<Subject
								title={this.state.subject}
								sub={this.state.subtitle}
								onChangePage={function () {
									this.setState({ mode: 'list' });
								}.bind(this)}
							></Subject>
							<br />
							{this.getContent()}

							{this.createController()}

							{this.createPost()}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}


export default CommunityPost;