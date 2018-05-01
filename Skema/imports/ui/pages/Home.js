import React, { Component } from 'react';

// Import layouts
import NavBar from '../layouts/NavBar.js';
import ToolBar from '../layouts/ToolBar.js';
import SideBar from '../layouts/SideBar.js';
import DrawingBox from '../layouts/DrawingBox.js';
import Properties from '../layouts/PropertiesWindow.js';

// Page component - represents the whole app
export default class Home extends Component {
	
	render() {
		return (
			<div className="home">
				<NavBar />
				<ToolBar />
				<SideBar />
				<DrawingBox />
				<Properties />
			</div>
		);
	}
}