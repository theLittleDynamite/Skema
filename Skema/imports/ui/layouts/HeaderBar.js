import React, { Component } from 'react';

// Import components
import Logo from '../components/Logo.js';
import User from '../components/User.js';
import LogOut from '../components/LogOut.js';

// Nav bar component layout
export default class HeaderBar extends Component {
	
	render() {
		return (
			<div className="headerBar flexBox">
				<Logo />
				<User />
				<LogOut />
			</div>
		);
	}
}