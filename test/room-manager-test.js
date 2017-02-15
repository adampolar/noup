const expect = require('chai').expect;
const f = require('./fixtures')();
const immutable = require('immutable');

var rm = require('../src/room-manager')



describe('roomManager', function () {

    it('createRoom should add a room with a unique name', function () {
        let gameState = rm.createRoom(f.createGameStateTest1());
        expect(gameState.size).to.equal(6);
        let newRoomName = gameState.last().get('name');
        expect(
            gameState.filter((room) => room.get('name') === newRoomName).size)
            .to.equal(1)
    });

    it('getFirstAvailableRoom should return any one of the most full room that is not full', function () {
        expect(rm.getFirstAvailableRoom(f.createGameStateTest1()).get('name')).to.be.oneOf([3, 4]);
        expect(rm.getFirstAvailableRoom(f.createGameStateTest2()).get('name')).to.equal(1);
        expect(rm.getFirstAvailableRoom(f.createGameStateTest3())).to.be.null;
    });

    it('addPlayerToRoom should add a player to a specific room', function () {
        let gameState = f.createGameStateTest1();
        let room = gameState.findEntry((r) => { return r.get('name') === 1 })[1];
        let testPlayer = f.createTestPlayer("adam");
        gameState = rm.addPlayerToRoom(gameState, room, testPlayer);
        expect(
            gameState
                .findEntry(
                    (r) => { 
                        return r.get('name') === 1 })[1]
                        .get('players').includes(testPlayer)
        ).is.true;
    });

    it('isRoomReady should return true iff it has 4 players', function () {
        let gameState = f.createGameStateTest1();
        let roomWith4 = gameState.findEntry((r) => { return r.get('players').size === 4 })[1];
        let roomWithUnder4 = gameState.findEntry((r) => { return r.get('players').size < 4 })[1];

        expect(rm.isRoomReady(gameState, roomWith4)).to.be.true;
        expect(rm.isRoomReady(gameState, roomWithUnder4)).to.be.false;
    });

    it('getLatestRoom should get an updated version of the room by name', function () {
        let gameState = f.createGameStateTest1();
        let room2 = gameState.findEntry((r) => { return r.get('name') === 2 })[1];
        let testPlayer = f.createTestPlayer("adam");
        //add player to room two
        gameState = rm.addPlayerToRoom(gameState, room2, testPlayer);
        expect(rm.getLatestRoom(gameState, room2).get('players').includes(testPlayer)).to.be.true
    });

    it('setRoomByName should update the room to match the given room', function () {
        let gameState = f.createGameStateTest1();
        let room = f.createTestRoom();
        let room2Arr = gameState.findEntry((r) => { return r.get('name') === 2 });
        room = room.set('name', room2Arr[1].get('name'));
        gameState = rm.setRoomByName(gameState, room);
        expect(immutable.is(gameState.get(room2Arr[0]), room)).to.be.true
    });

    it('getRoomByPlayerId should get the room by the playerId', function() {
        let gameState = f.createGameStateTest4();
        expect(immutable.is(
            rm.getRoomByPlayerId(gameState, "getRoomByPlayerIdTestPlayer"),
            gameState.find((r) => r.get('name') === "getRoomByPlayerIdTestRoom")))
            .to.be.true;
    })

});
