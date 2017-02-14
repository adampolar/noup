const immutable = require('immutable');

function createPlayer(playerId) {
    return immutable.fromJS({
        id: playerId
    })
}

module.exports.createPlayer = createPlayer;