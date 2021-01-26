import React, { Component } from 'react';
import '../../../css/Control.css'
import { Button } from 'react-bootstrap';
class Control extends Component {
	render() {
		return (
			<div className='controller'>
				<Button onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('update');
				}.bind(this)} type="button" variant="light" value="Update">Update</Button>
				<Button onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('delete');
				}.bind(this)} type="button" variant="light" value="delete">Delete</Button>
				<Button onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('list');
				}.bind(this)} type="button" variant="light" value="List">List</Button>
			</div>
		);
	}
}

export default Control;