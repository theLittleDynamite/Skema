import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';
import WorldItem from '../components/WorldItem.js';
import ViewItem from '../components/ViewItem.js';

// Component layout of top-level view of all genetic decompositions
export default class Views extends Component {
	
	handleClick(i) {
		/*
		TODO: Implement this but in react using "ref" since this code doesn't work
		var worldItem = document.getElementById({i});
		
		*/
	}
	
	renderWorldItem(i, active) {
		return (
			<WorldItem 
				id={i}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	renderViewItem(i, active) {
		return (
			<ViewItem 
				id={i}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	render() {
		return (
			<div className="views backgroundBox">
				<WindowsHeading title="My Genetic Decompositions" />
				<div className="foregroundBox">
					<ul>
						{this.renderWorldItem(0)}
						<ul>
							<li> Genetic Decomposition #1
								<ul>
									{this.renderViewItem(0)}
									{this.renderViewItem(1)}
									{this.renderViewItem(2)}
								</ul>
							</li>
						</ul>
						{this.renderWorldItem(1)}
						{this.renderWorldItem(2)}
					</ul>
				</div>
			</div>
		);
	}
}

