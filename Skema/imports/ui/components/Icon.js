import React, { Component } from 'react';

// Insert icon
export default class Icon extends Component {
	render() {
		return (
			<button className="icon" onClick={() => alert('ya booped meh')}>
				<div className={this.props.type}></div>
			</button>
		);
	}
}