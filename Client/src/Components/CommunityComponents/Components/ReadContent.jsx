import React, { Component } from 'react';
import { Table } from 'reactstrap';


class ReadContent extends Component {
	render() {
		console.log('ReadContent');
		return (
			<Table striped bordered>
				<thead>
					<tr>
						<th colSpan="3"> <h3>{this.props.title}</h3></th>
					</tr>
					<tr>
						<th>NO. {this.props.id}</th>
						<th>NAME: {this.props.writer}</th>
						<th>DATE: {this.props.date} </th>
					</tr>

				</thead>
				<tbody>
					<tr>
						<td colSpan="3">{this.props.desc}</td>
					</tr>
				</tbody>
			</Table>
		);
	}
}

export default ReadContent;