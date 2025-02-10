import React from 'react';
import './Board.css';

const Board = ({ board, onPieceClick }) => {
    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`cell ${cell ? 'piece' : ''}`}
                            onClick={() => onPieceClick(rowIndex, colIndex)}
                        >
                            {cell && <span className="piece"> _{cell}</span>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;