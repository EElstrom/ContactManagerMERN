import React from 'react';
import './ContactPopup.css';

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

		contact.firstname = (!isEmpty(this.firstname.value)) ? this.firstname.value : '';
		contact.lastname = (!isEmpty(this.lastname.value)) ? this.lastname.value : '';
		contact.phoneNumber = (!isEmpty(this.phoneNumber.value)) ? this.phoneNumber.value : '';
		contact.email = (!isEmpty(this.email.value)) ? this.email.value : '';
		contact.address = (!isEmpty(this.address.value)) ? this.address.value : '';
		contact.company = (!isEmpty(this.company.value)) ? this.company.value : '';
		contact.title = (!isEmpty(this.title.value)) ? this.title.value : '';

		const response = await fetch('api/editContact', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  credentials: 'same-origin',
		  body: JSON.stringify(contact)
		}).then(response => {return response.json()});
		
		if (response.success) {
			// To-do: this will only appear when editing another contact, move this message somewhere more useful
			// this.message = this.firstname.value + ' ' + this.lastname.value + ' added successfully!';
			this.message = '';
			this.errors = '';
			this.props.toggleEditContact(contact);
			document.getElementById('editForm').reset();
		}
		else {
			var errors = response.errors;
			this.message = '';
			this.errors = Object.values(errors);
		}
	};

	render()
	{
		console.log(JSON.stringify(this.props.contact));
		
		return (
			<div id="popupContainer">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
				<div id="header">Edit Contact</div>
				<div id="contactPopup">
					<form id="editForm" onSubmit={this.doEditContact}>
						<input className='small-text-box' type="text" id="firstname" placeholder="first name" defaultValue={this.props.contact.firstname} ref={(c) => this.firstname = c}/><br />
						<input className='small-text-box' type="text" id="lastname" placeholder="last name" defaultValue={this.props.contact.lastname} ref={(c) => this.lastname = c}/><br />
						<input className='small-text-box' type="text" id="phoneNumber" placeholder="phone number" defaultValue={this.props.contact.phoneNumber} ref={(c) => this.phoneNumber = c}/><br />
						<input className='small-text-box' type="text" id="email" placeholder="email address" defaultValue={this.props.contact.email} ref={(c) => this.email = c}/><br />
						<input className='small-text-box' type="text" id="company" placeholder="company" defaultValue={this.props.contact.company} ref={(c) => this.company = c}/><br />
						<input className='small-text-box' type="text" id="title" placeholder="title" defaultValue={this.props.contact.title} ref={(c) => this.title = c}/><br />
						<input type="submit" id="button" className="buttons" value="Done"/>
						<input type="button" id="button" className="buttons" value="Cancel" onClick={() => this.props.toggleEditContact(this.props.contact)}/>
					</form>
					<p>
						<span id="result">{this.message}</span><br />
						<span id="errors">{this.errors}</span><br />
					</p>
				</div>
			</div>

		);
	}
};

export default EditContact;
