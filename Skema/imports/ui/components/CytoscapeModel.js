import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';

export default class CytoscapeModel extends Component {

	getElements() {
		return {
			nodes: [
				{ data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
				{ data: { id: 'b' } },
				{ data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
				{ data: { id: 'd' }, position: { x: 215, y: 175 } },
				{ data: { id: 'e' } },
				{ data: { id: 'f', parent: 'e' }, position: { x: 300, y: 175 } }
			],
			edges: [
				{ data: { id: 'ad', source: 'a', target: 'd' } },
				{ data: { id: 'eb', source: 'e', target: 'b' } }
			]
		};
	}
	
	getContainerStyles() {
		return {
		};
	}

	render() {
		return (
			<ReactCytoscape 
				containerID="cy"
				elements={this.getElements()}
				styleContainer={this.getContainerStyles()}
				cyRef={(cy) => { this.cyRef(cy) }}
				cytoscapeOptions={{ wheelSensitivity: 0.1 }}
				layout={{ name: 'dagre' }} 
			/>
		);
	}

	cyRef(cy) {
		this.cy = cy;
		cy.on('tap', 'node', function (evt) {
			var node = evt.target;
			console.log('tapped ' + node.id());
		});
	}
}