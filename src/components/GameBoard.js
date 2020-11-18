import React, { useState } from 'react';
import '.././css/game-board.css';

import Square from './Square';
import {initiateBoard} from '../toolbox/util'


function GameBoard() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);


  const [squares, ] = useState(initiateBoard());


  function renderLine(h) {
    h = h.map(v => {
      return(
        <Square key={v} obj= {v}/>
      );
    });
    return h;
  }

  function renderTable() {
    let board = squares.map(h => {
      return <div className="board-row" key={h}>{renderLine(h)}</div>;
    });
    //console.log(board);
    return board;
  }


  return (
    <div>
      <h2> GameBoard </h2>
      {renderTable()}
    </div>
  );
}

export default GameBoard;
