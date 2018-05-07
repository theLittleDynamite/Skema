import React, { Component } from 'react';

// Create a new Genetic Decomposition list item
export default class GenDecompItem extends Component {
	render() {
		return (
			<li id={"genDecomp" + this.props.id} className="genDecompItem" onClick={this.props.onClick}>
				Genetic Decomposition #{this.props.id + 1}
			</li>
		);
    }
}