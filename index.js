const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const appContainer = require('./src/app-container');
const gameContainer = require('./src/game-container')(messagePlayer, appContainer);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.on('game message', function (msg) {
    gameContainer.messageFromPlayer(socket.id, JSON.parse(msg));
  });
  socket.on('admin message', function (msg, cb) {
    gameContainer.playerArrived(socket.id);
    console.log(msg);
    cb();
  });
  socket.on('disconnect', function () {
    gameContainer.playerDropped(socket.id);
  })
});


function messagePlayer(socketId) {
  if (io.sockets.connected[socketId]) {
    return function (message, type) {
      io.to(socketId).emit(type, message);
    }
  } else {
    gameContainer.playerDropped(socketId);
  }
}

