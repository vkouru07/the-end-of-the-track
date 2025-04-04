import events from '../../events.json';
import { io, Socket } from 'socket.io-client';
import { Move } from './types';

type FindUntimedGamePayload = typeof events.events.clientToServer.findUntimedGame.payload;
type RequestMakeMovePayload = typeof events.events.clientToServer.requestMakeMove.payload;


let socket: Socket | null = null;

const getSocket = (): Socket => {
    if (!socket) {
        socket = io('http://localhost:3000'); // Replace with your server URL
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
    socket.emit('findGame', payload);
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
    socket.emit('makeMove', payload);
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