import React, { useState } from 'react';
import './ContactPopup.css';

const fetch = require('node-fetch');
const isEmpty = require('is-empty');

function AddContact(props)
{
	var firstname;
	var lastname;
	var phoneNumber;
	var email;
	var address;
	var company;
	var title;	

	const [message,setMessage] = useState('');
	const [errors,setErrors] = useState('');

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
		if (!isEmpty(company.value))
			contact.company = company.value;
		if (!isEmpty(title.value))
			contact.title = title.value;

		const response = await fetch('api/addContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify(contact)
		}).then(response => {return response.json()});

		console.log(JSON.stringify(response));
		
		if (response.success) {
			// To-do: this will only appear when editing another contact, move this message somewhere more useful
			// setMessage(firstname.value + ' ' + lastname.value + ' added successfully!');
			setMessage('');
			setErrors('');
			// clear form and message
			document.getElementById('addForm').reset();
			props.toggleAddContact();
		}
		else {
			setMessage('');
			var errors = response.errors;
			setErrors(Object.values(errors));
		}

	};

	return (
		<div id="popupContainer">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
			<div id="header">Add a new Contact</div>
			<div id="contactPopup">
				<form id="addForm" onSubmit={doAddContact}>
					<input className='small-text-box' type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input className='small-text-box' type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input className='small-text-box' type="text" id="phoneNumber" placeholder="phone number" ref={(c) => phoneNumber = c}/><br />
					<input className='small-text-box' type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input className='small-text-box' type="text" id="address" placeholder="address" ref={(c) => address = c}/><br />
					<input className='small-text-box' type="text" id="company" placeholder="company" ref={(c) => company = c}/><br />
					<input className='small-text-box' type="text" id="title" placeholder="title" ref={(c) => title = c}/><br />
					<input type="submit" id="button" className="buttons" value="ADD"/>
					<input type="reset" id="button" className="buttons" value="CANCEL" onClick={() => props.toggleAddContact()}/>
				</form>
				<p>
					<span id="result">{message}</span><br />
					<span id="errors">{errors}</span><br />
				</p>
			</div>
		</div>

	);
};

export default AddContact;
