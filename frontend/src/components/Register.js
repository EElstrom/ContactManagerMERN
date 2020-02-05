import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const fetch = require('node-fetch');

function Register()
{
	var username;
	var firstname;
	var lastname;
	var email;
	var password;
	
	const [message,setMessage] = useState('');
	
	const [userBox, setUserBox] = useState('large-text-box-2');
	const [firstnameBox, setFirstnameBox] = useState('large-text-box');
	const [lastnameBox, setLastnameBox] = useState('large-text-box');
	const [emailBox, setEmailBox] = useState('large-text-box');
	const [passwordBox, setPasswordBox] = useState('large-text-box');

	const doRegister = async event =>
	{
		event.preventDefault();

		username = username.value;
		firstname = firstname.value;
		lastname = lastname.value;
		email = email.value;
		password = password.value;

		const response = await fetch('api/register', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    username: username,
		    password: password,
		    firstname: firstname,
		    lastname: lastname,
		    email: email,
		  })
		}).then(response => {return response.json()});

		console.log(JSON.stringify(response));
		
		setUserBox('large-text-box');
		setFirstnameBox('large-text-box');
		setLastnameBox('large-text-box');
		setEmailBox('large-text-box');
		setPasswordBox('large-text-box');
		if (response.success) {
			setMessage('Registered');
			// do registration magic here
		}
		else {
			var errors = response.errors;
			var msg = "";
			
			if (errors.username !== undefined) {
				msg += errors.username + '\n';
				setUserBox('large-error-box');
			}
			if (errors.firstname !== undefined) {
				msg += errors.firstname + '\n';
				setFirstnameBox('large-error-box');
			}
			if (errors.lastname !== undefined) {
				msg += errors.lastname + '\n';
				setLastnameBox('large-error-box');
			}
			if (errors.email !== undefined) {
				setEmailBox('large-error-box');
				msg += errors.email + '\n';
			}
			if (errors.password !== undefined) {
				msg += errors.password + '\n';
				setPasswordBox('large-error-box');
			}
			setMessage(msg);
		}

	};

	return (
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
			<div id="header">Contact Manager</div>
			<div id="login">
				<form onSubmit={doRegister}>
					<input class={userBox} type="text" id="username" placeholder="username" ref={(c) => username = c}/><br />
					<input class={firstnameBox} type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input class={lastnameBox} type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input class={emailBox} type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input class={passwordBox} type="password" id="password" placeholder="password" ref={(c) => password = c}/><br />
					<input type="submit" id="loginButton" class="buttons" value="REGISTER"/>

				</form>
				<p>
					<Link to="/login">Log in</Link><br />
					<span id="result">{message}</span><br />
				</p>
			</div>
		</div>

	);
};

export default Register;
