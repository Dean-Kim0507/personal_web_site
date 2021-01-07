import axios from "axios";
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
	console.log(user_data, imgFile)
	formData = new FormData();
	formData.append('userID', user_data.userID);
	formData.append('firstName', user_data.firstName);
	formData.append('lastName', user_data.lastName);
	formData.append('email', user_data.email);
	formData.append('imgFile', imgFile);
	for (var pair of formData.entries()) { console.log(pair[0] + ', ' + pair[1]); }
	return await axios.post("/userupdate", formData
		, {
			headers: { 'Content-Type': 'multipart/form-data' }
		}
	)
}
export default {
	register,
	login,
	logout,
	userUpdate
};