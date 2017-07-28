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

var clients = [];

io.on('connection', (socket) => {
	console.log('made socket connection, id = ', socket.id);

	socket.on('mirror', (code) => {
    let bUpdated = false;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === socket.id) {
        clients[i].type = 'mirror';
        clients[i].code = code;
        bUpdated = true;
        break;
      }
    }
    if (!bUpdated) {
      let obj = {};
      obj['id'] = socket.id;
      obj['type'] = 'mirror';
      obj['code'] = code;
      clients.push(obj);
    }
	});
  socket.on('phone', (code) => {
    let mirrorSocket = '';
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].code == code &&
          clients[i].type == 'mirror') {
        mirrorSocket = clients[i].id;
      }
    }
    if (mirrorSocket === '') {
      socket.emit('problem', 'no mirror found for that code');
    }
    else {
      socket.broadcast.to(mirrorSocket).emit('phoneConnected', socket.id);
      socket.emit('mirrorConnected', mirrorSocket);
    }
  });
});
