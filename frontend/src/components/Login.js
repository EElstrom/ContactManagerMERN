import React, { useState } from 'react';

function Login()
{
	var loginName;
	var loginPassword;

	const [message,setMessage] = useState('');

	const doLogin = async event =>
	{
		event.preventDefault();

		alert("TODO: Implement Login /frontend/src/components/Login.js");
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="innder-title">Please Log In</span><br />
				<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}/><br />
				<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				<input type="submit" id="loginButton" class="buttons" value="Log In" onClick={doLogin}/>
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};

export default Login;
