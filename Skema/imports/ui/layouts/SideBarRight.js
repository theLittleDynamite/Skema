import React, { Component } from 'react';

// Import layouts
import Properties from './Properties.js';

// Right side bar component layout
export default class SideBarRight extends Component {
	
	render() {
		return (
			<div className="sideBarRight backgroundBox">
				<Properties />
			</div>
		);
	}
}