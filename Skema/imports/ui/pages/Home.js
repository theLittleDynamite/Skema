import React, { Component } from 'react';

// Import layouts
import HeaderBar from '../layouts/HeaderBar.js';
import ToolBar from '../layouts/ToolBar.js';
import SideBarLeft from '../layouts/SideBarLeft.js';
import WorkingSpace from '../layouts/WorkingSpace.js';
import SideBarRight from '../layouts/SideBarRight.js';

// Page component - represents the whole app
export default class Home extends Component {
	
	render() {
		return (
			<div className="home">
				<HeaderBar />
				<ToolBar />
				<div className="flexBox">
					<SideBarLeft />
					<WorkingSpace />
					<SideBarRight />
				</div>
			</div>
		);
	}
}