import React, { useState } from 'react';

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
			setMessage(firstname.value + ' ' + lastname.value + ' added successfully!');
			props.toggleAddContact();
		}
		else {
			var errors = response.errors;

			setMessage(JSON.stringify(errors));
		}

	};

	return (
		<div id="container">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
			<div id="header">Add a new Contact</div>
			<div id="login">
				<form onSubmit={doAddContact}>
					<input className='firstnameBox' type="text" id="firstname" placeholder="first name" ref={(c) => firstname = c}/><br />
					<input className='lastnameBox' type="text" id="lastname" placeholder="last name" ref={(c) => lastname = c}/><br />
					<input className='phoneNumberBox' type="text" id="phoneNumber" placeholder="phone number" ref={(c) => phoneNumber = c}/><br />
					<input className='emailBox' type="text" id="email" placeholder="email address" ref={(c) => email = c}/><br />
					<input className='addressBox' type="text" id="address" placeholder="address" ref={(c) => address = c}/><br />
					<input className='companyBox' type="text" id="company" placeholder="company" ref={(c) => company = c}/><br />
					<input className='titleBox' type="text" id="title" placeholder="title" ref={(c) => title = c}/><br />
					<input type="submit" id="button" className="buttons" value="ADD"/>
					<input type="button" id="button" className="buttons" value="CANCEL" onClick={() => props.toggleAddContact()}/>
				</form>
				<p>
					<span id="result">{message}</span><br />
				</p>
			</div>
		</div>

	);
};

export default AddContact;
