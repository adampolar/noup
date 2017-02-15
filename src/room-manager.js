const immutable = require('immutable');
const uuid = require('node-uuid');

function createRoom(gameState) {

    return gameState.push(immutable.fromJS({
        "name": uuid.v1(),
        players: []
    }));
}

function getFirstAvailableRoom(gameState) {
    
     let potentialRoom = gameState.sort((roomA, roomB) => {
            if (roomA.get('players').size < roomB.get('players').size) { return 1;}
            if (roomA.get('players').size > roomB.get('players').size) { return -1;}
            if (roomA.get('players').size === roomB.get('players').size) { return 0;}
        }).findEntry((room) => {
            return room.get('players').size < 4;
        });

    return potentialRoom ? potentialRoom[1] : null;
}

function addPlayerToRoom(gameState, room, player) {
    let roomToAddTo = gameState.findEntry((r) => { return r.get('name') === room.get('name') });
    return gameState.updateIn([roomToAddTo[0], 'players'], (players) => players.push(player));
}

function isRoomReady(gameState, room) {
    return gameState.findEntry((r) => { return r.get('name') === room.get('name') })[1].get('players').size === 4;
}

function getLatestRoom(gameState, room) {
    return gameState.findEntry((r) => { return r.get('name') === room.get('name') })[1];
}

function setRoomByName(gameState, room) {
    let roomToUpdate = gameState.findEntry((r) => r.get('name') === room.get('name'));
    return gameState.set(roomToUpdate[0], room);
}

module.exports.getLatestRoom = getLatestRoom;
module.exports.isRoomReady = isRoomReady;
module.exports.addPlayerToRoom = addPlayerToRoom;
module.exports.getFirstAvailableRoom = getFirstAvailableRoom;
module.exports.createRoom = createRoom;
module.exports.setRoomByName = setRoomByName;