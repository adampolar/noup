const expect = require('chai').expect;
const f = require('./fixtures')();


var coupManager = require('../src/coup-manager')(null);

describe('coupManager', function () {
    it("giveStarterCoins should give everyone two coins to start", function () {
        let room = f.createTestRoom();
        room = coupManager.giveStarterCoins(room);
        expect(room.get('players').filter((p) => p.get('coins') === 2).size)
        .to.equal(4);
    });
});