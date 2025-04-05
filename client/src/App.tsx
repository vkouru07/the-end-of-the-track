import React from 'react';
import { findUntimedGame, requestMakeMove} from './events';
import { Move } from './types';
import './App.css';

function App() {
  const junkmove: Move = {
    from: { x: 0, y: 0 },
    to: { x: 1, y: 1 }
  };
  return (
    <div className="App">

      <button onClick={() => findUntimedGame("fdsdssf")}>findUntimedGame</button>
      <button onClick={() => requestMakeMove("fdsdssf", "fsdfd", junkmove)}>requestMakeMove</button>

    </div>
  );
}

export default App;
