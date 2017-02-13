const immutable = require('immutable');

var rooms = immutable.List();

module.exports = rooms; 


/*
gamestate is of the following format
    [//room
        {
            name: <stringname>
            players: [
                {
                    id: <string id>
                    cards: [
                        {
                            name: <string name>
                        }...
                    coins: <int coins>
                    ]
                }...
            ]
        }...
    ]
    */