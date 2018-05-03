import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';

// Component layout of top-level view of all genetic decompositions
export default class Views extends Component {
	
	render() {
		return (
			<div className="views backgroundBox">
				<WindowsHeading title="My Genetic Decompositions" />
				<div className="foregroundBox">
					
				</div>
			</div>
		);
	}
}