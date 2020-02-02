import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

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

		console.log(JSON.stringify(response));
		
		if (response.success) {
			// do login magic here
			setMessage('Logged in');
		}
		else if (response.errors === 'bad login') {
			setMessage('Username or password is incorrect');
		}
		else {
			var errors = response.errors;
			var msg = '';
			if (errors.username !== undefined)
				msg += errors.username + '\n';
			if (errors.password !== undefined)
				msg += errors.password + '\n';
			setMessage(msg);
		}
		
	};

	return (

		<div id="container">
			<div id="header">
				<p>Contact Manager</p>
			</div>
			<div id="login">
				<form onSubmit={doLogin}>
					<input class="large-text-box" type="text" id="loginName" placeholder="username" ref={(c) => loginName = c}/><br />
					<input class="large-text-box" type="password" id="loginPassword" placeholder="password" ref={(c) => loginPassword = c}/><br />
					<input type="submit" id="loginButton" class="buttons" value="SIGN IN" onClick={doLogin}/>
				</form>
				<p>
					<Link to="/register">Register a new account</Link><br />
					<span id="result">{message}</span><br />
				</p>
			</div>
		</div>
		
	);
};

export default Login;
