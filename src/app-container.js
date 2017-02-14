module.exports.gameState = require('./game-state');
let cardManager = require('./card-manager');
module.exports.cardManager = cardManager;
module.exports.roomManager = require('./room-manager');
module.exports.coupManager = require('./coup-manager')(cardManager);
module.exports.playerManager = require('./player-manager');