const express = require('express');
const app = express();
const handlebars = require('handlebars')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//middle ware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use(expressValidator());
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.engine('handlebars');
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/chat-room', (req, res) => {
  res.render('chat-room')
})

app.get('/chat-room/sports', (req, res) => {
  res.render('chat-sports')
})

app.get('/chat-room/news', (req, res) => {
  res.render('chat-news')
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  console.log('a user connected');
//  io.emit('chat message', 'a user has connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
//    io.emit('chat message', 'a user has disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


// app.listen(3000)
module.exports = app;
