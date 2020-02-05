import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const fetch = require('node-fetch');

const Login = data =>
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

		// Save response.token in local memory to use later 
		if (response.success) {
			// do login magic here
			setMessage('Logged in');
			window.location.replace("/home");
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
		<div>
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
			<div id="header">Contact Manager</div>
			<div id="login">
				<form onSubmit={doLogin}>
					<input className="large-text-box-2" type="text" id="loginName" placeholder="username" ref={(c) => loginName = c}/><br />
					<input className="large-text-box" type="password" id="loginPassword" placeholder="password" ref={(c) => loginPassword = c}/><br />
					<input type="submit" id="loginButton" className="buttons" value="SIGN IN"/>
				</form>
				<p>
					<Link to="/register">Register a new account</Link><br />
					<span id="result">{message}</span><br />
				</p>
			</div>
		</div>
		</div>
	);
};

export default Login;
