import React, { Component } from 'react';

// Create a new tab
export default class Tab extends Component {
	render() {
		return (
			<button id={"tab" + this.props.id} className="tab" onClick={this.props.onClick}>
				Tab {this.props.id + 1}
			</button>
		);
    }
}