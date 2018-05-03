import React, { Component } from 'react';

// Insert icon
export default class Icon extends Component {
  render() {
    return (
		<div className={"icon " + this.props.type}>
		</div>
    );
  }
}