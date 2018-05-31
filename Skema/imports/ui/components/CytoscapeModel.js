import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';

export default class CytoscapeModel extends Component {

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
				{ data: { id: 'ad', source: 'a', target: 'd' } },
                { data: { id: 'ac', source: 'a', target: 'c' } },
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
            selector: '$node > node',
            css: {
                'padding-top': '10px',
                'padding-left': '10px',
                'padding-bottom': '10px',
                'padding-right': '10px',
                'text-valign': 'top',
                'text-halign': 'center'
            }
        }, {
            selector: 'edge',
            css: {
                'target-arrow-shape': 'circle',
                'target-endpoint': 'outside-to-node'
            }
        }, {
            selector: 'ad',
            css: {
                'line-color': 'blue'
            }
        }, {
            selector: ':selected',
            css: {
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
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
