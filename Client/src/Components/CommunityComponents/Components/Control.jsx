import React, { Component } from 'react';
import '../../../css/Control.css'
import { Button } from 'react-bootstrap';
class Control extends Component {
	render() {
		return (
			<div className='controller'>
				<Button style={{ margin: ' 0.5vw 0 0 0.5vw' }} onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('update');
				}.bind(this)} type="button" variant="light" value="Update">Update</Button>
				<Button style={{ margin: ' 0.5vw 0 0 0.5vw' }} onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('delete');
				}.bind(this)} type="button" variant="light" value="delete">Delete</Button>
				<Button style={{ margin: ' 0.5vw 0 0 0.5vw' }} onClick={function (e) {
					e.preventDefault();
					this.props.onChangeMode('list');
				}.bind(this)} type="button" variant="light" value="List">List</Button>
			</div>
		);
	}
}

export default Control;