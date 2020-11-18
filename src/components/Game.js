import React from 'react';
import GameBoard from './GameBoard';

function Game() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  return (
    <div>
      <h1> Game </h1>
      <GameBoard />
    </div>
  );
}

export default Game;
