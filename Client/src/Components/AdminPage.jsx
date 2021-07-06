import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Table, Image, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import AdminPageService from '../Services/AdminPage.service'
import '../css/AdminPage.css';
import {
	unauthorized_access
} from "./message";
import {
	GET_USERS_SUCCESS,
	USER_NOT_FOUND,
	GET_ALL_USERS_ADMIN,
	DELETE_USER_ADMIN
} from "./type";

function AdminPage(props) {

	const { isLoggedIn, user } = useSelector(state => state.auth);
	const [users, setUsers] = useState(null);
	let history = useHistory();
	let tableNum = 0;
	let keyNumber = 0;
	const basicProfileImgPath = "./uploadImages/icon/img_user.jpg";
	const IMG_WIDTH = 45;
	const IMG_LENGTH = 50;

	useEffect(() => {
		if (!isLoggedIn || user.role !== 1) {
			alert(unauthorized_access);
			history.push('/home');
		}
		AdminPageService.get_all_users(user, GET_ALL_USERS_ADMIN)
			.then(response => {
				console.log(response.data);
				if (response.data.message === USER_NOT_FOUND) {
					setUsers(null);
				}
				else if (response.data.message === GET_USERS_SUCCESS) {
					setUsers(response.data.users);
				}
			})
	}, [])

	const adminPage_delete_user = data => {

		AdminPageService.delete_usr(user, data, DELETE_USER_ADMIN)
			.then((response) => {
				console.log(response.data.message);
				console.log(response.data.users);
			})
	}

	return (
		<Table striped bordered hover variant="dark" className="adminPage_table">
			<thead>
				<tr>
					<th>#</th>
					<th>User ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Username</th>
					<th>Email</th>
					<th>Picture</th>
					<th>Signing up Date</th>
					<th>Role</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{users != null ?
					users.map(data => {
						if (data.profile_img_path === null) {
							data.profile_img_path = basicProfileImgPath;
						}
						return (
							<tr key={tableNum}>
								<td>{++tableNum}</td>
								<td>{data.userID}</td>
								<td>{data.firstName}</td>
								<td>{data.lastName}</td>
								<td>{data.lastName}</td>
								<td>{data.email}</td>
								<td><Image src={data.profile_img_path}
									width={IMG_WIDTH}
									height={IMG_LENGTH}
									alt="45x50"
									roundedCircle /></td>
								<td>{data.createdAt}</td>
								<td>{data.role_mywebsites[0].roleID === 1 ?
									'Admin'
									:
									'User'
								}</td>
								<td><Button key={keyNumber++}
									onClick={() => adminPage_delete_user(data)}
									data1={data}
								>Delete</Button></td>
							</tr>
						)
					})
					:
					null
				}
			</tbody>
		</Table>
	);
}

export default AdminPage;