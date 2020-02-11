import React from 'react';

import RButtons from '../components/RButtons';
import AddContact from '../components/AddContact';
import EditContact from '../components/EditContact';
import '../components/Home.css';

import ContactList from '../components/ContactList';

class HomePage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.toggleAddContact = this.toggleAddContact.bind(this);
		this.toggleEditContact = this.toggleEditContact.bind(this);

		this.editContact = new EditContact({contact: {}, toggleEditContact: this.toggleEditContact});

		this.contactList = React.createRef();
	}

	toggleAddContact()
	{
		const addContact = document.getElementById('add-pop-up');

		if (addContact.style.display === 'block')
		{
			addContact.style.display = 'none';
			this.contactList.current.loadContacts();
		}
		else
		{
			addContact.style.display = 'block';
		}
	}

	toggleEditContact(contact)
	{
		if (!contact)
			return;

		const editContactPopUp = document.getElementById('edit-pop-up');

		if (editContactPopUp.style.display === 'block')
		{
			editContactPopUp.style.display = 'none';
			this.contactList.current.loadContacts();
		}
		else
		{
			this.editContact.props.contact = contact;
			editContactPopUp.style.display = 'block';
			this.forceUpdate();
		}
	}

	searchContacts()
	{
		var query = '';
		this.contactList.current.loadContacts(query);
	}

	render()
	{
		return (
				<div className='rButtons'>
					<RButtons toggleAddContact={this.toggleAddContact}/>
				<div/>
				<ContactList ref={this.contactList} toggleEditContact={this.toggleEditContact}/>
				<div id='add-pop-up' style={{display: 'none', position: 'fixed', width: '100vw', height: '100vh'}}>
					<AddContact toggleAddContact={this.toggleAddContact}/>
				</div>
				<div id='edit-pop-up' style={{display: 'none', position: 'fixed', width: '100vw', height: '100vh'}}>
					{this.editContact.render()}
				</div>
			</div>
		);
	}
}

export default HomePage;
