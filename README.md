# Socket Pairs

This uses express and socket.io to pair two clients together using a code the user enters.  Multiple pairings can be made.

## Usage

To set it up, clone the repository and `npm install` the node packages.  To run it, you can use `nodemon`:

```
nodemon index.js
```

You can open two browsers at:  
* http://localhost:4000/mirror.html
* http://localhost:4000/phone.html


Start in mirror.html.  Generate a code.  Then, enter that code in phone.html.

| Phone         | Mirror        |
| :-----------: |:-------------:|
| <img width="310" alt="phone" src="https://user-images.githubusercontent.com/1727761/28746513-6360af68-7453-11e7-95e5-18f17f2ccce9.png">      | <img width="310" alt="phone" src="https://user-images.githubusercontent.com/1727761/28746556-a57e9a9e-7454-11e7-84de-019dd97ea6ab.png"> |



