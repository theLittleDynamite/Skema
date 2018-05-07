import React, { Component } from 'react';

// Create a new View list item
export default class ViewItem extends Component {
	render() {
		return (
			<li id={"view" + this.props.id} className="viewItem" onClick={this.props.onClick}>
				View #{this.props.id + 1}
			</li>
		);
    }
}