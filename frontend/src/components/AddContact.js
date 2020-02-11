import React from 'react';

const fetch = require('node-fetch');
const isEmpty = require('is-empty');

class AddContact extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {message: ''};
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
		if (!isEmpty(this.address.value))
			contact.address = this.address.value;
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
			this.setState({message: this.firstname.value + ' ' + this.lastname.value + ' added successfully!'});
			this.props.toggleAddContact();

			this.firstname = '';
			this.forceUpdate();
		}
		else {
			var errors = response.errors;
			this.setState({message: JSON.stringify(errors)});
		}

	};

	render()
	{
		return (
			<div id="container">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
				<div id="header">Add a new Contact</div>
				<div id="login">
					<form onSubmit={this.doAddContact}>
						<input className='firstnameBox' type="text" id="firstname" placeholder="first name" ref={(c) => this.firstname = c}/><br />
						<input className='lastnameBox' type="text" id="lastname" placeholder="last name" ref={(c) => this.lastname = c}/><br />
						<input className='phoneNumberBox' type="text" id="phoneNumber" placeholder="phone number" ref={(c) => this.phoneNumber = c}/><br />
						<input className='emailBox' type="text" id="email" placeholder="email address" ref={(c) => this.email = c}/><br />
						<input className='addressBox' type="text" id="address" placeholder="address" ref={(c) => this.address = c}/><br />
						<input className='companyBox' type="text" id="company" placeholder="company" ref={(c) => this.company = c}/><br />
						<input className='titleBox' type="text" id="title" placeholder="title" ref={(c) => this.title = c}/><br />
						<input type="submit" id="button" style={{margin: '1.5% 1%', color: '#FFFFFF', backgroundColor: '#4DA761'}} className="buttons" value="ADD"/>
						<input type="button" id="button" style={{margin: '1.5% 1%', color: '#FFFFFF', backgroundColor: '#4DA761'}} className="buttons" value="CANCEL" onClick={() => this.props.toggleAddContact()}/>
					</form>
					<p>
						<span id="result">{this.state.message}</span><br />
					</p>
				</div>
			</div>
		);
	}
};

export default AddContact;
