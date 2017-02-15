const expect = require('chai').expect;
const immutable = require('immutable');

var playerManager = require('../src/player-manager');

describe('playerManager', function () {
    it("createPlayer creates a player with the given id", function () {
        let randomString = Math.random().toString(36).substr(7);
        let player = playerManager.createPlayer(randomString);
        expect(immutable.is(player, immutable.fromJS({ id: randomString }))).to.be.equal;
    });
});