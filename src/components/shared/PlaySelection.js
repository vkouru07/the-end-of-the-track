import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./PlaySelection.css";

const socket = io('http://localhost:4000');

function PlaySelection({ onCancel }) {
    const [timeSelectionVisible, setTimeSelectionVisible] = useState(false);
    const [gameRoom, setGameRoom] = useState(null);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('gameStart', ({ gameRoom }) => {
            setGameRoom(gameRoom);
            setIsMyTurn(true); // Assuming the player who joins second starts the game
            navigate(`/play`);
        });

        socket.on('moveMade', (data) => {
            // Handle the opponent's move
            setIsMyTurn(true);
        });

        return () => {
            socket.off('gameStart');
            socket.off('moveMade');
        };
    }, [navigate]);

    const computerSelected = () => { 
        alert("not implemented");
    };

    const hOnlineSelected = () => { 
        socket.emit('findGame');
    };

    const hLocalSelected = () => { 
        setTimeSelectionVisible(true);
    };

    const tenSelected = () => { alert("not implemented"); }
    const oneSelected = () => { alert("not implemented"); }
    const untimedSelected = () => { alert("not implemented"); }

    const makeMove = (move) => {
        if (isMyTurn) {
            socket.emit('makeMove', { gameRoom, move });
            setIsMyTurn(false);
        }
    };

    return (
        <div className="play-selection-cont">            
            {!timeSelectionVisible && 
            <OppSelection 
            onSelectComputer={computerSelected}
            onSelectHOnline={hOnlineSelected}
            onSelectHLocal={hLocalSelected}></OppSelection>}
            
            {timeSelectionVisible && <TimeSelection
            onSelectTen={tenSelected}
            onSelectOne={oneSelected}
            onSelectUntimed={untimedSelected}></TimeSelection>}

            <button onClick={onCancel}>cancel</button>

            {gameRoom && (
                <div>
                    <p>{isMyTurn ? "Your turn" : "Opponent's turn"}</p>
                    <button onClick={() => makeMove('exampleMove')}>Make Move</button>
                </div>
            )}
        </div>
    );
}

function OppSelection ({ onSelectComputer, onSelectHOnline, onSelectHLocal }) {
    return (
        <div className="opp-selection-cont">
            opp selection 
            <button className="top" onClick={onSelectComputer}>computer</button>
            <button className="mid" onClick={onSelectHOnline}>human online</button>
            <button className="bottom" onClick={onSelectHLocal}>human local</button>
        </div>
    );
}

function TimeSelection ({ onSelectTen, onSelectOne, onSelectUntimed }) {
    return (
        <div className="time-selection-cont">
            time selection 
            <button className="top" onClick={onSelectTen}>10 minute</button>
            <button className="mid" onClick={onSelectOne}>1 minute</button>
            <button className="bottom" onClick={onSelectUntimed}>untimed</button>
        </div>
    );
}

export default PlaySelection;