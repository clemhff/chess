import React, { useState } from 'react';
import '.././css/game-board.css';

import Square from './Square';
import {initiateBoard, ObjSquare} from '../toolbox/util'


function GameBoard() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);


  const [squares, setSquares] = useState(initiateBoard());
  const [selected, setSelected] = useState('');
  const [possible, setPossible] =useState('');
  const [turn, setTurn] = useState(1);





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
        else {stopGoingFurther();}
      }
      return filter;
    });

    let simpleList =[];
    for (let i = 0; i < moveNotBlocked.length; i++){
      for (let j = 0; j < moveNotBlocked[i].length; j++){
        simpleList.push(moveNotBlocked[i][j]);
      }
    }


    return simpleList;
  }


  function pawnMove(obj,turn) {
    let direction = (turn === 1) ? 1 : (-1)
    let moves = [];

    if( typeof squares[obj.x][obj.y+direction] !== 'undefined' && squares[obj.x][obj.y+direction].piece === null){
      moves.push([0,direction]);
    }


    if(typeof squares[obj.x+1] !== 'undefined' && typeof squares[obj.x+1][obj.y+direction] !== 'undefined'){
      if(squares[obj.x+1][obj.y+direction].piece !== null && squares[obj.x+1][obj.y+direction].team !== turn){
        moves.push([1,direction]);
      }
    }

    if(typeof squares[obj.x-1] !== 'undefined' && typeof squares[obj.x-1][obj.y+direction] !== 'undefined'){
      if(squares[obj.x+(-1)][obj.y+direction].piece !== null && squares[obj.x+(-1)][obj.y+direction].team !== turn ){
        moves.push([(-1),direction]);
      }
    }

    let positionPossible = moves.map(move => [move[0]+obj.x, move[1]+ obj.y]);
    let filterOut = positionPossible.filter(move => (move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8));

    return filterOut;
  }



  function squarePossible(obj) {
    if(obj.piece ==='pawn'){
      let pawnAction = pawnMove(obj, turn);
      return pawnAction;
    }

    let moves = pieceMove(obj.piece);
    let outofBoard = deleteOutMoves(moves, obj.x, obj.y);
    //console.log(outofBoard);
    let blockedFilter = outofBoard;

    if(obj.piece !== 'knight' ) {
      blockedFilter = pieceBlocked(squares,outofBoard, obj);
    }
    else {
      blockedFilter = blockedFilter[0].filter(coord => {
        console.log(coord);
        coord = (squares[coord[0]][coord[1]].team !== turn ? coord : null );
        return coord !== null;
      });
    }

    return blockedFilter;

  }


  function canIMove(obj, possible) {
    let answer = false;
    for (let i = 0; i < possible.length; i++){
      let coord = [obj.x, obj.y];
      if (possible.[i][0] === coord[0] && possible.[i][1] === coord[1]) {
        answer = true;
      }
    }
    return answer;
  }


  function putPieceInAnOtherSquare(oldPosition, newPosition, squares){
    let oldObj = new ObjSquare(oldPosition[0], oldPosition[1]);
    let newObj = squares[oldPosition[0]][oldPosition[1]];
    newObj.x = newPosition[0];
    newObj.y = newPosition[1];
    /*console.log('obj');
    console.log(oldObj);
    console.log(newObj);*/
    let oldSquares = squares.slice();
    oldSquares[oldPosition[0]][oldPosition[1]] = oldObj;
    oldSquares[newPosition[0]][newPosition[1]] = newObj;

    return oldSquares;
  }


  function clickSquare ({obj}) {
    if(selected === '' && obj.team === turn ){ // select square
      let [x,y] = [obj.x, obj.y];
      setSelected([x, y]);
      let temp = squarePossible(obj);
      console.log('possible');
      console.log(temp);
      setPossible(temp);
    }
    else if(selected.[0] === obj.x && selected.[1] === obj.y) { //unselect square
        setSelected('');
        setPossible('');
    }
    else {
      if(canIMove(obj, possible)){
        let newSquaresStates = putPieceInAnOtherSquare(selected, [obj.x, obj.y], squares);
        setSquares(newSquaresStates);
        setSelected('');
        setPossible('');
        setTurn((turn === 1 ? 2 : 1))
      }
      else {
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
