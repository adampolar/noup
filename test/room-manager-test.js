const expect = require('chai').expect;
const immutable = require('immutable');


var rm = require('../src/room-manager')



describe('roomManager', function(){

    it('createRoom should add a room with a unique name', function() {
        let gameState = rm.createRoom(createGameStateTest1());
        expect(gameState.size).to.equal(6);
        let newRoomName = gameState.last().get('name');        
        expect(
            gameState.filter((room) => room.get('name') === newRoomName).size)
            .to.equal(1)
    });
    
    it('getFirstAvailableRoom should return any one of the most full room that is not full',function(){
        expect(rm.getFirstAvailableRoom(createGameStateTest1()).get('name')).to.be.oneOf([3,4]);
        expect(rm.getFirstAvailableRoom(createGameStateTest2()).get('name')).to.equal(1);
        expect(rm.getFirstAvailableRoom(createGameStateTest3())).to.be.null;
    });

    it('addPlayerToRoom should add a player top a specific room', function() {
        let gameState = createGameStateTest1();
        let room = gameState.findEntry((r) => { return r.get('name') === 1 })[1];
        expect(
            rm.addPlayerToRoom(gameState, room, "adam")
            .findEntry((r) => { return r.get('name') === 1 })[1].get('players').includes("adam")
            ).is.true;
    });

    it('isRoomReady should return true iff it has 4 players', function() {
        let gameState = createGameStateTest1();
        let roomWith4 = gameState.findEntry((r) => { return r.get('players').size === 4 })[1];
        let roomWithUnder4 = gameState.findEntry((r) => { return r.get('players').size < 4 })[1];

        expect(rm.isRoomReady(gameState,roomWith4)).to.be.true;
        expect(rm.isRoomReady(gameState, roomWithUnder4)).to.be.false;
    });

    it('getLatestRoom should get an updated version of the room by name', function(){
        let gameState = createGameStateTest1();
        let room2 = gameState.findEntry((r) => { return r.get('name') === 2 })[1];
        //add player to room two
        gameState = rm.addPlayerToRoom(gameState, room2, "adam");
        expect(rm.getLatestRoom(gameState, room2).get('players').includes("adam")).to.be.true
    });

});
function createGameStateTest1() {
    return immutable.fromJS(
        [
            {
                name: 0,
                players: [
                    0,
                    1,
                    2,
                    3
                ]
            },
            {
                name: 1,
                players: [
                    0,
                    1
                ]
            },
            {
                name: 2,
                players: [
                    0
                ]
            },
            {
                name: 3,
                players: [
                    0,
                    1,
                    2
                ]
            }
            ,
            {
                name: 5,
                players: [
                    0,
                    1,
                    2
                ]
            }
        ]
    );
}
function createGameStateTest2() {
    return immutable.fromJS(
        [
            {
                name: 0,
                players: [
                    0,
                    1,
                    2,
                    3
                ]
            },
            {
                name: 1,
                players: [
                    0,
                    1
                ]
            },
            {
                name: 2,
                players: [
                    0
                ]
            }
        ]
    );
}

function createGameStateTest3() {
    return immutable.fromJS(
        [
            {
                name: 0,
                players: [
                    0,
                    1,
                    2,
                    3
                ]
            },
            {
                name: 1,
                players: [
                    0,
                    1,
                    2,
                    3
                ]
            },
            {
                name: 2,
                players: [
                    0,
                    1,
                    2,
                    3
                ]
            }
        ]
    );
}