import React, { Component } from 'react';

// Import components
import Icon from '../components/Icon.js';

// Toolbar component layout
export default class ToolBar extends Component {
	
	render() {
		return (
			<div className="toolBar">
				<Icon type="fas fa-folder-open" />
				<Icon type="fas fa-save" />
				<Icon type="fas fa-cut" />
				<Icon type="fas fa-undo" />
				<Icon type="fas fa-redo" />
				<Icon type="fas fa-search-plus" />
				<Icon type="fas fa-search-minus" />
			</div>
		);
	}
}