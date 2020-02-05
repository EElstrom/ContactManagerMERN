import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const fetch = require('node-fetch');

function AddContact()
{
	var firstname = '';
	var lastname = '';
	var phoneNumber = '';
	var email = '';
	var address = '';
	
	const [message,setMessage] = useState('');
	
	const [firstnameBox, setFirstnameBox] = useState('large-text-box');
	const [lastnameBox, setLastnameBox] = useState('large-text-box');
	const [phoneNumberBox, setPhoneNumberBox] = useState('large-text-box');
	const [emailBox, setEmailBox] = useState('large-text-box');
	const [addressBox, setAddressBox] = useState('large-text-box');

	const doAddContact = async event =>
	{
		event.preventDefault();

		firstname = firstname.value;
		lastname = lastname.value;
		phoneNumber = phoneNumber.value;
		email = email.value;
		address = address.value;

		const response = await fetch('api/addContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify({
		    firstname: firstname,
		    lastname: lastname,
		    phoneNumber: phoneNumber,
		    email: email,
		    address: address
		  })
		}).then(response => {return response.json()});

		console.log(JSON.stringify(response));
		
		setFirstnameBox('large-text-box');
		setLastnameBox('large-text-box');
		setEmailBox('large-text-box');
		if (response.success) {
			setMessage(firstname + ' ' + lastname + ' added successfully!');
		}
		else {
			var errors = response.errors;

			setMessage(JSON.stringify(errors));
		}

	};

	return (
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
			<div id="header">Contact Manager</div>
			<div id="login">
				<form onSubmit={doAddContact}>
					<input class={firstnameBox} type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input class={lastnameBox} type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input class={phoneNumberBox} type="text" id="phoneNumber" placeholder="phone number" ref={(c) => phoneNumber = c}/><br />
					<input class={emailBox} type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input class={addressBox} type="text" id="address" placeholder="address" ref={(c) => address = c}/><br />
					<input type="submit" id="loginButton" class="buttons" value="ADD"/>

				</form>
				<p>
					<Link to="/home">Go Home</Link><br />
					<span id="result">{message}</span><br />
				</p>
			</div>
		</div>

	);
};

export default AddContact;
