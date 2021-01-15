import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	UPDATE_SUCCESS,
	UPDATE_FAIL,
	DELETE_ACCOUNT,
	DELETE_ACCOUNT_SUCCESS,
	UNAUTHORIZED,
	NO_TOKEN_PROVIDED
} from "./types";
import {
	v_session_expired
} from "../Components/message";
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
			(data) => {

				dispatch({
					type: UPDATE_SUCCESS,
					payload: { user: data }
				});
				dispatch({
					type: SET_MESSAGE,
					payload: data.message,
				});
				return Promise.resolve();
				// }
			},
			(error) => {
				const message =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
				console.log(message);
				// // if (message == UNAUTHORIZED || message == NO_TOKEN_PROVIDED) {
				// 	dispatch({
				// 		type: LOGIN_INVALID,
				// 	});

				// 	dispatch({
				// 		type: SET_MESSAGE,
				// 		payload: message,
				// 	});
				// 	localStorage.removeItem("user");
				// }
				// else {
				dispatch({
					type: UPDATE_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: message,
				});
				// }
				return Promise.reject();
			}
		);
};

export const loginValid = () => (dispatch) => {
	return AuthService.loginValid()
		.then((data) => {
			dispatch({
				type: SET_MESSAGE,
				payload: data.message,
			});
			return Promise.resolve();
		})
		.catch((error) => {
			alert(v_session_expired);
			dispatch(logout());
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			dispatch({
				type: LOGOUT
			});
			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});
			return Promise.reject();
		})
	// .then(
	// 	(data) => {
	// 		dispatch({
	// 			type: LOGIN_SUCCESS,
	// 			payload: { user: data }
	// 		});
	// 		dispatch({
	// 			type: SET_MESSAGE,
	// 			payload: data.message,
	// 		});
	// 		return Promise.resolve();
	// 		// }
	// 	},
	// 	(error) => {
	// 		const message =
	// 			(error.response &&
	// 				error.response.data &&
	// 				error.response.data.message) ||
	// 			error.message ||
	// 			error.toString();
	// 		console.log(message);
	// // if (message == UNAUTHORIZED || message == NO_TOKEN_PROVIDED) {
	// 	dispatch({
	// 		type: LOGIN_INVALID,
	// 	});

	// 	dispatch({
	// 		type: SET_MESSAGE,
	// 		payload: message,
	// 	});
	// 	localStorage.removeItem("user");
	// }
	// else {
	// 	dispatch({
	// 		type: UPDATE_FAIL,
	// 	});

	// 	dispatch({
	// 		type: SET_MESSAGE,
	// 		payload: message,
	// 	});
	// 	// }

	// }
	// );
};
