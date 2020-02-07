import React from 'react';
import { Link } from 'react-router-dom';

import ContactList from '../components/ContactList';

class HomePage extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className='home-page'>
				<Link to="/AddContact" >Add a new Contact</Link><br />
				<ContactList />
			</div>
		);
	}
}

export default HomePage;
