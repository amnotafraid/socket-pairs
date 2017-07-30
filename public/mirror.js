// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var code;
var phoneSocket;

// emit events
btn.addEventListener('click', () => {
  code = Math.floor(100000 + Math.random() * 900000);
  output.innerHTML = '<p>Scan</p>'
                    +'<img src="qr.png">'
                    +'<p>or go to http://localhost:4000/phone.html</br>'
                    +'and enter <strong>' + code + '</strong></p>';
  feedback.innerHTML = '<p></p>';
  phoneSocket = null;
  socket.emit('mirror', code);
});

// Listen for events
socket.on('phoneConnected', (id) => {
  output.innerHTML = '';
  feedback.innerHTML = '<p><em>Your phone is now connected</em></p>';
  phoneSocket = id;
});

socket.on('problem', (message) => {
  feedback.innerHTML = '<p class="problem"><em>' + message + '</em></p>';
  phoneSocket = null;
});
