module.exports = function (roomManager) {

    return function (playerId, messagePlayer) {

        return {
            messageCurrentPlayer: function (message) {
                messagePlayer(playerId)(message);
            },

            messageAllInRoom: function (room, messageMaker) {
                room.get('players').forEach((player) => {
                    messagePlayer(player.get('id'))(messageMaker(player));
                });
            },
            messageTurnPlayer: function (room, message) {
                messagePlayer(room.get('turn'))(message);
            }
        }


    }

}