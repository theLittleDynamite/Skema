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
// Bunch of functions for Cytoscape
// ================================================================
function addNode() {
    cy.add({
        style : { label: 'new' },
        position: { x: 300, y: 300 }
    });
}

function addEdge() {
//    var selected_objects = cy.$(':selected');
    var node1 = cy.$(':selected')[0];
    var node2 = cy.$(':selected')[1];

    cy.add({
        data: { source: node1.id(), target: node2.id() }
    });
}

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
