const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push, serverTimestamp } = require('firebase/database');

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
        methods: ["GET", "POST"]
    }
});

const firebaseConfig = {

};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

let waitingPlayer = null;

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('findGame', () => {
        if (waitingPlayer) {
            // Match the new player with the waiting player
            const gameRoom = `game-${waitingPlayer.id}-${socket.id}`;
            socket.join(gameRoom);
            waitingPlayer.join(gameRoom);

            // Notify both players that the game has started
            io.to(gameRoom).emit('gameStart', { gameRoom, player: 'player2' });
            io.to(waitingPlayer.id).emit('gameStart', { gameRoom, player: 'player1' });

            waitingPlayer = null;
        } else {
            // Set the current player as the waiting player
            waitingPlayer = socket;
        }
    });

    socket.on('makeMove', (data) => {
        // Log the move in Firebase
        push(ref(database, `games/${data.gameRoom}/moves`), {
            move: data.move,
            player: data.player,
            timestamp: serverTimestamp()
        });

        // Broadcast the move to the opponent
        socket.to(data.gameRoom).emit('moveMade', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        if (waitingPlayer === socket) {
            waitingPlayer = null;
        }
    });
});

server.listen(4000, () => console.log('Server is running on port 4000'));