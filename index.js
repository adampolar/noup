const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const appContainer = require('./src/app-container');
const gameContainer = require('./src/game-container')(messagePlayer, appContainer);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  gameContainer.playerArrived(socket.id);
  socket.on('game message', function(msg){
    gameContainer.messageFromPlayer(socket.id, JSON.parse(msg));
  });
  socket.on('disconnect', function() {
    gameContainer.playerDropped(socket.id);
  })
});


function messagePlayer(socketId) {
  if(io.sockets.connected[socketId]) {
    return function (message) {
      io.to(socketId).emit('game message', message);
    }
  } else {
    gameContainer.playerDropped(socketId);
  }
}

