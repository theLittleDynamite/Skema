import React, { Component } from 'react';

// Displays the window heading
export default class WindowsHeading extends Component {
	render() {
		return (
			<h1 className="windowsHeading">
				{this.props.title}
			</h1>
		);
	}
}