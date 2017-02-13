const immutable = require('immutable');

function beginCoup(room, messagePlayer) {
    room.get('players').forEach((player) => {
        messagePlayer(player)("hello welcome to the game in " + room.get('name'));
    });
}

module.exports.beginCoup = beginCoup;