import axios from "axios";
// import { user } from "../../../server/mysql";
import authHeader from "./Auth.header";
import {
	RESET_PASSWORD,
	USER_UPDATE,
	WRONG_PASSWORD,
	USER_UPDATE_SUCCESS,
	DELETE_ACCOUNT,
	DELETE_ACCOUNT_SUCCESS
} from "../Components/type";
let formData;
//if registration success, return "Registration success"
const register = async (user_data, imgFile) => {
	console.log(user_data, imgFile)
	formData = new FormData();
	formData.append('userID', user_data.userID);
	formData.append('password', user_data.password);
	formData.append('firstName', user_data.firstName);
	formData.append('lastName', user_data.lastName);
	formData.append('email', user_data.email);
	formData.append('imgFile', imgFile);
	// for (var pair of formData.entries()) { console.log(pair[0] + ', ' + pair[1]); }
	return await axios.post("/registration", formData
		, {
			headers: { 'Content-Type': 'multipart/form-data' }
		}
	)
}

const login = (userID, password) => {
	const login_Data = {
		userID: userID,
		password: password
	}
	return axios.post("/login", login_Data)
		.then((response) => {
			console.log(response.data)
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");
};

const userUpdate = async (user_data, imgFile) => {
	formData = new FormData();
	if (user_data.type === USER_UPDATE) {
		formData.append('userID', user_data.userID);
		formData.append('firstName', user_data.firstName);
		formData.append('lastName', user_data.lastName);
		formData.append('email', user_data.email);
		formData.append('type', user_data.type);
		formData.append('imgFile', imgFile);
	}
	else if (user_data.type === RESET_PASSWORD) {
		formData.append('userID', user_data.userID);
		formData.append('currentPassword', user_data.currentPassword);
		formData.append('newPassword', user_data.newPassword);
		formData.append('type', user_data.type);
	}
	else if (user_data.type === DELETE_ACCOUNT) {
		formData.append('userID', user_data.userID);
		formData.append('password', user_data.password);
		formData.append('type', user_data.type);
	}
	for (var pair of formData.entries()) { console.log(pair[0] + ', ' + pair[1]); }
	return await axios.post("/userupdate", formData
		, {
			headers: authHeader()
		}
	)
		.then((response) => {
			if (response.message == USER_UPDATE_SUCCESS) {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				return response.data;
			}
			// else if (response.message == DELETE_ACCOUNT_SUCCESS) {
			// 	logout();
			// 	return response.data;
			// }
			else return response.data;
		})
}
export default {
	register,
	login,
	logout,
	userUpdate
};