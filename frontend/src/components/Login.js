import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const fetch = require('node-fetch');

const Login = data =>
{
	var loginName;
	var loginPassword;

	const [message,setMessage] = useState('');
	
	const [userBox, setUserBox] = useState('large-text-box');
	const [passwordBox, setPasswordBox] = useState('large-text-box');
	
	const [loginError, setLoginError] = useState('');
	const [userError, setUserError] = useState('');
	const [passwordError, setPasswordError] = useState('');


	const doLogin = async event =>
	{
		event.preventDefault();

		const username = loginName.value;
		const password = loginPassword.value;

		console.log('api/login');

		const response = await fetch('api/login', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({username: username, password: password})
		}).then(response => {return response.json()});

		setMessage('');
		setUserBox('large-text-box');
		setPasswordBox('large-text-box');
		setLoginError('');
		setUserError('');
		setPasswordError('');

		if (response.success) {
			// do login magic here
			setMessage('Logged in');
			window.location.replace("/home");
		}
		else if (response.errors === 'bad login') {
			setLoginError(<span>Username or password is incorrect<br /></span>);
		}
		else {
			var errors = response.errors;
			if (errors.username !== undefined) {
				setUserBox('large-error-box');
				setUserError(<span>{errors.username}<br /></span>);
			}
			if (errors.password !== undefined) {
				setPasswordBox('large-error-box');
				setPasswordError(<span>{errors.password}<br /></span>);
			}
		}
		
	};

	return (
		<div>
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
			<div id="header">Contact Manager</div>
			<div id="login">
				<form onSubmit={doLogin}>
					<input className={userBox} type="text" id="username" placeholder="username" ref={(c) => loginName = c}/><br />
					<input className={passwordBox} type="password" id="loginPassword" placeholder="password" ref={(c) => loginPassword = c}/><br />
					<input type="submit" id="loginButton" className="buttons" value="SIGN IN"/>
				</form>
				<p>
					<Link to="/register">Register a new account</Link><br />
					<span id="result">{message}</span><br />
					<span id="errors">{loginError}{userError}{passwordError}</span>

				</p>
			</div>
		</div>
		</div>
	);
};

export default Login;
