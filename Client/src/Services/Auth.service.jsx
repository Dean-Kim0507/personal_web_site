import axios from "axios";
// import { user } from "../../../server/mysql";
import authHeader from "./Auth.header";
import {
	RESET_PASSWORD,
	USER_UPDATE,
	USER_UPDATE_SUCCESS,
	DELETE_ACCOUNT
} from "../Components/type";
const basicProfileImgPath = "https://dean-website.s3.ca-central-1.amazonaws.com/myblog/icons/img_user.jpg";
let formData;

//if registration success, return "Registration success"
const register = async (user_data) => {
	// formData = new FormData();
	// formData.append('userID', user_data.userID);
	// formData.append('password', user_data.password);
	// formData.append('firstName', user_data.firstName);
	// formData.append('lastName', user_data.lastName);
	// formData.append('email', user_data.email);
	// formData.append('images', imgFile);
	// for (var pair of formData.entries()) { console.log(pair[0] + ', ' + pair[1]); }
	return await axios.post("/api/registration", user_data)
}

const login = (userID, password) => {
	const login_Data = {
		userID: userID,
		password: password
	}
	return axios.post("/api/login", login_Data)
		.then(async (response) => {
			if (response.data.accessToken) {
				//Setting up the image path 
				if (response.data.profileImg === null) {
					response.data.profileImg = basicProfileImgPath;
				}
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
		formData.append('images', imgFile);
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
	return await axios.post("/api/userupdate", formData
		, {
			headers: authHeader()
		}
	)
		.then(async (response) => {
			if (response.data.message === USER_UPDATE_SUCCESS) {
				if (response.data.accessToken) {
					if (response.data.profileImg === null) {
						response.data.profileImg = basicProfileImgPath;
					}
					localStorage.removeItem("user");
					localStorage.setItem("user", JSON.stringify(response.data));
					return response.data;
				}
			}
			else return response.data;
		})
}

const loginValid = () => {
	return axios.get("/api/isloggedin", { headers: authHeader() })
}

export default {
	register,
	login,
	logout,
	userUpdate,
	loginValid
};