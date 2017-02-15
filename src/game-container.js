module.exports = function (messagePlayer, app) {

    return {
        playerDropped: function (playerId) {
        },
        messageFromPlayer: function (playerId, message) {
        },
        playerArrived: function (playerId) {

            let messenger = app.messengerManager(playerId, messagePlayer);

            let room = app.roomManager.getFirstAvailableRoom(app.gameState);
            if (!room) {
                app.gameState = app.roomManager.createRoom(app.gameState);
            }
            room = app.roomManager.getFirstAvailableRoom(app.gameState);
            app.gameState = app.roomManager.addPlayerToRoom(app.gameState, room, app.playerManager.createPlayer(playerId));
            room = app.roomManager.getLatestRoom(app.gameState, room);
            if (app.roomManager.isRoomReady(app.gameState, room)) {
                
                room = app.coupManager.beginCoup(room,messenger);
                app.gameState = app.roomManager.setRoomByName(app.gameState, room);

            }

        },
        playerTakenTurn: function(playerId, turnType, messagePlayer) {

        }

    }

}