import React from 'react';

const fetch = require('node-fetch');
const isEmpty = require('is-empty');

class EditContact extends React.Component
{
	doEditContact = async event =>
	{
		event.preventDefault();

		const contact = {
			id: this.props.contact._id
		};

		if (!isEmpty(this.firstname.value))
			contact.firstname = this.firstname.value;
		if (!isEmpty(this.lastname.value))
			contact.lastname = this.lastname.value;

		if (!isEmpty(this.phoneNumber.value))
			contact.phoneNumber = this.phoneNumber.value;
		else
			contact.phoneNumber = [];
		if (!isEmpty(this.email.value))
			contact.email = this.email.value;
		else
			contact.email = []
		if (!isEmpty(this.address.value))
			contact.address = this.address.value;
		else
			contact.address = []

		if (!isEmpty(this.company.value))
			contact.company = this.company.value;
		if (!isEmpty(this.title.value))
			contact.title = this.title.value;

		const response = await fetch('/api/editContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify(contact)
		}).then(response => {return response.json()});
		
		if (response.success) {
			this.message = this.firstname.value + ' ' + this.lastname.value + ' added successfully!';
			this.props.toggleEditContact(contact);
		}
		else {
			var errors = response.errors;
			this.message = JSON.stringify(errors);
		}
	};

	render()
	{
		return (
			<div id="container">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
				<div id="header">Edit Contact</div>
				<div id="login">
					<form onSubmit={this.doEditContact}>
						<input className='firstnameBox' type="text" id="firstname" placeholder="first name" defaultValue={this.props.contact.firstname} ref={(c) => this.firstname = c}/><br />
						<input className='lastnameBox' type="text" id="lastname" placeholder="last name" defaultValue={this.props.contact.lastname} ref={(c) => this.lastname = c}/><br />
						<input className='phoneNumberBox' type="text" id="phoneNumber" placeholder="phone number" defaultValue={this.props.contact.phoneNumber} ref={(c) => this.phoneNumber = c}/><br />
						<input className='emailBox' type="text" id="email" placeholder="email address" defaultValue={this.props.contact.email} ref={(c) => this.email = c}/><br />
						<input className='addressBox' type="text" id="address" placeholder="address" defaultValue={this.props.contact.address} ref={(c) => this.address = c}/><br />
						<input className='companyBox' type="text" id="company" placeholder="company" defaultValue={this.props.contact.company} ref={(c) => this.company = c}/><br />
						<input className='titleBox' type="text" id="title" placeholder="title" defaultValue={this.props.contact.title} ref={(c) => this.title = c}/><br />
						<input type="submit" id="button" className="buttons" value="EDIT"/>
						<input type="button" id="button" className="buttons" value="CANCEL" onClick={() => this.props.toggleEditContact(this.props.contact)}/>
					</form>
					<p>
						<span id="result">{this.message}</span><br />
					</p>
				</div>
			</div>

		);
	}
};

export default EditContact;
