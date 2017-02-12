const expect = require('chai').expect;
const immutable = require('immutable');


var rm = require('../room-manager')



describe('roomManager', function(){
    
    it('getFirstAvailableRoom should return any one of the most full room that is not full',function(){
        expect(rm.getFirstAvailableRoom(createGameStateTest1()).get('name')).to.be.oneOf([3,4]);
        expect(rm.getFirstAvailableRoom(createGameStateTest2()).get('name')).to.equal(1);
        expect(rm.getFirstAvailableRoom(createGameStateTest3())).to.be.null;
    });

    it('createRoom should add a room with a unique name', function() {
        let gameState = rm.createRoom(createGameStateTest1());
        expect(gameState.size).to.equal(6);
        let newRoomName = gameState.last().get('name');        
        expect(
            gameState.filter((room) => room.get('name') === newRoomName).size)
            .to.equal(1)
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