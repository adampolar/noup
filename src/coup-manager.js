module.exports = function (cardManager) {

    function giveStarterCoins(room) {
        for(let i = 0; i < room.get('players').size; i++) { 
            room = room.updateIn(
                ['players', i], 
                (player) => player.set('coins', 2));
        }
        return room;
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

            room.get('players').forEach((player) => {
                messagePlayer(player.get('id'))(player.getIn(['cards',0,'name']) + player.getIn(['cards',1,'name']));
            });
        }
    };
}

