module.exports = function (cardManager) {

    function giveStarterCoins(room) {
        for(let i = 0; i < room.get('players').size; i++) { 
            room = room.updateIn(
                ['players', i], 
                (player) => player.set('coins', 2));
        }
        return room;
    }

    function assignStartingPlayer(room) {
        return room.set('turn', room.getIn(['players', Math.floor(Math.random() * 4) + 1, 'id']));
    }

    return {
        giveStarterCoins: giveStarterCoins,

        beginCoup: function (room, messenger) {

            messenger.messageAllInRoom(room, (p) => "GAME BEGUN: " + room.get('name'));

            room = room.set('inProgress', true);
            room = cardManager.prepDeckAndDeal(room);
            room = giveStarterCoins(room);
            room = assignStartingPlayer(room);

            messenger.messageAllInRoom(room, 
            (p) => p.getIn(['cards',0,'name']) + p.getIn(['cards',1,'name'])
            );

            messenger.messageTurnPlayer(room, "take turn");
            return room;
        },

        turn: function(gameState, playerId, message) {
            cardManager.getMove()
        }
    };
}

