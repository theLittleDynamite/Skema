import React, { Component } from 'react';

// The logout button
export default class LogOut extends Component {
	render() {
		return (
			<button className="logOut" onClick={() => alert('ya booped meh')}>
				Log Out
			</button>
		);
	}
}