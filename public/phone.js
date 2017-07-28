// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var btn = document.getElementById('send'),
    feedback = document.getElementById('feedback');

var code;
var mirrorSocket;

// emit events
btn.addEventListener('click', () => {
  code = message.value;
  socket.emit('phone', code);
});

// Listen for events
socket.on('mirrorConnected', (io) => {
  feedback.innerHTML = '<p><em>You are connected to Hat Mirror</em></p>';
  mirrorSocket = io;
});

socket.on('problem', (message) => {
  feedback.innerHTML = message;
});
