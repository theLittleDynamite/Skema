import React, { Component } from 'react';

// Import layouts
import WorkingSpace from './WorkingSpace.js';
import Properties from './Properties.js';

// Right side bar component layout
export default class RightColumn extends Component {
	
	render() {
		return (
			<div className="rightColumn backgroundBox">
				<WorkingSpace />
				<Properties />
			</div>
		);
	}
}