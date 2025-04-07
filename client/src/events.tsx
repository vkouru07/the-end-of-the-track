import events from '../../events.json';
import { io, Socket } from 'socket.io-client';
import { Move } from './types';

const SERVER_URL = 'http://localhost:8000';

type FindUntimedGamePayload = typeof events.events.clientToServer.findUntimedGame.payload;
type RequestMakeMovePayload = typeof events.events.clientToServer.requestMakeMove.payload;


let socket: Socket | null = null;

const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SERVER_URL); 
    }
    return socket;
};

socket = getSocket();

// CLIENT TO SERVER 
const findUntimedGame = (playerID:string): void => {
    if (!socket) {
        console.error("socket not initialized"); 
        return;
    }
    const payload: FindUntimedGamePayload = {
        playerId: playerID
    }; 
    console.log("findUntimedGame, payload ", payload);
    socket.emit('findUntimedGame', payload);
};

const requestMakeMove = (playerId:string, gameID:string, move:Move): void => {
    if (!socket) {
        console.error("socket not initialized"); 
        return;
    }
    const payload: RequestMakeMovePayload = {
        playerId: playerId,
        gameId: gameID,
        move: {
            from: { x: move.from.x.toString(), y: move.from.y.toString() }, // TODO 
            to: { x: move.to.x.toString(), y: move.to.y.toString() }
        }
    }; 
    console.log("requestMakeMove, payload ", payload);
    socket.emit('requestMakeMove', payload);
};

// SERVER TO CLIENT

socket.on('gameStarted', (payload) => {
    console.log('Game started:', payload);
});
socket.on('canMakeMove', (payload) => {
    console.log('Can make move:', payload);
}); 
socket.on('moveMade', (payload) => {
    console.log('Move made:', payload);
});
socket.on('gameOver', (payload) => {
    console.log('Game over:', payload);
}); 
socket.on('playerLeft', (payload) => {
    console.log('Player left:', payload);
});

export {findUntimedGame, requestMakeMove};