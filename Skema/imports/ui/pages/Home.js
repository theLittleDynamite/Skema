import React, { Component } from 'react';

// Import layouts
import HeaderBar from '../layouts/HeaderBar.js';
import ToolBar from '../layouts/ToolBar.js';
import LeftColumn from '../layouts/LeftColumn.js';
import RightColumn from '../layouts/RightColumn.js';

// Page component - represents the whole app
export default class Home extends Component {
	
	render() {
		return (
			<div className="home">
				<HeaderBar />
				<ToolBar />
				<div className="row">
					<LeftColumn />
					<RightColumn />
				</div>
			</div>
		);
	}
}