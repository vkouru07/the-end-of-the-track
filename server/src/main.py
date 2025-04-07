import socketio
import eventlet
import logging
import socketio.async_server

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# eventlet.monkey_patch()

sio = socketio.Server(cors_allowed_origins=["http://localhost:3000", "*"], async_mode="eventlet")
# sio = socketio.AsyncServer() 
app = socketio.WSGIApp(sio, static_files = {
    "/": "src/templates/main.html"
})

unmatched_players = []

@sio.event
async def connect(sid, environ):
    # print ("SOMETHING HAPPENED")
    logger.info(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")
    try:
        unmatched_players.remove(sid)
    except:
        pass 

# @sio.event
@sio.on ("findUntimedGame")
def findUntimedGame(sid, data):
    # print ("SOMETHING HAPPENED")
    logger.info(f"Find game request from {sid}: {data}")
    if sid in unmatched_players:
        return 
    if unmatched_players:
        opponent_sid = unmatched_players.pop(0)
        while not opponent_sid:
            if not unmatched_players:
                unmatched_players.append(sid)
                logger.info(f"No unmatched players, added {sid} to unmatched players")
                return
            opponent_sid = unmatched_players.pop(0)
        logger.info(f"Match found: {sid} vs {opponent_sid}")
        # TODO game start event 
    else:
        unmatched_players.append(sid)
        logger.info(f"No match found, added {sid} to unmatched players")
        
    logger.info(f"Unmatched players: {unmatched_players}")
    # await sio.emit("gameStarted", {
    #     "gameId": "12345",
    #     "player1ID": data["playerId"],
    #     "player2ID": "opponentID"
    # }, to=sid)

@sio.event
async def requestMakeMove(sid, data):
    logger.info(f"Move made by {sid}: {data}")
    # await sio.emit("moveMade", data, skip_sid=sid)

if __name__ == "__main__":
    logger.info("Starting server on http://localhost:8000")
    eventlet.wsgi.server(eventlet.listen(("localhost", 8000)), app)
    # cmd.cmdapp.run(port=8000, debug=True)