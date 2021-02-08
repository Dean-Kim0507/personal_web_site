import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import ForgotService from '../Services/Forgot.service';

function ResetAccount(props) {
	const token = props.match.params.token;
	console.log(token)
	useEffect(() => {
		ForgotService.reset_password({ token: token })
		//token 유효하지않으면 팅기게 하기, 로그인하면 팅기게하기
	})

	return (
		<div>
		</div>
	);
}

export default ResetAccount;