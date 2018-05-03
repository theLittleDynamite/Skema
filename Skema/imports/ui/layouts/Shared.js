import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';

// Component layout of collaboration zone
export default class Shared extends Component {
	
	render() {
		return (
			<div className="shared backgroundBox">
				<WindowsHeading title="Shared" />
				<div className="foregroundBox">
					
				</div>
			</div>
		);
	}
}