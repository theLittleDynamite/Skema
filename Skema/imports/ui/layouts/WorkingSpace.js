import React, { Component } from 'react';

// Import layouts
import TabBar from './TabBar.js';

// Import components
import CytoscapeModel from '../components/CytoscapeModel.js';

// Component layout of the drawing box
export default class WorkingSpace extends Component {
	render() {
		return (
			<div className="workingSpace backgroundBox">
				<TabBar />
                <button onClick={ CytoscapeModel.addnode }>AddNode</button>
				<div className="foregroundBox">
				{/*this cytoscape module should really put it in the tab module, but lets try get it working first*/}
					<CytoscapeModel />
				</div>
			</div>
		);
	}
}
