// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var code;
var phoneSocket = null;

console.log ('btn.innerText = ' + btn.innerText);
if (phoneSocket === null) {
  btn.innerText = 'Get a code for your phone';
  console.log('phoneSocket = null');
  console.log ('btn.innerText = ' + btn.innerText);
}

// emit events
btn.addEventListener('click', () => {
  code = Math.floor(1000 + Math.random() * 9000);
  output.innerHTML = '<p>Scan</p>'
                    +'<img src="qr.png">'
                    +'<p>or go to http://localhost:4000/phone.html</br>'
                    +'and enter <strong>' + code + '</strong></p>';
  feedback.innerHTML = '<p></p>';
  phoneSocket = null;
  btn.innerText = 'Get a code for your phone';
  socket.emit('mirror', code);
});

// Listen for events
socket.on('phoneConnected', (id) => {
  output.innerHTML = '';
  feedback.innerHTML = '<p><em>Your phone is now connected</em></p>';
  phoneSocket = id;
  btn.innerText = 'Reset Phone Code';
});

socket.on('problem', (message) => {
  feedback.innerHTML = '<p class="problem"><em>' + message + '</em></p>';
  phoneSocket = null;
  btn.innerText = 'Get a code for your phone';
});
