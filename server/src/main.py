import socketio
import eventlet
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

sio = socketio.Server(cors_allowed_origins="*", async_mode="eventlet")
app = socketio.WSGIApp(sio, static_files = {
    "/": "server/src/index.html"
})

unmatched_players = []

@sio.event
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")
    try:
        unmatched_players.remove(sid)
    except:
        pass 

@sio.event
async def findUntimedGame(sid, data):
    logger.info(f"Find game request from {sid}: {data}")
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
        
    # await sio.emit("gameStarted", {
    #     "gameId": "12345",
    #     "player1ID": data["playerId"],
    #     "player2ID": "opponentID"
    # }, to=sid)

@sio.event
async def makeMove(sid, data):
    logger.info(f"Move made by {sid}: {data}")
    # await sio.emit("moveMade", data, skip_sid=sid)

if __name__ == "__main__":
    logger.info("Starting server on http://localhost:8000")
    eventlet.wsgi.server(eventlet.listen(("localhost", 8000)), app)