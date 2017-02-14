const immutable = require('immutable');
const random = require('random-js')

function makeCard(name, positiveAction, negativeAction) {
    return {
        name: name,
        positiveAction: positiveAction,
        negativeAction: negativeAction
    }
}

var cardTypes = {
    AMBASSADOR: {
        name: "ambassador",
        ability: {
            name: "change cards",
            cost: 0,
            action: function(gamestate, outputGiver, inputFetcher) {
                //let deckCards = getTwoCards(deck);
                //let currentCards = getCards(player);
                //outputGiver.displayCards();
                //let cardsToKeep = inputFetcher();
                //return gamestate.set cards for that player
            }
        },
        protectsAgainst: "CAPTAIN"
    },
    ASSASSIN: {
        name: "assassin",
        ability: {
            name: "assassinate player",
            cost: 3,
            action: function(gamestate, outputGiver, inputFetcher) {
                //inputFetcher.getPlayerToAssassinate
                //outputGiver.askToRemoveCard(playerNumber);
                //inputFetcher.getCardToRemove(playerNumber, card);
                //return gamestate.set cards for that player
            }
        },
        protectsAgainst: null
    },
    CAPTAIN: {
        name: "captain",
        ability: {
            name: "steal",
            cost: 0,
            action: function(gamestate, outputGiver, inputFetcher) {
                //remove coins player 1
                //add coins other player
                //return gamestate
            }
        },
        protectsAgainst: "CAPTAIN"
    },
    CONTESSA: {
        name: "contessa",
        ability: null,
        protectsAgainst: "ASSASSIN"
    },
    DUKE: {
        name: "duke",
        ability: {
            name: "tax",
            cost: 0,
            action: function(gamestate, outputGiver, inputFetcher) {
                return addCoinsToCurrentPlayer(gamestate, 3);
            }
        },
        protectsAgainst: null
    }
}

function createDeck() {
    return immutable.fromJS( [
        cardTypes.AMBASSADOR,
        cardTypes.AMBASSADOR,
        cardTypes.AMBASSADOR,
        cardTypes.ASSASSIN,
        cardTypes.ASSASSIN,
        cardTypes.ASSASSIN,
        cardTypes.CAPTAIN,
        cardTypes.CAPTAIN,
        cardTypes.CAPTAIN,
        cardTypes.CONTESSA,
        cardTypes.CONTESSA,
        cardTypes.CONTESSA,
        cardTypes.DUKE,
        cardTypes.DUKE,
        cardTypes.DUKE
    ])
}

function shuffleDeck(deck) {
    return deck.sortBy(()=>Math.random());//TODO: fix with random js
}

function getShuffledDeck() {
    return shuffleDeck(createDeck());
}

function prepDeckAndDeal(room) {
    let deck = getShuffledDeck();
    let noOfPlayers = room.get('players').size;
    let lastManCards = room.getIn(['players',  noOfPlayers - 1, 'cards']);
    let lastManCardCount = lastManCards? lastManCards.size : 0;
    let i = 0;
    while(lastManCardCount !== 2) {

        let cards = room.getIn(['players', i % noOfPlayers, 'cards']);
        let topCard = deck.first();
        deck = deck.shift();
        cards = cards? cards.push(topCard) : immutable.fromJS([topCard]);

        room = room.setIn(['players', i % noOfPlayers, 'cards'], cards);

        i++;
        lastManCards = room.getIn(['players', noOfPlayers - 1, 'cards']);
        lastManCardCount = lastManCards? lastManCards.size : 0;
    }

    return room;
}


module.exports.prepDeckAndDeal = prepDeckAndDeal;