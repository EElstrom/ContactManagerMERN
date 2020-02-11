import React from 'react';
import './Login.css';
import './Home.css';
import './Search.css';

import Contact from '../components/Contact';

const fetch = require('node-fetch');

class ContactList extends React.Component
{
	constructor(props)
	{
		super(props);

		this.loadContacts = this.loadContacts.bind(this);

		this.loadContacts();
	}

	async loadContacts(q)
	{
		if (!q) {
			var searchElement = document.getElementById('search');
			q = searchElement ? searchElement.value : '';
		}
    
		var contacts = [];

		// API Call
		const response = await fetch('api/searchContacts', {
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    query: q,
		    sort_by: {lastname: 1}
		  })
		}).then(response => {return response.json()});

		var index;
		for (index in response.contacts)
		{
			// Make contact components
			const contact = response.contacts[index];
			contact.key = index;
			contact.updateContactList = this.loadContacts;
			contact.toggleEditContact = this.props.toggleEditContact;
			contacts.push(new Contact(contact));
		}

		this.setState({contacts: contacts});
	}

	render()
	{
		const components = [];

		console.log(this.state);

		if (this.state)
		{
			var index;
			for (index in this.state.contacts)
				components[index] = this.state.contacts[index].render();
		}

		return (
			<div style={{height: '100vh', width: '100%'}}>
				<div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'transparent'}}>
					<input className='searchBox' type='text' id='search' placeholder='Search' onChange={(query) => this.loadContacts(query.target.value)}/><br />
				</div>
				<div className='contact-list'>
					{components}
				</div>
			</div>
		);
	}
};

export default ContactList;
