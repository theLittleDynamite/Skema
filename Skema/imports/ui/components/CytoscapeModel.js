import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';

export default class CytoscapeModel extends Component {

    //Hard coded elements for use in demonstration
	getElements() {
		return {
			nodes: [
				{ data: { id: 'a' } },
				{ data: { id: 'b' } },
				{ data: { id: 'c' } },
				{ data: { id: 'd' } },
				{ data: { id: 'e' } },
                { data: { id: 'g' } },
				{ data: { id: 'f' } }
			],
			edges: [
				{ data: { id: 'dg', source: 'g', target: 'd' } },
                { data: { id: 'cg', source: 'g', target: 'c' } },
                { data: { id: 'ga', source: 'a', target: 'g' } },
				{ data: { id: 'eb', source: 'e', target: 'b' } }
			]
		};
	}

	getStyles() {
		return [{
            selector: 'node',
            css: {
                'content': function content(ele) {
                    return ele.data('label') || ele.data('id');
                },
                'text-valign': 'center',
                'text-halign': 'center',
                'background-color': 'red',
                'background-opacity': 0.5
            }
        }, {
            selector: 'edge',
            css: {
                'curve-style': 'bezier',
                'source-arrow-shape': 'triangle',
                'source-arrow-fill': 'hollow',
                'target-arrow-shape': 'circle',
                'target-endpoint': 'outside-to-node',
                'line-color': 'green'
            }
        }, {
            selector: '#g',
            css: {
                'background-opacity': 0,
                'label': ''
            }
        }, {
            selector: '#g -> node',
            css: {
                'source-endpoint': 'inside-to-node',
                'width': 1,
                'target-arrow-shape': 'none',
                'source-arrow-shape': 'none'
            }
        }, {
            selector: '#ga',
            css: {
                'target-endpoint': 'inside-to-node',
                'width': 1,
                'target-arrow-shape': 'none',
            }
        }];

	}

	render() {
		return (
			<ReactCytoscape
				containerID="cy"
				elements={this.getElements()}
				style={this.getStyles()}
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
