import axios from "axios";
import authHeader from "./Auth.header";
import {
	FIND_ID,
	FIND_PASSWORD
} from "../Components/type";

import { useDispatch, useSelector } from "react-redux";
let formData;

//if registration success, return "Registration success"
const get_all_users = async (admin_info, type) => {
	const info = {
		admin_info: admin_info,
		user_info: null,
		type: type
	}
	return await axios.post("/admin", info);
}

const delete_usr = async (admin_info, user_info, type) => {
	const info = {
		admin_info: admin_info,
		user_info: user_info,
		type: type
	}
	return await axios.post("/admin", info);
}

export default {
	get_all_users
};