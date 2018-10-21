// ================================================================
// Custom Cytoscape functions
// ================================================================

// Edits the message above the working space to display current information
function editMsgBoard(msg) {
    msg = "Server status: " + msg;
    document.getElementById("msg_board_one").innerHTML = msg;
}

// Save the view in the database by clicking the update button.
// This is to get the view url which is only on the ejs file.
function saveView() {
    document.getElementById("updateViewBtn").click();
}

//Creates a generic node at a set position
//Input: current cytoscape core object
function addNode(cy) {
    var node_name = 'new';

    // Add the node to the local cytoscape
    cy.add({
        data: { name: node_name },
        style : { label: node_name }, //Base properties
        renderedPosition: { x: 300, y: 300 } //Base position
    });

    // Add the node to the node collection in the database
    addNodeToNodeCollection(node_name);
    // saveView(); // saving view too often leads to network lag and issues
}

//Creates a new generic edge.
//If only two nodes are selected, an edge is created between them.
//If a node and an edge are selected, a 'connector' node is created at the
//      midpoint of the original edge. 2 edges are created between the
//      connector and the original source and target, and a third links the new
//      node to the connector node. This is to represent a many to one
//      relationship, further connections can be added to this node.
function addEdge(cy) {
    var selected_eles = cy.$(':selected');
    //Checks for only 2 selected elements, at least one node
    if (selected_eles.size() == 2 && selected_eles.is('node')) {
        var hasEdge = selected_eles.is('edge');
        //May need reworking to ensure source & target are correct
        if (!hasEdge) {
            var node1 = selected_eles[1]; //Source node
            var node2 = selected_eles[0]; //Target node

            cy.add({
                data: { source: node1.id(), target: node2.id() },
                style: {
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': 'black',
                    'target-endpoint': 'outside-to-node'
                }
            });

            // Add the edge to the database
            addEdgeToEdgeCollection(cy1, node1.data( 'name' ), node2.data( 'name' ));
            // saveView(); // saving view too often leads to network lag and issues

        }
        //to create many-to-one with one node and one edge selected
        if (hasEdge) {
            alert("Warning: This change will not be saved to the database as functionality is not fully implemented");

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
                    label: 'connector',
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

            var new_edges = [ //array of new edges
                { data: { source: source_id, target: connect_id } },
                { data: { source: connect_id, target: target_id } },
                { data: { source: node.id(), target: connect_id } }
            ];
            cy.add(new_edges);
            cy.remove(edge); //remove original edge
        }
    }
}

function deleteElement(cy) {
    var selected_eles = cy.$(':selected');

    editMsgBoard("Deleting "+ selected_eles.length +" elements from server.");

    // Also delete each element from database
    for (let i=0; i<selected_eles.length; i++) {
        if (selected_eles[i].isNode()) {
            let connected_edges = selected_eles[i].connectedEdges();
            console.log("connected edges: ", connected_edges);
            let requests = connected_edges.map(edge => dbDeleteEdge(edge));

            console.log("Edge delete requests: ", requests);

            Promise.all(requests)
                .then(response => {
                    console.log("delete edges response: ", response);
                    // Delete the node
                    dbDeleteNode(selected_eles[i])
                });

        } else if (selected_eles[i].isEdge()) {
            dbDeleteEdge(selected_eles[i]);
        }
    }

    // Remove the elements from cytoscape
    cy.remove(selected_eles);

    // A delete that does not get saved in the view will cause a fatal error in the database.
    saveView();
}

function changeText(node) {
    document.getElementById('labeltext').value = current.style('label');
    document.getElementById('xpostext').value = current.position('x');
    document.getElementById('ypostext').value = current.position('y');
}

function adjustElement() {
        current.style( 'label', document.getElementById('labeltext').value );
}

function adjustNodeName() {
    var old_name = current.data('name');
    var new_name = document.getElementById('labeltext').value;

    editMsgBoard("Editing node name.");

    current.data('name', new_name );
    current.style('label', new_name);

    updateNodeInNodeCollection(cy1, old_name, new_name);
    // saveView();
}

function resetViewport(cy) {
    cy.reset();
}

//Change layout based on user selection
function changeLayout(){
    var newName = document.getElementById('layoutDropdown').value;
    var layout = cy1.layout({ name: newName });
    layout.run();
    console.log("layout running");
}
// ================================================================
// Database functions
// ================================================================
function addNodeToNodeCollection(node_name) {
    // Create a JSON of the node
    var node_JSON = JSON.stringify({
        name: node_name
    });

    editMsgBoard("Adding node to server.");

    // Send the JSON to the node controller to save to the node collection in the db
    return fetch('/graph/node/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: node_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("Node create results: ", data);
        editMsgBoard("Node successfully added.");
    });
}

function addEdgeToEdgeCollection(cy, sourceNodeName, targetNodeName) {
    // Unselect selected elemenents to reset "current id" - gives an error if this is not done
    var selected_eles = cy.$(':selected');
    selected_eles.unselect();

    // Create a JSON of the edge
    var edge_JSON = JSON.stringify({
        source_node_name: sourceNodeName,
        target_node_name: targetNodeName
    });

    editMsgBoard("Adding edge to server.");

    // Send it to the edge controller to save to the edge collection
    return fetch('/graph/edge/create', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: edge_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("Edge create results: ", data);
        editMsgBoard("Successfully added edge to server.");
    });
}

function updateViewInViewCollection(view_url) {
    // TODO: update view name as well
    var view_JSON = createViewJSON(cy1);

    editMsgBoard("Updating View on server. Please do not close or refresh the browser.");

    // Send it to the view controller to update the view collection
    return fetch(view_url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: view_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("View update results: ", data);
        editMsgBoard("Successfully updated View on server.");
    });
}

function updateNodeInNodeCollection(cy, old_name, new_name) {
    // Unselect selected elemenents to reset "current id" - gives an error if this is not done
    var selected_eles = cy.$(':selected');
    selected_eles.unselect();

    var node_JSON = JSON.stringify({ old_name: old_name, new_name: new_name });

    editMsgBoard("Updating node name on server.");

    // Send it to the view controller to update the view collection
    return fetch('/graph/node/update', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: node_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("Node update results: ", data);
        editMsgBoard("Successfully updated node name on server.");
    });
}

function dbDeleteNode(node) {
    let node_name = node.data('name');
    let node_JSON = JSON.stringify({
        'name': node_name
    });

    editMsgBoard("Deleting node from server.");

    return fetch('/graph/node/delete', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: node_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("Node delete results: ", data);
        editMsgBoard("Successfully deleted node from server.");
    });
}

function dbDeleteEdge(edge) {
    let source_name = edge.source().data('name');
    let target_name = edge.target().data('name');
    let edge_JSON = JSON.stringify({
        'source_name': source_name,
        'target_name': target_name
    });

    editMsgBoard("Deleting edge from server.");

    return fetch('/graph/edge/delete', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: edge_JSON
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log("Edge delete results: ", data);
        editMsgBoard("Successfully deleted edge from server.");
    });
}

// Gather all necessary Cytoscape elements and their properties from the current
// View into a single JSON string.
function createViewJSON(cy) {
    var num_nodes = cy.nodes().length;
    var num_edges = cy.edges().length;
    var view_array = {nodes: [], edges: []};

    for (i=0; i<num_nodes; i++) {
        view_array.nodes.push({
            name: cy.nodes()[i].style('label'),
            x_pos: cy.nodes()[i].position('x'),
            y_pos: cy.nodes()[i].position('y')
        });
    }

    for (i=0; i<num_edges; i++) {
        view_array.edges.push({
            source_node: cy.edges()[i].source().style('label'),
            target_node: cy.edges()[i].target().style('label')
        });
    }

    // Convert the array to JSON
    var view_JSON = JSON.stringify(view_array);

    return view_JSON;
}
