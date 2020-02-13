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
	var password2;
	
	const [message,setMessage] = useState('');
	
	const [userBox, setUserBox] = useState('large-text-box');
	const [firstnameBox, setFirstnameBox] = useState('large-text-box');
	const [lastnameBox, setLastnameBox] = useState('large-text-box');
	const [emailBox, setEmailBox] = useState('large-text-box');
	const [passwordBox, setPasswordBox] = useState('large-text-box');

	const [userError, setUserError] = useState('');
	const [firstnameError, setFirstnameError] = useState('');
	const [lastnameError, setLastnameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordMatchError, setPasswordMatchError] = useState('');

	const doRegister = async event =>
	{
		event.preventDefault();

		setUserBox('large-text-box');
		setFirstnameBox('large-text-box');
		setLastnameBox('large-text-box');
		setEmailBox('large-text-box');
		setPasswordBox('large-text-box');

		setMessage('');
		setUserError('');
		setFirstnameError('');
		setLastnameError('');
		setEmailError('');
		setPasswordError('');
		setPasswordMatchError('');

		if (password.value !== password2.value)
		{
			setPasswordMatchError('Password does not match');
			setPasswordBox('large-error-box');
			return;
		}

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
		
		if (response.success) {
			setMessage('Registered');
			// do registration magic here
		}
		else {
			var errors = response.errors;
			if (errors.username !== undefined) {
				setUserBox('large-error-box');
				setUserError(<span>{errors.username}<br /></span>);
			}
			if (errors.firstname !== undefined) {
				setFirstnameBox('large-error-box');
				setFirstnameError(<span>{errors.firstname}<br /></span>);
			}
			if (errors.lastname !== undefined) {
				setLastnameBox('large-error-box');
				setLastnameError(<span>{errors.lastname}<br /></span>);
			}
			if (errors.email !== undefined) {
				setEmailBox('large-error-box');
				setEmailError(<span>{errors.email}<br /></span>);
			}
			if (errors.password !== undefined) {
				setPasswordBox('large-error-box');
				setPasswordError(<span>{errors.password}<br /></span>);
			}
		}

	};

	return (
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
			<div id="header">Contact Manager</div>
			<div id="login">
				<form onSubmit={doRegister}>
					<input className={userBox} type="text" id="username" placeholder="username" ref={(c) => username = c}/><br />
					<input className={firstnameBox} type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input className={lastnameBox} type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input className={emailBox} type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input className={passwordBox} type="password" id="password" placeholder="password" ref={(c) => password = c}/><br />
					<input className={passwordBox} type="password" id="password" placeholder="confirm password" ref={(c) => password2 = c}/><br />
					<input type="submit" id="loginButton" className="buttons" value="Register"/>
				</form>
				<p>
					<Link to="/login">Log in</Link><br />
					<span id="result">{message}</span><br />
					<span id="errors">{userError}{firstnameError}{lastnameError}{emailError}{passwordError}{passwordMatchError}</span>
				</p>
			</div>
		</div>

	);
};

export default Register;
