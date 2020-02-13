import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Toast from './Toast.js'
const fetch = require('node-fetch');

export default class Register extends React.Component
{
    constructor(props) {
        super(props);
        
        this.state = {userBox: 'large-text-box',
            firstNameBox: 'large-text-box',
            lastNameBox: 'large-text-box',
            emailBox: 'large-text-box',
            passwordBox: 'large-text-box',
            toastV: false,
            toastType: 'success',
            toastMessage: ''};

        this.doRegister = this.doRegister.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onDismiss() {
        this.setState({toastV: false});
    }

    onSuccess(msg){
        this.setState({toastV: true,
            toastMessage: msg,
            toastType: 'success'});
    }

    onError(msg) {
        this.setState({toastV: true,
            toastMessage: msg,
            toastType: 'danger'});
    }

    async doRegister(event){

        var username;
        var firstname;
        var lastname;
        var email;
        var password;

        event.preventDefault();
        if (this.password.value !== this.password2.value)
        {
            this.onError('Password does not match');
            this.setState({passwordBox: 'large-error-box'});
            return;
        }

        username = this.username.value;
        firstname = this.firstname.value;
        lastname = this.lastname.value;
        email = this.email.value;
        password = this.password.value;

        const response = await fetch('api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
          })
        }).then(response => {return response.json()});

        console.log(JSON.stringify(response));

        this.setState({userBox: 'large-text-box',
            firstNameBox: 'large-text-box',
            lastNameBox: 'large-text-box',
            emailBox: 'large-text-box',
            passwordBox: 'large-text-box'});

        if (response.success) {
            window.location.replace('/login');
            this.onSuccess('Successfully Registered!');
            // do registration magic here
        }
        else {
            var errors = response.errors;
            if (errors.username !== undefined) {
                this.setState({userBox: 'large-error-box'});
                this.onError(errors.username);
            }
            if (errors.firstname !== undefined) {
                this.setState({firstNameBox: 'large-error-box'});
                this.onError(errors.firstname);
            }
            if (errors.lastname !== undefined) {
                this.setState({lastNameBox: 'large-error-box'});
                this.onError(errors.lastname);
            }
            if (errors.email !== undefined) {
                this.setState({emailBox: 'large-error-box'});
                this.onError(errors.email);
            }
            if (errors.password !== undefined) {
                this.setState({passwordBox: 'large-error-box'});
                this.onError(errors.password);
            }
        }
    }

    render() {
        const {toastMessage, toastV, toastType, userBox, firstNameBox, lastNameBox, emailBox, passwordBox} = this.state;
        return ( 
                <div id="container">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
                    <div id="header">Contact Manager</div>
                    <div id="login">
                        <form onSubmit={this.doRegister}>
                            <input className={userBox} type="text" id="username" placeholder="username" ref={(c) => this.username = c}/><br />
                            <input className={firstNameBox} type="text" id="firstname" placeholder="first name" ref={(c) => this.firstname = c}/><br />
                            <input className={lastNameBox} type="text" id="lastname" placeholder="last name" ref={(c) => this.lastname = c}/><br />
                            <input className={emailBox} type="text" id="email" placeholder="email address" ref={(c) => this.email = c}/><br />
                            <input className={passwordBox} type="password" id="password" placeholder="password" ref={(c) => this.password = c}/><br />
                            <input className={passwordBox} type="password" id="password" placeholder="confirm password" ref={(c) => this.password2 = c}/><br />
                            <input type="submit" id="loginButton" className="buttons" value="REGISTER"/>
                        </form>
                        <p>
                            <Link to="/login">Log in</Link><br/>
                        </p>
                        <Toast showing={toastV} onDismiss={this.onDismiss} bsStyle={toastType}>{toastMessage}</Toast>
                    </div>
                </div>
    
            );
    }
}
