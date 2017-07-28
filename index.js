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
    console.log('mirror');
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
      console.log('obj = ' + JSON.stringify(obj, null, 2));
    }
	});
  socket.on('phone', (code) => {
    console.log('phone, code = ' + code);
    console.log('typeof(code) = ' + typeof code);
    let mirrorSocket = '';
    for (let i = 0; i < clients.length; i++) {
      console.log('clients[i].code = ' + clients[i].code);
      console.log('clients[i].type = ' + clients[i].type);
      console.log('typeof(clients[i].code ' + typeof clients[i].code);
      console.log('typeof(clients[i].type ' + typeof clients[i].type);
      if (clients[i].code == code &&
          clients[i].type == 'mirror') {
        mirrorSocket = clients[i].id;
        console.log('found = ' + JSON.stringify(clients[i], null, 2));
      }
    }
    if (mirrorSocket === '') {
      console.log('did not find mirrorSocket');
      socket.broadcast.to(socket.id).emit('problem', 'no mirror found for that code');
    }
    else {
      socket.broadcast.to(mirrorSocket).emit('phoneConnected', socket.id);
//      socket.broadcast.to(socket.id).emit('mirrorConnected', mirrorSocket);
      socket.emit('mirrorConnected', mirrorSocket);
    }
  });
});
