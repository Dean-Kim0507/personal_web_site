import axios from "axios";

//if registration success, return "Registration success"
const get_all_users = async (admin_info, type) => {
	const info = {
		admin_info: admin_info,
		user_info: null,
		type: type
	}
	return await axios.post("/api/admin", info);
}

// const delete_usr = async (admin_info, user_info, type) => {
// 	const info = {
// 		admin_info: admin_info,
// 		user_info: user_info,
// 		type: type
// 	}
// 	return await axios.post("/api/admin", info);
// }

export default {
	get_all_users
};