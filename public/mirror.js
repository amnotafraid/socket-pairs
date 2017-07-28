// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var code;
var phoneSocket;

// emit events
btn.addEventListener('click', () => {
  code = Math.floor(100000 + Math.random() * 900000);
  output.innerHTML = 'Go to http://localhost:4000/phone.html and enter <strong>' + code + '</strong>';
  socket.emit('mirror', code);
});

// Listen for events
socket.on('phoneConnected', (id) => {
  feedback.innerHTML = 'Your phone is now connected';
  phoneSocket = id;
  console.log('phoneSocket = ' + phoneSocket);
});
