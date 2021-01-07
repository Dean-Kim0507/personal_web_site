import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	UPDATE_SUCCESS,
	UPDATE_FAIL
} from "./types";

import AuthService from "../Services/Auth.service";

export const register = (user_data, imgFile) => (dispatch) => {
	return AuthService.register(user_data, imgFile)
		.then(
			(response) => {
				dispatch({
					type: REGISTER_SUCCESS,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: response.data.message,
				});
				console.log('actions: ', response.data.message)
				return Promise.resolve();
			},
			(error) => {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				dispatch({
					type: REGISTER_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: message,
				});

				return Promise.reject();
			}
		);
};

export const login = (userID, password) => (dispatch) => {
	return AuthService.login(userID, password)
		.then(
			(data) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: { user: data },
				});

				dispatch({
					type: SET_MESSAGE,
					payload: data.message,
				});
				return Promise.resolve();
			},
			(error) => {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				dispatch({
					type: LOGIN_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: message,
				});

				return Promise.reject();
			}
		);
};

export const logout = () => (dispatch) => {
	AuthService.logout();

	dispatch({
		type: LOGOUT,
	});
};

export const userUpdate = (user_data, imgFile) => (dispatch) => {
	return AuthService.userUpdate(user_data, imgFile)
		.then(
			(response) => {
				dispatch({
					type: UPDATE_SUCCESS,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: response.data.message,
				});
				console.log('actions: ', response.data.message)
				return Promise.resolve();
			},
			(error) => {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				dispatch({
					type: UPDATE_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: message,
				});

				return Promise.reject();
			}
		);
};