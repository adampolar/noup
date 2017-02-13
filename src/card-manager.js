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
    return immutable.List.of(
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
        cardTypes.DUKE)
}

function shuffleDeck(deck) {
    return deck.sortBy(()=>Math.random());//TODO: fix with random js
}

function getShuffledDeck() {
    return shuffleDeck(createDeck());
}

module.exports.getShuffledDeck = getShuffledDeck;