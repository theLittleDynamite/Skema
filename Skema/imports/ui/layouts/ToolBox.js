import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';

// Toolbox component layout
export default class ToolBox extends Component {
	
	render() {
		return (
			<div className="toolBox backgroundBox">
				<WindowsHeading title="Toolbox" />
				<div className="foregroundBox">
					
				</div>
			</div>
		);
	}
}