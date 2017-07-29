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

  socket.on('disconnect', (socket) => {
    // TODO figure out how to delete clients when they are closed
    for (let i = 0; i < clients.length; i++) {
      let bRemove = false;
      if (clients[i].hasOwnProperty('phoneSocketId') &&
          clients[i].phoneSocketId == socket.id) { // phone disconnected
        bRemove = true;
        if (clients[i].hasOwnProperty('mirrorSocketId')) {
          socket.broadcast.to(clients[i].mirrorSocketId).emit('problem', 'phone disconnected');
        }
      }
      if (clients[i].hasOwnProperty('mirrorSocketId') &&
          clients[i].mirrorSocketId == socket.id) { // mirror disconnected
        bRemove = true;
        if (clients[i].hasOwnProperty('phoneSocketId')) {
          socket.broadcast.to(clients[i].phoneSocketId).emit('problem', 'mirror disconnected');
        }
      }
      if (bRemove) {
        clients.splice(i, 1);
      }
    } 
    console.log('clients = ' + JSON.stringify(clients, null, 2));
  });
	socket.on('mirror', (code) => {
    let bUpdated = false;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].mirrorSocketId == socket.id) {
        clients[i].code = code;
        bUpdated = true;
        if (clients[i].hasOwnProperty('phoneSocketId')) {
          socket.broadcast.to(clients[i].phoneSocketId).emit('problem', 'mirror has new code');
          delete clients[i].phoneSocketId;
        }
        break;
      }
    }
    if (!bUpdated) {
      let obj = {};
      obj['mirrorSocketId'] = socket.id;
      obj['code'] = code;
      clients.push(obj);
    }
	});
  socket.on('phone', (code) => {
    let mirrorSocketId = '';
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].code == code &&
          clients[i].hasOwnProperty('mirrorSocketId')) {
        mirrorSocketId = clients[i].mirrorSocketId;
        if (clients[i].hasOwnProperty('phoneSocketId') &&
            clients[i].phoneSocketId !== socket.id) {
          socket.broadcast.to(clients[i].phoneSocketId).emit('problem', '');
        }
        clients[i].phoneSocketId = socket.id;
      }
    }
    if (mirrorSocketId == '') {
      socket.emit('problem', 'no mirror found for that code');
    }
    else {
      socket.broadcast.to(mirrorSocketId).emit('phoneConnected', socket.id);
      socket.emit('mirrorConnected', mirrorSocketId);
    }
  });
});
