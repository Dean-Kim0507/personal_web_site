import axios from "axios";

//if registration success, return "Registration success"
const find_ID_password = async (forgot_info) => {
	return await axios.post("/api/find_id_password", forgot_info)
}

const reset_password = async (forgot_info) => {
	return await axios.post("/api/reset_password", forgot_info)
}

export default {
	find_ID_password,
	reset_password
};