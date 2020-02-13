import React from 'react';
import './ContactPopup.css';

const fetch = require('node-fetch');
const isEmpty = require('is-empty');

class AddContact extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			message: '',
			errors: ''
		};
	}

	doAddContact = async event =>
	{
		event.preventDefault();

		const contact = {};

		if (!isEmpty(this.firstname.value))
			contact.firstname = this.firstname.value;
		if (!isEmpty(this.lastname.value))
			contact.lastname = this.lastname.value;
		if (!isEmpty(this.phoneNumber.value))
			contact.phoneNumber = this.phoneNumber.value;
		if (!isEmpty(this.email.value))
			contact.email = this.email.value;
		if (!isEmpty(this.company.value))
			contact.company = this.company.value;
		if (!isEmpty(this.title.value))
			contact.title = this.title.value;

		const response = await fetch('api/addContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify(contact)
		}).then(response => {return response.json()});
		
		if (response.success) {
			this.setState({message: this.firstname.value + ' ' + this.lastname.value + ' added successfully!', errors: ''});
			this.props.toggleAddContact();

			document.getElementById('firstname').value = '';
			document.getElementById('lastname').value = '';
			document.getElementById('phoneNumber').value = '';
			document.getElementById('email').value = '';
			document.getElementById('company').value = '';
			document.getElementById('title').value = '';
		}
		else {
			var errors = response.errors;
			this.setState({message: '', errors: Object.values(errors)});
		}

	};

	render()
	{
		return (
			<div id="popupContainer">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
				<div id="header">Add a new Contact</div>
				<div id="contactPopup">
					<form id="addForm" onSubmit={this.doAddContact}>
						<input className='small-text-box' type="text" id="firstname" placeholder="first name" ref={(c) => this.firstname = c}/><br />
						<input className='small-text-box' type="text" id="lastname" placeholder="last name" ref={(c) => this.lastname = c}/><br />
						<input className='small-text-box' type="text" id="phoneNumber" placeholder="phone number" ref={(c) => this.phoneNumber = c}/><br />
						<input className='small-text-box' type="text" id="email" placeholder="email address" ref={(c) => this.email = c}/><br />
						<input className='small-text-box' type="text" id="company" placeholder="company" defaultValue={this.props.contact.company} ref={(c) => this.company = c}/><br />
						<input className='small-text-box' type="text" id="address" placeholder="address" ref={(c) => this.address = c}/><br />
						<input className='small-text-box' type="text" id="company" placeholder="company" ref={(c) => this.company = c}/><br />
						<input className='small-text-box' type="text" id="title" placeholder="title" ref={(c) => this.title = c}/><br />
						<input type="submit" id="button" className="buttons" value="Add"/>
						<input type="reset" id="button" className="buttons" value="Cancel" onClick={() => this.props.toggleAddContact()}/>
					</form>
					<p>
						<span id="result">{this.state.message}</span><br />
            <span id="errors">{this.state.errors}</span>
					</p>
				</div>
			</div>
		);
	}
};

export default AddContact;
