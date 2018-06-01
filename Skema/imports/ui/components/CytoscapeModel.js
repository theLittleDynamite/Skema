import React, { Component } from 'react';
import { ReactCytoscape, cytoscape } from 'react-cytoscape';

export default class CytoscapeModel extends Component {

    //Hard coded elements for use in demonstration
	getElements() {
		return {
            nodes: [
				{ data: { id: 'open-number' } },
				{ data: { id: 'addition' } },
				{ data: { id: 'subtraction' } },
				{ data: { id: 'missing-part' } },
				{ data: { id: 'missing-sum' } },
                { data: { id: 'missing-augend' } },
				{ data: { id: 'missing-addend' } },

                { data: { id: 'on-con' } },
                { data: { id: 'add-con' } },
                { data: { id: 'misspart-con' } }

			],
			edges: [
                { data: { id: 'add-on', source: 'addition', target: 'on-con' } },
                { data: { id: 'sub-on', source: 'subtraction', target: 'on-con' } },
                { data: { id: 'on-relation', source: 'on-con', target: 'open-number' } },
                { data: { id: 'add-sum', source: 'addition', target: 'subtraction' } },
                { data: { id: 'misspart-add', source: 'missing-part', target: 'addition' } },
                { data: { id: 'misssum-add', source: 'missing-sum', target: 'addition' } },
                { data: { id: 'missaug-misspart', source: 'missing-augend', target: 'missing-part' } },
                { data: { id: 'missadd-misspart', source: 'missing-addend', target: 'missing-part' } },
                { data: { id: 'missaug-missadd', source: 'missing-augend', target: 'missing-addend' } }
			]
		};
	}

    //Hard style properties for elements
	getStyles() {
		return [{
            //Nodes
            selector: 'node',
            css: {
                'shape': 'rectangle',
                'background-color': 'white',
                'border-color': 'black',
                'border-width': '2',
                'width': 'label',
                'text-halign': 'center',
                'text-valign': 'center',
                'padding': 5
            }
        }, {
            selector: '#open-number',
            css: {
                'label': "Open number-sentence",
            }
        }, {
            selector: '#addition',
            css: {
                'label': "Addition",
            }
        }, {
            selector: '#subtraction',
            css: {
                'label': "Subtraction",
            }
        }, {
            selector: '#missing-part',
            css: {
                'label': "Missing-part",
            }
        }, {
            selector: '#missing-sum',
            css: {
                'label': "Missing-sum",
            }
        }, {
            selector: '#missing-augend',
            css: {
                'label': 'Missing-augend',
            }
        }, {
            selector: '#missing-addend',
            css: {
                'label': 'Missing-addend',
            }
        }, {
            selector: '#on-con, #add-con, #misspart-con',
            css: {
                'width': 5,
                'height': 5,
                'background-opacity': 0,
                'border-opacity': 0,
            }

        },
            //Edges
        {
            selector: 'edge',
            css: {
                'curve-style': 'bezier',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'target-endpoint': 'outside-to-node',
            }
        }, {
            selector: '#add-on, #sub-on',
            css: {
                'target-endpoint': ('inside-to-node'),
            }
        }];
	}

    //Creates a cytoscape object and calls elements, style and layout
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
