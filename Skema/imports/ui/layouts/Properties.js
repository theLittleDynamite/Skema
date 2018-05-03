import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';

// Component layout of the properties box
export default class Properties extends Component {
	
	render() {
		return (
			<div className="properties backgroundBox">
				<WindowsHeading title="Properties" />
				<div className="foregroundBox">
					
				</div>
			</div>
		);
	}
}