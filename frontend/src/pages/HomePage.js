import React from 'react';

import RButtons from '../components/RButtons';
import AddContact from '../components/AddContact';
import '../components/Home.css';

import ContactList from '../components/ContactList';

class HomePage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.toggleAddContact = this.toggleAddContact.bind(this);
		this.contactList = React.createRef();
	}

	toggleAddContact()
	{
		const addContact = document.getElementById('add-pop-up');

		if (addContact.style.display === 'block')
			addContact.style.display = 'none';
		else
			addContact.style.display = 'block';

		this.contactList.current.loadContacts();
	}

	render()
	{
		return (
			<div>
				<div className='home-page' style={{position: 'fixed', display: 'flex', flexFlow: 'row nowrap', height: '100vh', width: '100vw'}}>
					<div style={{position: 'static', height: '100vh'}}>
						<RButtons toggleAddContact={this.toggleAddContact}/>
					</div>
					<div style={{position: 'static', height: '100vh', minWidth: '0'}}>
						<ContactList ref={this.contactList}/>
					</div>
				</div>
				<div id='add-pop-up' style={{display: 'none', position: 'fixed', width: '100vw', height: '100vh'}}>
					<AddContact toggleAddContact={this.toggleAddContact}/>
				</div>
			</div>
		);
	}
}

export default HomePage;
