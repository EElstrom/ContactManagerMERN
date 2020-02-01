import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fetch = require('node-fetch');

function Register()
{
	var username;
	var firstname;
	var lastname;
	var email;
	var password;

	const [message,setMessage] = useState('');

	const doRegister = async event =>
	{
		event.preventDefault();

		username = username.value;
		firstname = firstname.value;
		lastname = lastname.value;
		email = email.value;
		password = password.value;

		const response = await fetch('http://localhost:8000/api/register', {
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

		setMessage(JSON.stringify(response));
	};

	return (
		<div id="registerDiv">
			<form onSubmit={doRegister}>
				<input type="text" id="username" placeholder="Username" ref={(c) => username = c}/><br />
				<input type="text" id="firstname" placeholder="First Name" ref={(c) => firstname = c}/><br />
				<input type="text" id="lastname" placeholder="Last Name" ref={(c) => lastname = c}/><br />
				<input type="text" id="email" placeholder="Email Address" ref={(c) => email = c}/><br />
				<input type="password" id="password" placeholder="Password" ref={(c) => password = c} /><br />
				<input type="submit" id="loginButton" class="buttons" value="Register" onClick={doRegister}/>
			</form>
			<Link to="/login">Already Registered? Log in Here</Link><br />
			<span id="result">{message}</span><br />
		</div>
	);
};

export default Register;
