const express = require('express');
var bodyParser = require('body-parser');
const host_addressess_data = require('./../data/host_addresses.json');
const db = require('../db/index.js');
const path = require('path');

//const guest = require('./../data/guest.json');
//const host = require('./../data/host.json');

const app = express();
const hosts = require('./controllers/hosts.js');
const guests = require('./controllers/guests.js');
const hostSessions = require('./controllers/host_sessions.js');
const logins = require('./controllers/logins.js');

// recommendation, explanation is fuzzy, ask NFD >

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
//app.get('/', (req, res) => res.send('Hello world FFF'));

// app.get('/api/hosts', (req, res) => {
// 	res.json(data);
// });

// app.post('/api/hosts', (req, res) => {
// 	console.log('body...',req.body);
// 	//throw new Error("BROKEN");
// 	var successMsg = {"message": "Thanks for hosting your wifi with us"}
// 	res.json(successMsg);
// });

// guest searching endpoint
// app.post('/api/guests/search', (req, res) => {
// 	console.log('body...', req.body);
// 	res.json(data.slice(0, 6));
// });

app.post('/api/guests/search', (req, res) => {
	//console.log(req.body.guestLatLng)
	//hostSessions.search(req, res, db);
	hostSessions.dummySearch(req, res, db);
});

app.post('/api/guests', (req, res) => {
	guests.post(req, res, db);
})


// host crud
app.route('/api/hosts')
	.get((req, res) => {
		hosts.get(req, res, db, null)
	})
	.post((req, res) => {
		hosts.post(req, res, db)
	});

// app.route('/api/hosts/:hostId')
// 	.get( (req, res) => {
// 		var hostId = req.params['hostId'];
// 		hosts.get(req, res, data, hostId);
// 	})
// 	.put( hosts.put )
// 	.delete( hosts.delete )

// create new session for a host
app.post('/api/hosts/:hostId/sessions', (req, res) => {
	var hostId = req.params.hostId;
	hostSessions.post(req, res, db, hostId);
});

// get session for give host
app.get('/api/hosts/:hostId/sessions', (req, res) => {
	var hostId = req.params.hostId;
	hostSessions.getAll(req, res, db, hostId);
});

app.get('/api/hosting_sessions', (req, res) => {
	hostSessions.dummySearch(req, res, db);
})

// app.route('/api/host_sessions')
// 	.get((req, res) => {
// 		hostSessions.get(req, res, db, null)
// 	})
	// .post((req, res) => {
	// 	hostSessions.post(req, res, db)
	// });

// app.route('/api/host_sessions/:hostId')
// 	.get( (req, res) => {
// 		var hostId = req.params['hostId'];
// 		hostSessions.get(req, res, data, hostId);
// 	})
// 	.put( hostSessions.put )
// 	.delete( hostSessions.delete )

// logging a user in
app.post('/login', (req, res) => {
	logins.login(req, res, db);
});

// catchall route for redirecting from the server side
// **keep this at the bottom!**
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))