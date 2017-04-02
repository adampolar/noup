module.exports = function (messagePlayer, app) {

    function returnError(messagePlayer) {
        messagePlayer("ERROR");
    }

    return {
        playerDropped: function (playerId) {
        },
        messageFromPlayer: function (playerId, message) {
            /*
            message is of the format 
            {
                turn: (INCOME|FOREIGN_AID|TAX|ASSASSINATE|COUP|STEAL|SWITCH_CARDS),
                playerToAttack:playerId,
                challenge:bool,
                cardRemoval:(ambassador|assassin|captain|contessa|duke)
            }
            */


            if (message.turn) {

                //check its this players turn
                if(app.roomManager.isCurrentTurn(app.gameState, playerId)) {
                    returnError(messenger.messageCurrentPlayer);
                    return;
                }

                //get the move then check the move is valid
                let messenger = app.messengerManager(playerId, messagePlayer);
                let move = app.cardManager.getMove(message.turn);
                if (!move) {
                    returnError(messenger.messageCurrentPlayer);
                    return;
                }

                //if an antagonistic move check other player still in the gameState
                if(!app.roomManager.isStillInGame(app.gameState, message.playerToAttack)) {
                    returnError(messenger.messageCurrentPlayer);
                    return;
                }
                
                //set the move in progress
                app.gameState = roomManager.setMoveInProgress(app.gameState, playerId);
                messenger.messageEveryoneInRoomButCurrentPlayer(message.turn + " " + message.playerToAttack);
                
                if (move.canBeBlockedBy) {
                    setTimeout(30000, function() {
                        app.gameState = roomManager.incrementTurn(app.gameState, playerId)
                        messenger.messageTurnPlayer(app.roomManager.getRoomByPlayerId(playerId), app.gameState);
                    }); 
                    return;
                }
                else {
                    //gameState = app.coupManager.doMove(move);
                    //increment turn counter and message player
                }
            } else if (message.challenge) {
                //if(app.coupManager.wasMoveValid(room)) {
                    //messenger.messageEveryoneInRoom(app.roomManager.getRoomByPlayerId(playerId), "playerId mounted a bad challenge");
                    //messenger.messageCurrentPlayer(please remove a card)
                    //set timeout for player to remove card
                //} else {
                    ////messenger.messageEveryoneInRoom(app.roomManager.getRoomByPlayerId(playerId), "playerId mounted a bad challenge");
                    //messenger.messageTurnPlayer(please remove a card)
                    //set timeout for player to remove card
                //}
            } else if (message.cardRemoval) {
                //choose card at random if not set
                //remove card
                //increment turn counter and message player
            }

        },
        playerArrived: function (playerId) {

            let messenger = app.messengerManager(playerId, messagePlayer);

            let room = app.roomManager.getFirstAvailableRoom(app.gameState);
            if (!room) {
                app.gameState = app.roomManager.createRoom(app.gameState);
            }
            room = app.roomManager.getFirstAvailableRoom(app.gameState);
            app.gameState = app.roomManager.addPlayerToRoom(app.gameState, room, app.playerManager.createPlayer(playerId));
            room = app.roomManager.getLatestRoom(app.gameState, room);
            
            messenger.messageAllInRoom(room, 'lobby message', () => {
                let playerList = [];
                room.get('players').forEach((player) => playerList.push(player.get('id')));
                return JSON.stringify(playerList);
            })

            if (app.roomManager.isRoomReady(app.gameState, room)) {

                room = app.coupManager.beginCoup(room, messenger);
                app.gameState = app.roomManager.setRoomByName(app.gameState, room);

            }
        }
    }
}