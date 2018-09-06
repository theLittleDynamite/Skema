function LogOut() {
  alert('Logged Out. Jks theres no functionality here');
}

// ================================================================
// Send a request to the server to update a document in the 'nodes'
// collection with the data in the body parameter.
// ================================================================
var update = document.getElementById('update');

update.addEventListener('click', function () {
    fetch('nodes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'node': 'not addition',
            'source': 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)

        // TODO: REPLACE THIS WITH A DOM UPDATE SO NO REFRESH IS REQUIRED
        window.location.reload(true)
    })
});
