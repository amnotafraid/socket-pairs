var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

var server = app.listen(4000, function () {
  console.log('listening on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
	console.log('made socket connection, id = ', socket.id);

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
