import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Toast from './Toast.js'
const fetch = require('node-fetch');

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {passwordBox: 'large-text-box',
                      userBox: 'large-text-box',
                      toastV: false,
                      toastMessage: '',
                      toastType: 'success'};
        this.doLogin = this.doLogin.bind(this);
        this.Error = this.Error.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(){
       this.setState({toastV:false});
    }

    Error(msg) {
        this.setState({toastV: true,
            toastMessage: msg,
            toastType: 'danger'});
    }

    async doLogin(event){

        event.preventDefault();

        const username = this.loginName.value;
        const password = this.loginPassword.value;
        
        console.log('Username ' + username + ' password ' + password);
        this.setState({passwordBox: 'large-text-box',
                       userBox: 'large-text-box'});

        console.log('api/login');

        const response = await fetch('api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password:password})
        }).then(response => {return response.json()});
        
        console.log('Return: ' + response);
        if(response.success){
            window.location.replace('/home');
        }
        else if(response.errors === 'bad login'){
            this.Error("Username or Password is incorrect");
        }
        else {
            var errors = response.errors;
            if (errors.username !== undefined) {
                this.setState({userBox: 'large-error-box'});
                this.Error(errors.username);
            }
            if (errors.password !== undefined) {
                this.setState({passwordBox: 'large-error-box'});
                this.Error(errors.password);
            }
        }
    }

    render(){
        const {toastV, toastMessage, toastType} = this.state;
    
        return (
            <div>
            <div id="container">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:800"></link>
                <div id="header">Contact Manager</div>
                <div id="login">
                    <form onSubmit={this.doLogin}>
                        <input className={this.state.userBox} type="text" id="username" placeholder="username" ref={(c) => this.loginName = c}/><br />
                        <input className={this.state.passwordBox} type="password" id="loginPassword" placeholder="password" ref={(c) => this.loginPassword = c}/><br />
                        <input type="submit" id="loginButton" className="buttons" value="SIGN IN"/>
                    </form>
                    <p>
                        <Link to="/register">Register a new account</Link><br /> 
                    </p>
                    <Toast showing={toastV} onDismiss={this.onDismiss} bsStyle={toastType}>
            {toastMessage}</Toast>
                </div>
            </div>
            </div>
        );
    }
}
