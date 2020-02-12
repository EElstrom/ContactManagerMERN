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
		this.addContact = new AddContact({contact: {}, toggleAddContact: this.toggleAddContact});
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

	searchContacts(query)
	{
		if (!query)
			query = '';

		this.contactList.current.loadContacts(query);
	}

	render()
	{
		return (
			<div style={{display: 'block', position: 'fixed', width: '100vw', height: '100vh', overflow: 'auto'}}>
				<div style={{display: 'flex', justifyContent: 'flex-start', alignItem: 'center', position: 'absolute', width: '100vw', left: '7%'}}>
					{/*TODO: Add logo here?*/}
					<input className='search-box' type='text' id='login' placeholder='search' onChange={(query) => this.searchContacts(query.target.value)}/>
					<div className='rButtons'>
						<RButtons toggleAddContact={this.toggleAddContact}/>
					</div>
				</div>
				<div style={{display: 'block', marginTop: '150px'}}>
					<ContactList ref={this.contactList} toggleEditContact={this.toggleEditContact}/>
				</div>
				<div id='add-pop-up' style={{display: 'none', position: 'fixed', top: '0px', left: '0px', width: '100vw'}}>
					{this.addContact.render()}
				</div>
				<div id='edit-pop-up' style={{display: 'none', position: 'fixed', top: '0px', left: '0px', width: '100vw'}}>
					{this.editContact.render()}
				</div>
			</div>
		);
	}
}
export default HomePage;
