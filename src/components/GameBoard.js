import React, { useState } from 'react';
import '.././css/game-board.css';

import Square from './Square';
import {initiateBoard} from '../toolbox/util'


function GameBoard() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);


  const [squares, ] = useState(initiateBoard());
  const [selected, setSelected] = useState('');
  const [possible, setPossible] =useState('');


  function renderLine(h) {
    h = h.map(v => {
      return(
        <Square
          key= {v.x.toString() + v.y.toString()}
          obj= {v}
          clickSquare= {clickSquare}
        />
      );
    });
    return h;
  }

  function renderTable() {
    let key = 0;
    let board = squares.map(h => {
      key += 1;
      return <div className="board-row" key={key}>{renderLine(h)}</div>;
    });
    return board;
  }

  function pieceMove(piece) {

    let lineMove1 = Array(8).fill().map((_, idx) => [0,idx+1]);
    let lineMove2 = Array(8).fill().map((_, idx) => [0,(-idx)-1]);
    let lineMove3 = Array(8).fill().map((_, idx) => [idx+1,0]);
    let lineMove4 = Array(8).fill().map((_, idx) => [(-idx)-1,0]);
    let lineMove = [lineMove1, lineMove2, lineMove3, lineMove4];
    //console.log(lineMove);

    let diagonalMove1 = Array(8).fill().map((_, idx) => [idx+1,idx+1]);
    let diagonalMove2 = Array(8).fill().map((_, idx) => [idx+1,(-idx)-1]);
    let diagonalMove3 = Array(8).fill().map((_, idx) => [(-idx)-1,idx+1]);
    let diagonalMove4 = Array(8).fill().map((_, idx) => [(-idx)-1,(-idx)-1]);
    let diagonalMove = [diagonalMove1, diagonalMove2, diagonalMove3, diagonalMove4];

    let queenMove = [...lineMove, ...diagonalMove];

    switch(piece) {
      case 'rook':
        return lineMove;
      case 'knight':
        return( [[[2,1],[1,2],[(-2),1],[(-1),2],[2,(-1)],[1,(-2)],[(-2),(-1)],[(-1),(-2)]]] );
      case 'bishop':
        return diagonalMove;
      case 'queen':
        return queenMove;
      case 'king':
        return ( [[[1,0],[0,1],[(-1),0],[0,(-1)],[1,1],[(-1),(-1)],[(-1),1],[1,(-1)]]] );
      default:
        return [];
    }
  }

  function deleteOutMoves(moves, x, y) {

    let addMoveToPosition = moves.map(catMoves => {
      let unitMove = catMoves.map(catMove => [x + catMove[0], y + catMove[1]]);
      return unitMove;
    });

    let filterOut = addMoveToPosition.map(catMoves => {
      let unitMove = catMoves.filter(positionPossible => {
        let boolFilter = (positionPossible[0] < 8 && positionPossible[0] >= 0 && positionPossible[1] < 8 && positionPossible[1] >= 0) ? true : false
        //console.log(x,' ',y,' ', positionPossible[0], y + positionPossible[1]);
        return boolFilter === true;
      });
      return unitMove;
    });

    return filterOut;
  }

  function pieceBlocked(squares, arrayMove, obj) {



    let moveNotBlocked = arrayMove.map(catMoves => {

      let filter = [];
      let bool = false;
      let stopGoingFurther = () => bool = true;
      for (let i = 0; i < catMoves.length; i++){
        //console.log(catMoves[0][0]);

        if(squares[catMoves[i][0]][catMoves[i][1]].piece === null && bool === false){
          filter.push(catMoves[i]);
        }
        else if (squares[catMoves[i][0]][catMoves[i][1]].piece !== null && squares[catMoves[i][0]][catMoves[i][1]].team !== obj.team && bool === false){
          filter.push(catMoves[i]);
          stopGoingFurther() ;
        }
        else {stopGoingFurther() ;}


      }
      return filter;
    });

    return moveNotBlocked;
  }

  function squarePossible(obj) {
    let moves = pieceMove(obj.piece);
    let outofBoard = deleteOutMoves(moves, obj.x, obj.y);
    //console.log(outofBoard);
    let blockedFilter = pieceBlocked(squares,outofBoard, obj);

    return blockedFilter;

  }

  function clickSquare ({obj}) {
    if(selected === ''){ // select square
      let {x,y} = obj;
      setSelected({x, y});
      let temp = squarePossible(obj);
      console.log('possible');
      console.log(temp);
      //setPossible({x, y}); //en fonction du pion et des coordonnées
    }
    else if(selected.x === obj.x && selected.y === obj.y) { //unselect square
        setSelected('');
    }
    else {
      if (possible.x === obj.x && possible.y === obj.y) { //move available
        //movePieceaction
        setPossible('');
        setSelected('');
      }
      else { //move unavailable
        return;
      }
    }
  }



  return (
    <div>
      <h2> GameBoard </h2>
      {renderTable()}
    </div>
  );
}

export default GameBoard;
