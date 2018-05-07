import React, { Component } from 'react';

// Import components
import WindowsHeading from '../components/WindowsHeading.js';
import WorldItem from '../components/WorldItem.js';

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
									<li>View 1</li>
									<li>View 2</li>
									<li>View 3</li>
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

