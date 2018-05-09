import React, { Component } from 'react';

// Import layouts
import TabBar from '../layouts/TabBar.js';

// Import components
import Cytoscape from '../components/Cytoscape.js';

// Component layout of the drawing box
export default class WorkingSpace extends Component {
	render() {
		return (
			<div className="workingSpace backgroundBox">
				<TabBar />
				<div className="foregroundBox">
					<Cytoscape />
				</div>
			</div>
		);
	}
}