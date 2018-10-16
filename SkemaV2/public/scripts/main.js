function LogOut() {
  alert('Logged Out. Jks theres no functionality here');
}

// ================================================================
// Gather all necessary Cytoscape element properties into a single JSON string
// ================================================================
function Create_network_JSON() {
    var num_nodes = cy.nodes().length;
    var num_edges = cy.edges().length;
    var network_array = [];

    for (i=0; i<num_nodes; i++) {
        network_array.push({
            type: "node",
            node_name: cy.nodes()[i].style('label'),
            x_pos: cy.nodes()[i].position('x'),
            y_pos: cy.nodes()[i].position('y')
        });
    }

    for (i=0; i<num_edges; i++) {
        network_array.push({
            type: "edge",
            edge_name: cy.edges()[i].id(),
            source_node: cy.edges()[i].source().style('label'),
            target_node: cy.edges()[i].target().style('label')
        });
    }

    // Convert the array to JSON
    network_JSON = JSON.stringify(network_array);

    return network_JSON;
}

// ================================================================
// Send the local Cytoscape network properties to MongoDB for storage
// ================================================================
function Save_network() {
    var network_JSON = Create_network_JSON();

    Delete_network();

    fetch('network', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: network_JSON
    });

    // Refresh window to see changes.
    // TODO: Make this automatic with an automatic DOM update
    window.location.reload(true);
}

// ================================================================
// Drop the MongoDB 'network' collection before adding the network so
// that it isn't added on top of the previous network.
// ================================================================
function Delete_network() {
    fetch('network', {
        method: 'delete'
    });
}

// ================================================================
// Cytoscape scripts
// ================================================================

// Selection Events -----------------------------------------------

var selected_eles = cy.collection(); //Collection of ordered selected elements

//Tracks selected elements in order of selection
cy.on('select', function(evt){
    selected_eles = selected_eles.add(evt.target);
    console.log(selected_eles.size());
});
//Unselects all elements when any are unselected.
cy.on('unselect', function(){
    selected_eles.unselect();
    selected_eles = cy.collection();
    console.log('unselected');
});

//-----------------------------------------------------------------


//Creates a generic node at a set position relative to the current screen
function addNode() {
    cy.$('selected').unselect(); //unselects any selected elements
    cy.add({
        style : { label: 'new' }, //Base properties
        renderedPosition: { x: 300, y: 300 } //Base position
    }).select(); //new node is auto-selected
}

//Creates a new generic edge.
//If only two nodes are selected, an edge is created between them.
//If a node and an edge are selected, a 'connector' node is created at the
//      midpoint of the original edge. 2 edges are created between the
//      connector and the original source and target, and a third links the new
//      node to the connector node. This is to represent a many to one
//      relationship, further connections can be added to this node.
function addEdge() {
    //Checks for only 2 selected elements, at least one node
    if (selected_eles.size() == 2 && selected_eles.is('node')) {
        var hasEdge = selected_eles.is('edge');
        //May need reworking to ensure source & target are correct
        if (!hasEdge) {
            var node1 = selected_eles[0]; //Source node
            var node2 = selected_eles[1]; //Target node

            cy.add({
                data: { source: node1.id(), target: node2.id() },
            });
        }
        //to create many-to-one with one node and one edge selected
        if (hasEdge) {
            var node;
            var edge;
            selected_eles.forEach( function( ele ){
                if (ele.isNode()) {
                    node = ele;
                }
                if (ele.isEdge()) {
                    edge = ele;
                }
            });

            //Add a 'connector node' at midpoint of selected edge
            var connect = cy.add({
                style : {
                    label: 'connectornode', //For displaying when selected
                    'text-opacity': 0, //Short fix to hide label in workspace
                    'width': 10,
                    'height': 10,
                    'background-color': 'white',
                    'border-width': 0.5,
                    'border-color': 'black',
                },
                position: edge.midpoint()
            });
            var source_id = edge.source().id(); //original source node
            var target_id = edge.target().id(); //original target node
            var connect_id = connect.id(); // connect node

            //Similar to connector node, edges with the connector as target
            //Have an invisible connector label to differentiate
            var new_edges = [ //array of new edges
                { data: { source: source_id, target: connect_id },
                  style: {
                        'target-arrow-shape': 'none',
                        label: 'connectoredge', //for selection
                        'text-opacity': 0 //invisible text
                  } },
                { data: { source: node.id(), target: connect_id },
                  style: {
                        'target-arrow-shape': 'none',
                        label: 'connectoredge',
                        'text-opacity': 0
                    } },
                { data: { source: connect_id, target: target_id } }
            ];
            cy.add(new_edges);
            cy.remove(edge); //remove original edge
        }
    }
}

//Removes selected element/s from the graph
function deleteElement() {
    cy.remove(cy.$(':selected'));
}

function changeText(node) {
    document.getElementById('labeltext').value = current.style('label');
    document.getElementById('xpostext').value = current.position('x');
    document.getElementById('ypostext').value = current.position('y');
}

function adjustElement() {
        current.style( 'label', document.getElementById('labeltext').value );
}

function resetViewport() {
    cy.reset();
}

// ================================================================
// Login functions
// ================================================================
function displayLogin() {
    document.getElementById('loginModal').style.display='block';
}

function hideLogin() {
    document.getElementById('loginModal').style.display='none';
}
