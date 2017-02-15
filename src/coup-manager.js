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

        beginCoup: function (room, messagePlayer) {
            room.get('players').forEach((player) => {
                messagePlayer(player.get('id'))("GAME BEGUN: " + room.get('name'));
            });
            room = room.set('inProgress', true);
            room = cardManager.prepDeckAndDeal(room);
            room = giveStarterCoins(room);
            room = assignStartingPlayer(room);

            room.get('players').forEach((player) => {
                messagePlayer(player.get('id'))(player.getIn(['cards',0,'name']) + player.getIn(['cards',1,'name']));
            });

            messagePlayer(room.get('turn'))("take turn");
            return room;
        }
    };
}

