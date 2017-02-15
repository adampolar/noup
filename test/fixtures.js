const immutable = require('immutable');

module.exports = function () {
    return {
        createGameStateTest1: function () {
            return immutable.fromJS(
                [
                    {
                        name: 0,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    },
                    {
                        name: 1,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            }
                        ]
                    },
                    {
                        name: 2,
                        players: [
                            {
                                id: 0
                            }
                        ]
                    },
                    {
                        name: 3,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }
                    ,
                    {
                        name: 5,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }
                ]
            );
        },
        createGameStateTest2: function () {
            return immutable.fromJS(
                [
                    {
                        name: 0,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    },
                    {
                        name: 1,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            }
                        ]
                    },
                    {
                        name: 2,
                        players: [
                            {
                                id: 0
                            }
                        ]
                    }
                ]
            );
        },
        createGameStateTest3: function () {
            return immutable.fromJS(
                [
                    {
                        name: 0,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    },
                    {
                        name: 1,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    },
                    {
                        name: 2,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    }
                ]
            );
        },
        createGameStateTest4: function () {
            return immutable.fromJS(
                [
                    {
                        name: 0,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            },
                            {
                                id: 3
                            }
                        ]
                    },
                    {
                        name: 1,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            }
                        ]
                    },
                    {
                        name: "getRoomByPlayerIdTestRoom",
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: "getRoomByPlayerIdTestPlayer"
                            }
                        ]
                    },
                    {
                        name: 3,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }
                    ,
                    {
                        name: 5,
                        players: [
                            {
                                id: 0
                            },
                            {
                                id: 1
                            },
                            {
                                id: 2
                            }
                        ]
                    }
                ]);
        },
        createTestPlayer: function (id) {
            return immutable.fromJS({
                id: id
            })
        },
        createTestRoom: function () {
            return immutable.fromJS({
                name: "testRoom",
                players: [
                    {
                        id: 0
                    },
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ],
                randomMember: 1234
            })
        }
    }
}