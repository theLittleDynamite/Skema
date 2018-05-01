import React, { Component } from 'react';

// Import layouts
import TopLevelViewsWindow from './TopLevelViewsWindow.js';
import ToolBox from './ToolBox.js';
import Shared from './Shared.js';

// Side bar component layout
export default class SideBar extends Component {
	
	render() {
		return (
			<div className="sideBar">
				<TopLevelViewsWindow />
				<ToolBox />
				<Shared />
			</div>
		);
	}
}