import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fetch = require('node-fetch');

function Login()
{
	var loginName;
	var loginPassword;

	const [message,setMessage] = useState('');

	const doLogin = async event =>
	{
		event.preventDefault();

		const username = loginName.value;
		const password = loginPassword.value;

		const response = await fetch('api/login', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({username: username, password: password})
		}).then(response => {return response.json()});

		setMessage(JSON.stringify(response));
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}/><br />
				<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				<input type="submit" id="loginButton" class="buttons" value="Log In" onClick={doLogin}/>
			</form>
			<Link to="/register">Register a new account here</Link><br />
			<span id="result">{message}</span><br />
		</div>
	);
};

export default Login;
