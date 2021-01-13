
const LOGIN_VALID = 'LOGIN_VALID';
exports.loginValid = (req, res) => {
	res.status(200).send({ message: LOGIN_VALID });
};