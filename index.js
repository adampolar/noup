const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const appContainer = require('./app-container');
const gameContainer = require('./game-container')(messagePlayer, appContainer);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  gameContainer.playerArrived(socket.id);
  socket.on('game message', function(msg){
    gameContainer.messageFromPlayer(socket.id, msg);
  });
});

function messagePlayer(playerId) {
  if(io.sockets.connected[playerId]) {
    return function (message) {
      io.to(playerId).emit('game message', message);
    }
  } else {
    gameContainer.playerDropped(playerId);
  }
}

