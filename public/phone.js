// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var code;
var mirrorSocket;

// emit events
btn.addEventListener('click', () => {
  console.log('click');
  code = message.value;
  console.log('code in phone = ' + code);
  socket.emit('phone', code);
});

// Listen for events
socket.on('mirrorConnected', (io) => {
  feedback.innerHTML = 'You are connected to Hat Mirror';
  mirrorSocket = io;
  console.log('mirrorSocket = ' + mirrorSocket);
});

socket.on('problem', (message) => {
  feedback.innerHTML = message;
});
