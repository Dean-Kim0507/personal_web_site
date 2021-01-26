import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Badge } from 'react-bootstrap';
const { SearchBar } = Search;
const format = require('date-format');


class TOC extends Component {
	/*상위 컴포넌트(여기서는 App) 바뀌엇을때 그 전부 하위 컴포넌트 불러오지 않기 위해(효율성 때문),
	concat을 썻을때만 newProps 값 바뀌는거 알수있다, push 쓰면 원본도 바뀌므로 모름*/
	shouldComponentUpdate(newProps, newState) {
		console.log('===>TOC render shouldComponentUpdate', newProps.data, this.props.data);

		if (this.props.data === newProps.data) {
			return false;
		}
		return true;
	}

	render() {

		let lists = [];
		let data = this.props.data;
		let i = 0;

		const columns = [
			{
				dataField: "id", text: "NO", sort: true, headerStyle: (colum, colIndex) => {
					return {
						width: '5%', textAlign: 'center'
					}
				}
			},
			{
				dataField: "title", text: "TITLE", headerStyle: (colum, colIndex) => {
					return {
						width: '55%', textAlign: 'center'
					}
				}
			},
			{
				dataField: "writer", text: "NAME", headerStyle: (colum, colIndex) => {
					return {
						textAlign: 'center'
					}
				}
			},
			{
				dataField: "date", text: "DATE", headerStyle: (colum, colIndex) => {
					return {
						textAlign: 'center'
					}
				}
			}
		]
		let nowDate = format.asString('MM-dd-yyyy', new Date());
		while (i < data.length) {
			let createdAt = data[i].createdAt;
			let updatedAt = data[i].updatedAt;
			let date;
			let _createdDate = format.asString('MM-dd-yyyy', new Date(createdAt));
			let _updatedDate = format.asString('MM-dd-yyyy', new Date(updatedAt));
			let _createdAt = format.asString('hh:mm', new Date(createdAt));
			let _updatedAt = format.asString('hh:mm', new Date(updatedAt));

			if (_createdDate === nowDate && createdAt === updatedAt) {
				date = _createdAt;
			}
			else if (_updatedDate === nowDate) {
				date = _updatedAt + ' (Edited)';
			}
			else if (createdAt === updatedAt) {
				date = _createdDate;
			}
			else date = _updatedDate + ' (Edited)';
			let title = <a key={data[i].id}
				href={"/contents/" + data[i].id}
				data-id={data[i].id}// e.target.dataset.id 에 여기 넣은값이 들어가서추출가능
				onClick={function (id, e) {
					e.preventDefault();
					this.props.onChangePage(id);
				}.bind(this, data[i].id)}
			>{data[i].title}</a>
			lists.push({ id: data[i].id, title: title, writer: data[i].writer, date: date });
			i = i + 1;
		}

		return (
			<div className="Table">
				<ToolkitProvider
					keyField="id"
					data={lists}
					columns={columns}
					search
				>
					{props => (
						<div>
							<hr />
							<SearchBar placeholder="Search Unser Name" {...props.searchProps} />
							<hr />
							<BootstrapTable
								keyField="id"
								data={lists}
								columns={columns}
								pagination={paginationFactory()}
								sort={{ dataField: 'id', order: 'desc' }}
								{...props.baseProps}
								hover={true}
								rowStyle={{ textAlign: 'center' }}
							/>
						</div>
					)}
				</ToolkitProvider>
			</div>
		);
	}
}

export default TOC;