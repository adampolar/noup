module.exports = function (messagePlayer, app) {

    return {
        playerDropped: function (playerId) {
            let room = app.roomManager.getPlayersRoom(app.gameState, playerId);
            app.gameState = app.roomManager.removeFromRoom(app.gameState, playerId);
            let playersToMessage = app.roomManager.getPlayers(room);
            for (let player in players) {
                messagePlayer(player.id)("DROPPED:" + playerId);
            }
        },
        messageFromPlayer: function (playerId, message) {
            app.coupManager.message(gamestate, playerId, message)
        },
        playerArrived: function (playerId) {
            let room = app.roomManager.getFirstAvailableRoom(app.gameState);
            if (!room) {
                app.gameState = app.roomManager.createRoom(app.gameState);
            }
            room = app.roomManager.getFirstAvailableRoom(app.gameState);
            app.gameState = app.roomManager.addPlayerToRoom(app.gameState, room, app.playerManager.createPlayer(playerId));
            room = app.roomManager.getLatestRoom(app.gameState, room);
            if (app.roomManager.isRoomReady(app.gameState, room)) {
                room = app.coupManager.beginCoup(
                    room,
                    messagePlayer);
                gameState = app.roomManager.setRoomByName(gameState, room);
            }

        }

    }

}