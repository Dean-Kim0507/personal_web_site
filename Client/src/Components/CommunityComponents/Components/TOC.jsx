import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


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

		console.log('===>TOC render');
		let lists = [];
		let data = this.props.data;
		let i = 0;

		const columns = [
			{ dataField: "id", text: "NO", sort: true },
			{ dataField: "title", text: "TITLE" },
			{ dataField: "writer", text: "NAME" },
			{ dataField: "date", text: "DATE" }
		]

		while (i < data.length) {
			let date = data[i].date;
			let nowDate = format.asString('MM-dd-yyyy', new Date());
			if (date === nowDate) {
				date = data[i].time
			}
			else date = data[i].date;
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
							<SearchBar {...props.searchProps} />
							<hr />
							<BootstrapTable
								keyField="id"
								data={lists}
								columns={columns}
								pagination={paginationFactory()}
								sort={{ dataField: 'id', order: 'desc' }}
								{...props.baseProps}
							/>
						</div>
					)
					}
				</ToolkitProvider>
			</div>

			// <Table striped bordered hover size="sm">
			// 	<thead>
			// 		<tr>
			// 			<th>#</th>
			// 			<th>Title</th>
			// 			<th>Name</th>
			// 			<th>Date</th>
			// 		</tr>
			// 	</thead>
			// 	<tbody>
			// 		{lists}
			// 	</tbody>	
			// </Table>
			// <nav>
			//   <ul>
			// 	{lists}
			//   </ul>
			// </nav>
		);
	}
}

export default TOC;