import React, { Component } from 'react';

// Import components
import Tab from '../components/Tab.js';

// Component layout of the drawing box tabs
export default class TabBar extends Component {
	handleClick(i) {
		/*
		TODO: Implement this but in react using "ref" since this code doesn't work
		var tab = document.getElementById({i});
		tab.style.backgroundColor = white; 
		*/
	}
	
	renderTab(i, active) {
		return (
			<Tab 
				id={i}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	render() {
		return (
			<div className="tabBar">
				{this.renderTab(0)}
				{this.renderTab(1)}
				{this.renderTab(2)}
			</div>
		);
	}
}