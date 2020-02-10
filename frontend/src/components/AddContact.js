import React from 'react';
const fetch = require('node-fetch');
const isEmpty = require('is-empty');
//const [message, setMessage] = useState('');

//I have no idea what I'm doing
export default class AddContact extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {first: "",
                      last: "",
                      phone: "",
                      email: "",
                      address: "",
                      company: "",
                      title: "",
		      message: ""};
		this.handleChange = this.handleChange.bind(this);
        	this.AddContacts = this.AddContacts.bind(this);
		this.reset = this.reset.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target; //Grab the name and value of each
        this.setState({
            [name] : value
        });                                 //set each name to their respective value
    }

    reset(){
        this.setState({first: "",
            last: "",
            phone: "",
            email: "",
            address: "",
            company: "",
            title:"",
            message: ""});
	this.myFormRef.reset();
	this.props.toggleAddContact.call();
    }


    async AddContacts(event) {
        //More sweet sweet goodness from original add_contact
        event.preventDefault(); //What is this?

	var firstname;
	var lastname;
	var phoneNumber;
	var email;
	var address;
	var company;
	var title;

        const contact = {};

        if (!isEmpty(this.state.first))
            contact.firstname = this.state.first;
        if (!isEmpty(this.state.last))
            contact.lastname = this.state.last;
        if (!isEmpty(this.state.phone))
            contact.phoneNumber = this.state.phone;
        if (!isEmpty(this.state.email))
            contact.email = this.state.email;
        if (!isEmpty(this.state.address))
            contact.address = this.state.address;
        if (!isEmpty(this.state.company))
            contact.company = this.state.company;
        if (!isEmpty(this.state.title))
            contact.title = this.state.title;

        const response = await fetch('api/addContact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(contact)
        }).then(response => {return response.json()});

        console.log(JSON.stringify(response));
	if (response.success) {
	    var succ = this.state.first + ' ' + this.state.last + ' added successfully!';
            this.setState({message: succ});
            this.reset();
        }
        else {
            var errors = response.errors;
            this.setState({message: JSON.stringify(errors)});
        }
    }

    render() {
        //That sweet sweet format from original AddContact
        return(
            <div id="container">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
                        <div id="header">Add a new Contact</div>
                        <div id="login">
                                <form ref={(el) => this.myFormRef = el} onSubmit={this.AddContacts}>
                                        <input name="first" className='firstnameBox' type="text" id="firstname" placeholder="first name" value={this.state.name} onChange={this.handleChange}/><br />
                                        <input name="last" className='lastnameBox' type="text" id="lastname" placeholder="last name" value={this.state.last} onChange={this.handleChange}/><br />
                                        <input name="phone" className='phoneNumberBox' type="text" id="phoneNumber" placeholder="phone number" value={this.state.phone} onChange={this.handleChange}/><br />
                                        <input name="email" className='emailBox' type="text" id="email" placeholder="email address" value={this.state.email} onChange={this.handleChange}/><br />
                                        <input name="address" className='addressBox' type="text" id="address" placeholder="address" value={this.state.address} onChange={this.handleChange}/><br />
                                        <input name="company" className='companyBox' type="text" id="company" placeholder="company" value={this.state.company} onChange={this.handleChange}/><br />
                                        <input name="title" className='titleBox' type="text" id="title" placeholder="title" value={this.state.title} onChange={this.handleChange}/><br />
                                        <input type="submit" id="button" className="buttons" value="ADD"/>
                                        <input type="button" id="button" className="buttons" value="CANCEL" onClick={this.reset}/>
                                </form>
                                <p>
                                        <span id="result">{this.state.message}</span><br />
                                </p>
                        </div>
                </div>

        );
    }
}
