import axios from "axios";
import authHeader from "./Auth.header";
import {
	FIND_ID,
	FIND_PASSWORD
} from "../Components/type";

import { useDispatch, useSelector } from "react-redux";
let formData;

//if registration success, return "Registration success"
const find_ID_password = async (forgot_info) => {
	return await axios.post("/find_id_password", forgot_info)
}

const reset_password = async (forgot_info) => {
	return await axios.post("/reset_password", forgot_info)
}

export default {
	find_ID_password,
	reset_password
};