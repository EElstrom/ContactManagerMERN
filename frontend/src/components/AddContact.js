import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const fetch = require('node-fetch');
const isEmpty = require('is-empty');

function AddContact()
{
	var firstname;
	var lastname;
	var phoneNumber;
	var email;
	var address;
	
	const [message,setMessage] = useState('');
	
	const [firstnameBox, setFirstnameBox] = useState('large-text-box');
	const [lastnameBox, setLastnameBox] = useState('large-text-box');
	const [phoneNumberBox, setPhoneNumberBox] = useState('large-text-box');
	const [emailBox, setEmailBox] = useState('large-text-box');
	const [addressBox, setAddressBox] = useState('large-text-box');

	const doAddContact = async event =>
	{
		event.preventDefault();

		const contact = {};

		if (!isEmpty(firstname.value))
			contact.firstname = firstname.value;
		if (!isEmpty(lastname.value))
			contact.lastname = lastname.value;
		if (!isEmpty(phoneNumber.value))
			contact.phoneNumber = phoneNumber.value;
		if (!isEmpty(email.value))
			contact.email = email.value;
		if (!isEmpty(address.value))
			contact.address = address.value;

		const response = await fetch('api/addContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify(contact)
		}).then(response => {return response.json()});

		console.log(JSON.stringify(response));
		
		setFirstnameBox('large-text-box');
		setLastnameBox('large-text-box');
		setEmailBox('large-text-box');
		setPhoneNumberBox('large-text-box');
		setAddressBox('large-text-box');
		if (response.success) {
			setMessage(firstname.value + ' ' + lastname.value + ' added successfully!');
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
			<div id="header">Add Contact</div>
			<div id="login">
				<form onSubmit={doAddContact}>
					<input className={firstnameBox} type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input className={lastnameBox} type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input className={phoneNumberBox} type="text" id="phoneNumber" placeholder="phone number" ref={(c) => phoneNumber = c}/><br />
					<input className={emailBox} type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input className={addressBox} type="text" id="address" placeholder="address" ref={(c) => address = c}/><br />
					<input type="submit" id="loginButton" className="buttons" value="ADD"/>

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
