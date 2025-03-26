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
    apiKey: "AIzaSyA3OsLB0k3UsWKrl9g6x3d3YyrMRg-MMos",
    authDomain: "end-of-track.firebaseapp.com",
    projectId: "end-of-track",
    storageBucket: "end-of-track.firebasestorage.app",
    messagingSenderId: "994956838580",
    appId: "1:994956838580:web:36455085a22c5ed084f9e1",
    measurementId: "G-SB7NJ4ZKK2"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const unmatchedUntimedUsers = queue(); 
const games = {};

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('findUntimedGame', () => {
        if (unmatchedUntimedUsers.length === 0) {
            unmatchedUntimedUsers.enqueue(socket);
        } else {
            const player1 = unmatchedUntimedUsers.dequeue();
            const player2 = socket;
            const room = `room-${player1.id}-${player2.id}`;
            games[room] = { player1, player2 };

            player1.join(room);
            player2.join(room);

            socket.emit('gameStart', { room, player: 'player2' });
        }
    }); 
    socket.on('makeMove', (data) => {}); 

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    }); 


server.listen(4000, () => console.log('Server is running on port 4000'))});