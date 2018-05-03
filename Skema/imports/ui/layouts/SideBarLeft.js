import React, { Component } from 'react';

// Import layouts
import Views from './Views.js';
import ToolBox from './ToolBox.js';
import Shared from './Shared.js';

// Left side bar component layout
export default class SideBarLeft extends Component {
	
	render() {
		return (
			<div className="sideBarLeft backgroundBox">
				<Views />
				<ToolBox />
				<Shared />
			</div>
		);
	}
}