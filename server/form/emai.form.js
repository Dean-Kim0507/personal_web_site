const forgotPW = (name, token, email) => {
	return (
		{
			from: process.env.WEBSITE_EMAIL_ADDRESS,
			to: email,
			subject: 'Password search authentication code transmission',
			text: 'This is the authentication code to find the password!',
			html:
				`<p>Hello ${name}</p>` +
				`<p>Please click the URL to reset your password.<p>` +
				`<a href='${process.env.DOMAIN}/resetpw/${token}/${email}'>Click here to reset Your Password</a><br/>` +
				`If you don't request this, please contact us` +
				`<h4> Dean's Blog</h4>`
		}
	);
}

const forgotID = (userID, email) => {
	return (
		{
			from: process.env.FORGOT_EMAIL_ID,
			to: email, // 수신 메일 주소
			subject: `Your User ID is...`, // 제목
			text: 'This is your User ID', // 내용
			html:
				`<p>This is your User ID<p>` +
				`<p>User ID: ${userID}<p>` +
				`<a href='${process.env.DOMAIN}/login'>Go to Login Page</a>`
		}
	);
}


module.exports = {
	forgotPW,
	forgotID
}