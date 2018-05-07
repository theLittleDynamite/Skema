import React, { Component } from 'react';

// Create a new World list item
export default class WorldItem extends Component {
	render() {
		return (
			<li id={"world" + this.props.id} className="worldItem" onClick={this.props.onClick}>
				World #{this.props.id + 1}
			</li>
		);
    }
}