import React, { useState } from "react";
import "./PlaySelection.css";

// TYPE OF GAME
    // the type of opp (computer, human online, human local), 
    // length of game (10, 1, untimed)
function PlaySelection({onCancel}) {
    const [timeSelectionVisible, setTimeSelectionVisible] = useState(false);

    const computerSelected = () => { 
        alert("not implemented");
    };
    const hOnlineSelected = () => { 
        alert("not implemnted ");
    };
    const hLocalSelected = () => { 
        // alert("not implemnted ");
        setTimeSelectionVisible(true);
    };

    const tenSelected = () => {alert("not implemented");}
    const oneSelected = () => {alert("not implemented");} 
    const untimedSelected = () => {alert("not implemented");} 
    
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
        </div>
    );
}

function OppSelection ({onSelectComputer, onSelectHOnline, onSelectHLocal}) {
    return (
        <div className="opp-selection-cont">
            opp selection 
            <button className="top" onClick={onSelectComputer}>computer</button>
            <button className="mid" onClick={onSelectHOnline}>human online</button>
            <button className="bottom" onClick={onSelectHLocal}>human local</button>
        </div>
    );
}

function TimeSelection ({onSelectTen, onSelectOne, onSelectUntimed}) {
    return (
        <div className="time-selection-cont">
            time selection 
            <button className="top" onClick={onSelectTen}>10 minute</button>
            <button className="mid" onClick={onSelectTen}>1 minute</button>
            <button className="bottom" onClick={onSelectUntimed}>untimed</button>
        </div>
    );
}

export default PlaySelection; 