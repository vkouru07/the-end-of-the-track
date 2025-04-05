def gameStarted(sio, data):
    # logger.info(f"Game started with data: {data}")
    sio.emit ("gameStarted", {
        "gameId": "12345",
        "player1ID": ["playerId"],
        "player2ID": "opponentID"
    # }, to=data["playerId"])
    }, to="playerId")