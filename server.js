var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
var server = app.listen(8000, function(){
	console.log('listening port 8000.....');
})

io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	// (Listener) On Connection
 	console.log("Connected - Socket ID: ", socket.id);
  	// (Listener) On Disconnect
	socket.on('disconnect', function() { 
		console.log("Disconnected - Socket ID: ", socket.id);
 	})
 	socket.on('created_topic', function(data) {
 		socket.broadcast.emit('topic_added', data);
 	})
});