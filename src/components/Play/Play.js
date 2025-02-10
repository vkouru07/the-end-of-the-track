import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { database } from '../../firebase';
import { ref, onChildAdded } from 'firebase/database';
import "./Play.css";
import Navbar from '../shared/Navbar';
import Board from './Board';

const socket = io('http://localhost:4000');

const initialBoard = Array(8).fill(null).map(() => Array(7).fill(null));
for (let i = 0; i < 7; i++) {
  initialBoard[0][i] = 'K';
  initialBoard[7][i] = 'K';
}

const knightMoves = [
  [2, 1], [2, -1], [-2, 1], [-2, -1],
  [1, 2], [1, -2], [-1, 2], [-1, -2]
];

const isValidMove = (fromRow, fromCol, toRow, toCol) => {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  return knightMoves.some(([r, c]) => r === rowDiff && c === colDiff);
};

const Play = () => {
  const { gameRoom } = useParams();
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    socket.on('gameStart', ({ player }) => {
      setPlayer(player);
      setIsMyTurn(player === 'player1');

      // Listen for moves from Firebase
      onChildAdded(ref(database, `games/${gameRoom}/moves`), (snapshot) => {
        const data = snapshot.val();
        if (data.player !== player) {
          const newBoard = board.map(row => row.slice());
          newBoard[data.move.to.row][data.move.to.col] = 'K';
          newBoard[data.move.from.row][data.move.from.col] = null;
          setBoard(newBoard);
          setIsMyTurn(true);
        }
      });
    });

    socket.on('moveMade', (data) => {
      const newBoard = board.map(row => row.slice());
      newBoard[data.move.to.row][data.move.to.col] = 'K';
      newBoard[data.move.from.row][data.move.from.col] = null;
      setBoard(newBoard);
      setIsMyTurn(true);
    });

    return () => {
      socket.off('gameStart');
      socket.off('moveMade');
    };
  }, [board, gameRoom, player]);

  const handlePieceClick = (row, col) => {
    if (isMyTurn && selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece;
      if (isValidMove(selectedRow, selectedCol, row, col)) {
        const newBoard = board.map(row => row.slice());
        newBoard[selectedRow][selectedCol] = null;
        newBoard[row][col] = 'K';
        setBoard(newBoard);
        setSelectedPiece(null);
        setIsMyTurn(false);

        socket.emit('makeMove', {
          gameRoom,
          move: { from: { row: selectedRow, col: selectedCol }, to: { row, col } },
          player
        });
      } else {
        setSelectedPiece(null);
      }
    } else if (isMyTurn && board[row][col]) {
      setSelectedPiece([row, col]);
    }
  };

  return (
    <div className="play-container">
      <Navbar />

      <div className="left-col">
        <div className='left-col-cont'>
          <button>Resign</button>
        </div>
      </div>

      <div className="right-col">
        <div className='opp-col'>
          <div>
            <img
              src="https://via.placeholder.com/100" // Replace with user avatar
              alt="Profile Avatar"
              className="profile-avatar"
            />
            <h3>#:##</h3>
          </div>
        </div>
        <div className='game-col'>
          <div className='game'>
            <Board board={board} onPieceClick={handlePieceClick} />
          </div>
          <div className='game-button-group'>
            <button>Button 1</button>
            <button>Button 2</button>
          </div>
        </div>
        <div className='user-col'>
          <div>
            <img
              src="https://via.placeholder.com/100" // Replace with user avatar
              alt="Profile Avatar"
              className="profile-avatar"
            />
            <h3>#:##</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
